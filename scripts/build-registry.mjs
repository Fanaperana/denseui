// Builds registry/<framework>/*.json (+ tokens.css, llms.txt) and bundles a copy into the CLI package.
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'registry')
const cliRegistryDir = path.join(root, 'packages/cli/registry')
const playgroundPublic = path.join(root, 'apps/playground/public')
const demosDir = path.join(root, 'apps/playground/src/demos')
const frameworks = ['react']
const tokenFiles = ['theme.css', 'palette.css', 'base.css']

// LF everywhere so the output doesn't depend on the OS's git checkout settings.
const readText = async (file) => (await readFile(file, 'utf8')).replace(/\r\n/g, '\n')
// Set when publishing to a URL so registryDependencies resolve with the shadcn CLI too.
const publicUrl = process.env.DENSEUI_REGISTRY_URL?.replace(/\/$/, '')

const categories = {
  inputs: ['button', 'button-group', 'input', 'input-group', 'input-otp', 'password-input', 'number-input', 'textarea', 'label', 'field', 'form', 'checkbox', 'radio-group', 'switch', 'select', 'native-select', 'combobox', 'tags-input', 'slider', 'rating', 'toggle', 'toggle-group', 'segmented-control', 'calendar', 'date-picker', 'color-picker', 'file-upload', 'editable'],
  overlays: ['dialog', 'alert-dialog', 'sheet', 'drawer', 'popover', 'hover-card', 'tooltip', 'dropdown-menu', 'context-menu', 'menubar', 'command', 'toast'],
  layout: ['sidebar', 'tree-view', 'navigation-menu', 'breadcrumb', 'tabs', 'steps', 'accordion', 'collapsible', 'resizable', 'scroll-area', 'card', 'item', 'property', 'block', 'separator', 'aspect-ratio', 'pagination', 'typography'],
  data: ['data-table', 'table', 'chart', 'badge', 'kbd', 'avatar', 'alert', 'callout', 'empty', 'progress', 'spinner', 'skeleton', 'carousel'],
  lib: ['utils'],
}
const categoryOf = (name) => Object.keys(categories).filter((c) => categories[c].includes(name))

const toTitle = (name) => name.replace(/(^|-)(\w)/g, (_, sep, c) => (sep ? ' ' : '') + c.toUpperCase()).replace('Otp', 'OTP')

function exportsOf(source) {
  const names = []
  for (const block of source.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const raw of block[1].split(',')) {
      const entry = raw.trim()
      if (!entry || entry.startsWith('type ')) continue
      names.push(entry.split(/\s+as\s+/).pop())
    }
  }
  for (const fn of source.matchAll(/export\s+(?:function|const)\s+(\w+)/g)) names.push(fn[1])
  return [...new Set(names)]
}

function docsFor(item, exports, example, extraExamples) {
  const lines = [`# ${toTitle(item.name)}`, '', item.description ?? '', '', '## Install', '', '```bash', `npx denseui@latest add ${item.name}`, '```']
  const deps = item.dependencies ?? []
  const uses = (item.registryDependencies ?? []).filter((d) => d !== 'utils')
  if (deps.length) lines.push('', `npm dependencies: ${deps.map((d) => `\`${d}\``).join(', ')}`)
  if (uses.length) lines.push('', `Also installs: ${uses.map((d) => `\`${d}\``).join(', ')}`)
  if (exports.length) {
    lines.push('', '## Usage', '', '```tsx', `import { ${exports.join(', ')} } from "@/components/ui/${item.name}"`, '```')
  }
  if (example) lines.push('', '## Example', '', '```tsx', example.trim(), '```')
  for (const extra of extraExamples) lines.push('', `## Example: ${extra.title}`, '', '```tsx', extra.code.trim(), '```')
  return lines.join('\n') + '\n'
}

