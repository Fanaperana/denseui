#!/usr/bin/env node
import { parseArgs } from 'node:util'
import { add } from './commands/add.js'
import { diff } from './commands/diff.js'
import { init } from './commands/init.js'
import { list } from './commands/list.js'
import { mcp, mcpInit } from './commands/mcp.js'
import { update } from './commands/update.js'
import { red } from './utils.js'

const HELP = `denseui — ultra-dense, modern components for Tailwind CSS v4

Usage:
  denseui init [--css <path>] [-y]        Set up tokens, components.json and utils
  denseui add <names...> [--all] [-o] [-y] Copy components into your project
  denseui list                             Show available components
  denseui diff <name>                      Compare a local component with the registry
  denseui update [names...] [-y]           Update installed components that changed in the registry
  denseui mcp                              Start the MCP server (stdio) for AI assistants
  denseui mcp init --client <name>         Add the MCP server to vscode | cursor | claude config

Options:
  --cwd <path>        Project root (default: current directory)
  --registry <src>    Registry URL or local path (default: bundled registry)
  -o, --overwrite     Overwrite existing files without asking
  -y, --yes           Skip prompts (keeps existing files unless --overwrite)
  --skip-install      Don't install npm dependencies
  -h, --help          Show help`

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      cwd: { type: 'string' },
      css: { type: 'string' },
      client: { type: 'string' },
      registry: { type: 'string' },
      all: { type: 'boolean' },
      overwrite: { type: 'boolean', short: 'o' },
      yes: { type: 'boolean', short: 'y' },
      'skip-install': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    },
  })
  const [command, ...rest] = positionals
  const cwd = values.cwd ?? process.cwd()
  const registry = values.registry
  const skipInstall = values['skip-install']

  if (values.help || !command) return console.log(HELP)

  switch (command) {
    case 'init':
      return init({ cwd, css: values.css, yes: values.yes, registry, skipInstall })
    case 'add':
      return add({ cwd, names: rest, all: values.all, overwrite: values.overwrite, yes: values.yes, registry, skipInstall })
    case 'update':
      return update({ cwd, names: rest, yes: values.yes, registry, skipInstall })
    case 'list':
      return list({ cwd, registry })
    case 'diff':
      if (!rest[0]) throw new Error('Usage: denseui diff <name>')
      return diff({ cwd, name: rest[0], registry })
    case 'mcp':
      return rest[0] === 'init' ? mcpInit({ cwd, client: values.client }) : mcp({ cwd, registry })
    default:
      throw new Error(`Unknown command "${command}".\n\n${HELP}`)
  }
}

main().catch((error: unknown) => {
  console.error(red(`✖ ${error instanceof Error ? error.message : String(error)}`))
  process.exit(1)
})
