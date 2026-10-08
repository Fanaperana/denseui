import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { after, describe, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { transformImports } from '../dist/config.js'
import { dependencyName, fetchItem, resolveTree, resolveRegistrySource } from '../dist/registry.js'
import { parseJsonc, safeJoin } from '../dist/utils.js'

const cli = fileURLToPath(new URL('../dist/index.js', import.meta.url))
const registry = resolveRegistrySource()
const run = (args, cwd) => spawnSync(process.execPath, [cli, ...args, '--cwd', cwd], { encoding: 'utf8' })

describe('helpers', () => {
  test('transformImports rewrites registry aliases', () => {
    const out = transformImports(
      `import { cn } from '@/lib/utils'\nimport { Button } from "@/components/ui/button"\nimport { x } from '@/lib/other'`,
      { components: '~/c', ui: '~/c/ui', lib: '~/lib', utils: '~/lib/cn' },
    )
    assert.match(out, /from '~\/lib\/cn'/)
    assert.match(out, /from "~\/c\/ui\/button"/)
    assert.match(out, /from '~\/lib\/other'/)
  })

  test('safeJoin rejects paths escaping the project', () => {
    const root = path.resolve('/project')
    assert.equal(safeJoin(root, 'src', 'a.tsx'), path.join(root, 'src', 'a.tsx'))
    assert.throws(() => safeJoin(root, '..', 'etc', 'passwd'), /outside the project/)
  })

  test('parseJsonc handles comments, trailing commas and URLs inside strings', () => {
    const value = parseJsonc(`{
      // comment
      "$schema": "https://json.schemastore.org/tsconfig", /* block */
      "compilerOptions": { "strict": true, },
    }`)
    assert.deepEqual(value, { $schema: 'https://json.schemastore.org/tsconfig', compilerOptions: { strict: true } })
  })

  test('dependencyName accepts names and shadcn-style URLs', () => {
    assert.equal(dependencyName('button'), 'button')
    assert.equal(dependencyName('https://denseui.dev/r/react/dropdown-menu.json'), 'dropdown-menu')
    assert.throws(() => dependencyName('https://example.com/nope'))
  })
})

describe('registry', () => {
  test('rejects invalid component names', async () => {
    await assert.rejects(fetchItem(registry, 'react', '../secrets'), /Invalid component name/)
  })

  test('resolveTree returns dependencies before dependents, deduplicated', async () => {
    const names = (await resolveTree(registry, 'react', ['data-table', 'button'])).map((i) => i.name)
    assert.equal(names[0], 'utils')
    assert.equal(names.at(-1), 'data-table')
    assert.ok(names.indexOf('button') < names.indexOf('data-table'))
    assert.equal(new Set(names).size, names.length)
  })

  test('every item has docs, categories and exports', async () => {
    const item = await fetchItem(registry, 'react', 'dialog')
    assert.ok(item.docs?.includes('npx denseui@latest add dialog'))
    assert.deepEqual(item.categories, ['overlays'])
  })
})

describe('cli (integration)', () => {
  const cwd = mkdtempSync(path.join(tmpdir(), 'denseui-test-'))
  after(() => rmSync(cwd, { recursive: true, force: true }))

  mkdirSync(path.join(cwd, 'src'))
  writeFileSync(
    path.join(cwd, 'package.json'),
    JSON.stringify({ name: 't', dependencies: { react: '19', clsx: '*', 'tailwind-merge': '*' }, devDependencies: { tailwindcss: '4' } }),
  )
  writeFileSync(path.join(cwd, 'src/index.css'), '@import "tailwindcss";\n')
  writeFileSync(path.join(cwd, 'tsconfig.json'), '{\n  // app config\n  "compilerOptions": { "strict": true, },\n}\n')

  test('init writes tokens, config, utils and the @ alias', () => {
    const result = run(['init', '-y', '--skip-install'], cwd)
    assert.equal(result.status, 0, result.stderr)
    assert.ok(existsSync(path.join(cwd, 'src/denseui.css')))
    assert.ok(existsSync(path.join(cwd, 'src/lib/utils.ts')))
    assert.match(readFileSync(path.join(cwd, 'src/index.css'), 'utf8'), /@import "\.\/denseui\.css";/)
    const tsconfig = JSON.parse(readFileSync(path.join(cwd, 'tsconfig.json'), 'utf8'))
    assert.deepEqual(tsconfig.compilerOptions.paths, { '@/*': ['./src/*'] })
  })

  test('add copies components with their registry dependencies', () => {
    const result = run(['add', 'dropdown-menu', '--skip-install'], cwd)
    assert.equal(result.status, 0, result.stderr)
    assert.ok(existsSync(path.join(cwd, 'src/components/ui/dropdown-menu.tsx')))
    assert.match(result.stdout, /Skipped installing: .*@ark-ui\/react/)
  })

  test('update detects and restores local drift', () => {
    const file = path.join(cwd, 'src/components/ui/dropdown-menu.tsx')
    assert.match(run(['update', '-y', '--skip-install'], cwd).stdout, /up to date/)
    writeFileSync(file, readFileSync(file, 'utf8') + '\n// local edit\n')
    const result = run(['update', '-y', '--skip-install'], cwd)
    assert.equal(result.status, 0, result.stderr)
    assert.match(result.stdout, /dropdown-menu/)
    assert.doesNotMatch(readFileSync(file, 'utf8'), /local edit/)
  })

  test('add rejects path traversal names', () => {
    const result = run(['add', '../evil', '--skip-install'], cwd)
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /Invalid component name/)
  })
})

describe('mcp server', () => {
  test('speaks JSON-RPC over stdio and serves tools', async () => {
    const server = spawn(process.execPath, [cli, 'mcp'], { stdio: ['pipe', 'pipe', 'ignore'] })
    const responses = new Map()
    let buffer = ''
    server.stdout.on('data', (chunk) => {
      buffer += chunk
      for (let i = buffer.indexOf('\n'); i >= 0; i = buffer.indexOf('\n')) {
        const msg = JSON.parse(buffer.slice(0, i))
        buffer = buffer.slice(i + 1)
        responses.get(msg.id)?.(msg)
      }
    })
    let id = 0
    const call = (method, params) =>
      new Promise((resolve) => {
        responses.set(++id, resolve)
        server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n')
      })

    try {
      const init = await call('initialize', { protocolVersion: '2025-06-18', capabilities: {} })
      assert.equal(init.result.serverInfo.name, 'denseui')
      const tools = await call('tools/list')
      assert.ok(tools.result.tools.some((t) => t.name === 'get_component'))
      const list = await call('tools/call', { name: 'list_components', arguments: { query: 'table' } })
      assert.match(list.result.content[0].text, /data-table/)
      const bad = await call('tools/call', { name: 'get_component', arguments: { names: ['../x'] } })
      assert.equal(bad.result.isError, true)
      const unknown = await call('nope')
      assert.equal(unknown.error.code, -32601)
    } finally {
      server.kill()
    }
  })
})