async function buildFramework(framework) {
  const pkgDir = path.join(root, 'packages', framework)
  const manifest = JSON.parse(await readFile(path.join(pkgDir, 'registry.json'), 'utf8'))
  const names = new Set(manifest.items.map((item) => item.name))
  const frameworkOut = path.join(outDir, framework)
  await mkdir(frameworkOut, { recursive: true })

  const index = []
  const full = []
  const demoFiles = await readdir(demosDir)
  for (const item of manifest.items) {
    for (const dep of item.registryDependencies ?? []) {
      if (!names.has(dep)) throw new Error(`${framework}/${item.name}: unknown registry dependency "${dep}"`)
    }
    const files = await Promise.all(
      item.files.map(async (file) => ({
        ...file,
        content: await readText(path.join(pkgDir, 'src', file.path)),
      })),
    )
    const demoPath = path.join(demosDir, `${item.name}.tsx`)
    const example = existsSync(demoPath) ? await readText(demoPath) : undefined
    const extraExamples = await Promise.all(
      demoFiles
        .filter((f) => f.startsWith(`${item.name}.`) && f !== `${item.name}.tsx`)
        .map(async (f) => ({
          title: toTitle(f.slice(item.name.length + 1, -'.tsx'.length)),
          code: await readText(path.join(demosDir, f)),
        })),
    )
    const exports = files.flatMap((f) => exportsOf(f.content))
    const docs = docsFor(item, exports, example, extraExamples)
    const registryDependencies = publicUrl
      ? item.registryDependencies?.map((dep) => `${publicUrl}/${framework}/${dep}.json`)
      : item.registryDependencies
    const built = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      ...item,
      ...(registryDependencies ? { registryDependencies } : {}),
      title: toTitle(item.name),
      categories: categoryOf(item.name),
      docs,
      meta: { exports },
      files,
    }
    await writeFile(path.join(frameworkOut, `${item.name}.json`), JSON.stringify(built, null, 2) + '\n')
    const source = files.map((f) => `## Source: ${f.path}\n\n\`\`\`tsx\n${f.content.trim()}\n\`\`\``).join('\n\n')
    await writeFile(path.join(frameworkOut, `${item.name}.md`), `${docs}\n${source}\n`)
    full.push(`${docs}\n${source}\n`)
    const { files: _files, ...meta } = item
    index.push({ ...meta, title: built.title, categories: built.categories, exports })
  }
  await writeFile(path.join(frameworkOut, 'index.json'), JSON.stringify(index, null, 2) + '\n')
  return { index, full }
}

function llmsIndex(framework, index) {
  const lines = [
    '# denseui',
    '',
    '> Ultra-dense, modern UI components for React, built on Tailwind CSS v4 and Ark UI. Components are copied into the project with `npx denseui@latest add <name>` and imported from `@/components/ui/<name>`. 24px controls, 13px body text, semantic color tokens, light/dark via the `.dark` class.',
    '',
    'Read the design guidelines before generating UI. An MCP server is available: `npx denseui@latest mcp`.',
    '',
    '## Docs',
    '',
    '- [Design guidelines](guidelines.md): density, color tokens, component choice and rules',
    '- [Theme tokens](tokens.css): every CSS variable and Tailwind theme value',
    '- [Full docs](llms-full.txt): guidelines plus every component with example and source',
  ]
  for (const [category, members] of Object.entries(categories)) {
    if (category === 'lib') continue
    lines.push('', `## ${category[0].toUpperCase()}${category.slice(1)}`, '')
    for (const name of members) {
      const item = index.find((i) => i.name === name)
      if (item) lines.push(`- [${item.title}](${framework}/${item.name}.md): ${item.description}`)
    }
  }
  return lines.join('\n') + '\n'
}

async function buildTokens() {
  const parts = await Promise.all(
    tokenFiles.map((file) => readText(path.join(root, 'packages/tokens/src', file))),
  )
  const css = `/* DenseUI tokens — generated, edit freely */\n\n${parts.join('\n')}`
  await writeFile(path.join(outDir, 'tokens.css'), css)
}

await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })
const guidelines = await readText(path.join(root, 'packages/react/llm/guidelines.md'))
await writeFile(path.join(outDir, 'guidelines.md'), guidelines)
for (const framework of frameworks) {
  const { index, full } = await buildFramework(framework)
  const llms = llmsIndex(framework, index)
  const llmsFull = [llms, guidelines, ...full].join('\n---\n\n')
  await writeFile(path.join(outDir, 'llms.txt'), llms)
  await writeFile(path.join(outDir, 'llms-full.txt'), llmsFull)
  await writeFile(path.join(playgroundPublic, 'llms.txt'), llms)
  await writeFile(path.join(playgroundPublic, 'llms-full.txt'), llmsFull)
  console.log(`✓ ${framework}: ${index.length} items`)
}
await buildTokens()
await rm(cliRegistryDir, { recursive: true, force: true })
await cp(outDir, cliRegistryDir, { recursive: true })
console.log(`✓ registry written to ${path.relative(root, outDir)} and bundled into packages/cli`)
