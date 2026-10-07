import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createInterface } from 'node:readline'
import { CONFIG_FILE, loadConfig } from '../config.js'
import {
  fetchIndex,
  fetchItem,
  fetchTokens,
  readFromSource,
  resolveRegistrySource,
  resolveTree,
  type RegistryItemMeta,
} from '../registry.js'
import { detectPackageManager, log } from '../utils.js'

const PROTOCOL_VERSION = '2025-06-18'
const FRAMEWORK = 'react'

type Json = null | boolean | number | string | Json[] | { [key: string]: Json }
type Request = { jsonrpc: '2.0'; id?: string | number | null; method: string; params?: Record<string, unknown> }

class RpcError extends Error {
  readonly code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

const INSTRUCTIONS = `denseui provides ultra-dense React components (Tailwind CSS v4 + Ark UI) that are copied into the user's project.
Workflow: call get_design_guidelines once, use list_components to find components, get_component for API and examples, then get_add_command and run it in the user's project. Import components from "@/components/ui/<name>". Use semantic tokens (bg-background, text-muted-foreground, bg-surface-hover, …), never raw palette colors.`

const tools = [
  {
    name: 'list_components',
    description:
      'List denseui components with descriptions and categories. Optionally filter by a search query (matches name, description, category or exported symbol) or a category.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search text, e.g. "menu", "table", "date"' },
        category: { type: 'string', enum: ['inputs', 'overlays', 'layout', 'data'] },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_component',
    description:
      'Get full documentation for components: install command, dependencies, exported API, a complete usage example and (optionally) source code.',
    inputSchema: {
      type: 'object',
      properties: {
        names: { type: 'array', items: { type: 'string' }, minItems: 1, description: 'Component names, e.g. ["data-table"]' },
        includeSource: { type: 'boolean', description: 'Include the component source code (default false)' },
      },
      required: ['names'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_add_command',
    description:
      'Get the shell command that adds components to the project, plus every registry component and npm package it will install.',
    inputSchema: {
      type: 'object',
      properties: {
        names: { type: 'array', items: { type: 'string' }, minItems: 1 },
        packageManager: { type: 'string', enum: ['npm', 'pnpm', 'yarn', 'bun'] },
      },
      required: ['names'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_design_guidelines',
    description:
      'Rules for building UI with denseui: density, spacing, color tokens, which component to use for which job, and what to avoid. Read before generating UI.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_theme',
    description: 'The full theme stylesheet: every CSS variable, Tailwind @theme value and dark-mode override.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_project_setup',
    description:
      "Inspect the user's project: whether denseui is initialized, configured paths/aliases, installed components and the init command if missing.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
]

const resources = [
  { uri: 'denseui://guidelines', name: 'Design guidelines', mimeType: 'text/markdown' },
  { uri: 'denseui://theme', name: 'Theme tokens', mimeType: 'text/css' },
  { uri: 'denseui://llms.txt', name: 'llms.txt index', mimeType: 'text/plain' },
]

const runners = {
  npm: (args: string) => `npx denseui@latest ${args}`,
  pnpm: (args: string) => `pnpm dlx denseui@latest ${args}`,
  yarn: (args: string) => `yarn dlx denseui@latest ${args}`,
  bun: (args: string) => `bunx --bun denseui@latest ${args}`,
}

function matches(item: RegistryItemMeta, query: string) {
  const haystack = [item.name, item.title, item.description, ...(item.categories ?? []), ...(item.exports ?? [])]
    .join(' ')
    .toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

function stringArg(params: Record<string, unknown>, key: string) {
  const value = params[key]
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function namesArg(params: Record<string, unknown>) {
  const names = params.names
  if (!Array.isArray(names) || names.length === 0 || !names.every((n) => typeof n === 'string')) {
    throw new Error('"names" must be a non-empty array of component names.')
  }
  return names as string[]
}

export async function mcp(opts: { cwd: string; registry?: string }) {
  const config = existsSync(path.join(opts.cwd, CONFIG_FILE)) ? await loadConfig(opts.cwd).catch(() => undefined) : undefined
  const source = resolveRegistrySource(opts.registry, config?.registry)
  const pkg = JSON.parse(await readFile(new URL('../../package.json', import.meta.url), 'utf8')) as { version: string }

  async function callTool(name: string, args: Record<string, unknown>): Promise<string> {
    switch (name) {
      case 'list_components': {
        const query = stringArg(args, 'query')
        const category = stringArg(args, 'category')
        const items = (await fetchIndex(source, FRAMEWORK)).filter(
          (item) =>
            item.type === 'registry:ui' &&
            (!category || item.categories?.includes(category)) &&
            (!query || matches(item, query)),
        )
        if (items.length === 0) return 'No components matched. Call list_components without arguments to see all.'
        return items.map((i) => `- ${i.name} [${(i.categories ?? []).join(', ')}]: ${i.description ?? ''}`).join('\n')
      }
      case 'get_component': {
        const includeSource = args.includeSource === true
        const docs = await Promise.all(
          namesArg(args).map(async (n) => {
            const item = await fetchItem(source, FRAMEWORK, n)
            const parts = [item.docs ?? `# ${item.name}\n\n${item.description ?? ''}`]
            if (includeSource) {
              for (const file of item.files) parts.push(`## Source: ${file.path}\n\n\`\`\`tsx\n${file.content.trim()}\n\`\`\``)
            }
            return parts.join('\n')
          }),
        )
        return docs.join('\n---\n\n')
      }
      case 'get_add_command': {
        const names = namesArg(args)
        const pm = (stringArg(args, 'packageManager') as keyof typeof runners | undefined) ?? detectPackageManager(opts.cwd)
        const tree = await resolveTree(source, FRAMEWORK, names)
        const deps = [...new Set(tree.flatMap((i) => i.dependencies ?? []))]
        const lines = [`Run in the project root:\n\n${runners[pm](`add ${names.join(' ')}`)}`]
        if (!config) lines.push(`\nThe project is not initialized. Run first:\n\n${runners[pm]('init')}`)
        lines.push(`\nRegistry items written: ${tree.map((i) => i.name).join(', ')}`)
        if (deps.length) lines.push(`npm packages installed: ${deps.join(', ')}`)
        return lines.join('\n')
      }
      case 'get_design_guidelines':
        return readFromSource(source, 'guidelines.md')
      case 'get_theme':
        return fetchTokens(source)
      case 'get_project_setup': {
        if (!config) {
          const pm = detectPackageManager(opts.cwd)
          return `denseui is not initialized in ${opts.cwd} (no ${CONFIG_FILE}).\n\nRun: ${runners[pm]('init')}\n\nRequirements: React 19+, Tailwind CSS v4, an "@/*" tsconfig path alias.`
        }
        const index = await fetchIndex(source, FRAMEWORK)
        const installed = index
          .filter((i) => i.type === 'registry:ui' && existsSync(path.join(opts.cwd, config.paths.ui, `${i.name}.tsx`)))
          .map((i) => i.name)
        return [
          `denseui is initialized.`,
          `CSS: ${config.tailwind.css}`,
          `Components directory: ${config.paths.ui} (import from "${config.aliases.ui}/<name>")`,
          `cn() helper: "${config.aliases.utils}"`,
          `Installed components (${installed.length}): ${installed.join(', ') || 'none'}`,
        ].join('\n')
      }
      default:
        throw new RpcError(-32602, `Unknown tool: ${name}`)
    }
  }

  async function readResource(uri: string) {
    const text =
      uri === 'denseui://guidelines'
        ? await readFromSource(source, 'guidelines.md')
        : uri === 'denseui://theme'
          ? await fetchTokens(source)
          : uri === 'denseui://llms.txt'
            ? await readFromSource(source, 'llms.txt')
            : undefined
    if (text === undefined) throw new RpcError(-32002, `Resource not found: ${uri}`)
    return { contents: [{ uri, mimeType: resources.find((r) => r.uri === uri)!.mimeType, text }] }
  }

  async function handle(request: Request): Promise<Json> {
    const params = request.params ?? {}
    switch (request.method) {
      case 'initialize':
        return {
          protocolVersion: typeof params.protocolVersion === 'string' ? params.protocolVersion : PROTOCOL_VERSION,
          capabilities: { tools: {}, resources: {} },
          serverInfo: { name: 'denseui', version: pkg.version },
          instructions: INSTRUCTIONS,
        }
      case 'ping':
        return {}
      case 'tools/list':
        return { tools } as unknown as Json
      case 'tools/call': {
        const name = String(params.name ?? '')
        const args = (params.arguments ?? {}) as Record<string, unknown>
        try {
          return { content: [{ type: 'text', text: await callTool(name, args) }] }
        } catch (error) {
          if (error instanceof RpcError) throw error
          return { content: [{ type: 'text', text: error instanceof Error ? error.message : String(error) }], isError: true }
        }
      }
      case 'resources/list':
        return { resources } as unknown as Json
      case 'resources/read':
        return (await readResource(String(params.uri ?? ''))) as unknown as Json
      default:
        throw new RpcError(-32601, `Method not found: ${request.method}`)
    }
  }

  // stdout carries only JSON-RPC; diagnostics go to stderr.
  const send = (message: Json) => process.stdout.write(JSON.stringify(message) + '\n')
  const rl = createInterface({ input: process.stdin, crlfDelay: Infinity })

  rl.on('line', async (line) => {
    if (!line.trim()) return
    let request: Request
    try {
      request = JSON.parse(line) as Request
    } catch {
      send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } })
      return
    }
    if (request.id === undefined) return
    try {
      send({ jsonrpc: '2.0', id: request.id, result: await handle(request) })
    } catch (error) {
      const code = error instanceof RpcError ? error.code : -32603
      send({ jsonrpc: '2.0', id: request.id, error: { code, message: error instanceof Error ? error.message : String(error) } })
    }
  })
  process.stderr.write(`denseui MCP server ${pkg.version} ready (registry: ${source})\n`)
}

const clients = {
  vscode: { file: '.vscode/mcp.json', key: 'servers', entry: { type: 'stdio', command: 'npx', args: ['-y', 'denseui@latest', 'mcp'] } },
  cursor: { file: '.cursor/mcp.json', key: 'mcpServers', entry: { command: 'npx', args: ['-y', 'denseui@latest', 'mcp'] } },
  claude: { file: '.mcp.json', key: 'mcpServers', entry: { command: 'npx', args: ['-y', 'denseui@latest', 'mcp'] } },
} as const

export async function mcpInit(opts: { cwd: string; client?: string }) {
  const client = opts.client as keyof typeof clients | undefined
  if (!client || !(client in clients)) {
    throw new Error(`Specify --client ${Object.keys(clients).join(' | ')}`)
  }
  const { file, key, entry } = clients[client]
  const target = path.join(opts.cwd, file)
  const existing = existsSync(target) ? (JSON.parse(await readFile(target, 'utf8')) as Record<string, unknown>) : {}
  const servers = (existing[key] ?? {}) as Record<string, unknown>
  const next = { ...existing, [key]: { ...servers, denseui: entry } }
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, JSON.stringify(next, null, 2) + '\n')
  log.success(`${file} (denseui MCP server added for ${client})`)
}
