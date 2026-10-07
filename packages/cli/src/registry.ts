import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export interface RegistryFile {
  path: string
  type: string
  content: string
}

export interface RegistryItemMeta {
  name: string
  type: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
}

export interface RegistryItem extends RegistryItemMeta {
  files: RegistryFile[]
}

const BUNDLED_REGISTRY = fileURLToPath(new URL('../registry', import.meta.url))
const NAME_RE = /^[a-z0-9][a-z0-9-]*$/
const isUrl = (source: string) => /^https?:\/\//i.test(source)

export function resolveRegistrySource(flag?: string, configured?: string): string {
  return flag ?? process.env.DENSEUI_REGISTRY ?? configured ?? BUNDLED_REGISTRY
}

async function readFromSource(source: string, relative: string): Promise<string> {
  if (isUrl(source)) {
    const url = new URL(relative, source.endsWith('/') ? source : `${source}/`)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`)
    return res.text()
  }
  return readFile(path.join(source, relative), 'utf8')
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === 'string')
}

function assertMeta(value: unknown): asserts value is RegistryItemMeta {
  const item = value as Record<string, unknown>
  if (!item || typeof item !== 'object') throw new Error('Invalid registry item')
  if (typeof item.name !== 'string' || !NAME_RE.test(item.name)) throw new Error(`Invalid item name: ${item.name}`)
  if (typeof item.type !== 'string') throw new Error(`${item.name}: missing type`)
  for (const key of ['dependencies', 'devDependencies', 'registryDependencies'] as const) {
    if (item[key] !== undefined && !isStringArray(item[key])) throw new Error(`${item.name}: invalid ${key}`)
  }
}

function assertItem(value: unknown): asserts value is RegistryItem {
  assertMeta(value)
  const files = (value as unknown as Record<string, unknown>).files
  if (!Array.isArray(files)) throw new Error(`${value.name}: missing files`)
  for (const file of files) {
    if (typeof file?.path !== 'string' || typeof file?.type !== 'string' || typeof file?.content !== 'string') {
      throw new Error(`${value.name}: invalid file entry`)
    }
  }
}

export async function fetchIndex(source: string, framework: string): Promise<RegistryItemMeta[]> {
  const data: unknown = JSON.parse(await readFromSource(source, `${framework}/index.json`))
  if (!Array.isArray(data)) throw new Error('Invalid registry index')
  data.forEach(assertMeta)
  return data
}

export async function fetchItem(source: string, framework: string, name: string): Promise<RegistryItem> {
  if (!NAME_RE.test(name)) throw new Error(`Invalid component name: ${name}`)
  let raw: string
  try {
    raw = await readFromSource(source, `${framework}/${name}.json`)
  } catch {
    throw new Error(`Component "${name}" not found in registry. Run \`denseui list\` to see available components.`)
  }
  const data: unknown = JSON.parse(raw)
  assertItem(data)
  return data
}

/** Returns items with their registry dependencies first, deduplicated. */
export async function resolveTree(source: string, framework: string, names: string[]): Promise<RegistryItem[]> {
  const resolved = new Map<string, RegistryItem>()
  const visiting = new Set<string>()

  async function visit(name: string) {
    if (resolved.has(name) || visiting.has(name)) return
    visiting.add(name)
    const item = await fetchItem(source, framework, name)
    for (const dep of item.registryDependencies ?? []) await visit(dep)
    resolved.set(name, item)
  }

  for (const name of names) await visit(name)
  return [...resolved.values()]
}

export function fetchTokens(source: string): Promise<string> {
  return readFromSource(source, 'tokens.css')
}
