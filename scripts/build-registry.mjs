// Builds registry/<framework>/*.json (+ tokens.css) and bundles a copy into the CLI package.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'registry')
const cliRegistryDir = path.join(root, 'packages/cli/registry')
const frameworks = ['react']
const tokenFiles = ['theme.css', 'palette.css', 'base.css']

async function buildFramework(framework) {
  const pkgDir = path.join(root, 'packages', framework)
  const manifest = JSON.parse(await readFile(path.join(pkgDir, 'registry.json'), 'utf8'))
  const names = new Set(manifest.items.map((item) => item.name))
  const frameworkOut = path.join(outDir, framework)
  await mkdir(frameworkOut, { recursive: true })

  const index = []
  for (const item of manifest.items) {
    for (const dep of item.registryDependencies ?? []) {
      if (!names.has(dep)) throw new Error(`${framework}/${item.name}: unknown registry dependency "${dep}"`)
    }
    const files = await Promise.all(
      item.files.map(async (file) => ({
        ...file,
        content: await readFile(path.join(pkgDir, 'src', file.path), 'utf8'),
      })),
    )
    const built = { $schema: 'https://ui.shadcn.com/schema/registry-item.json', ...item, files }
    await writeFile(path.join(frameworkOut, `${item.name}.json`), JSON.stringify(built, null, 2) + '\n')
    const { files: _files, ...meta } = item
    index.push(meta)
  }
  await writeFile(path.join(frameworkOut, 'index.json'), JSON.stringify(index, null, 2) + '\n')
  return index.length
}

async function buildTokens() {
  const parts = await Promise.all(
    tokenFiles.map((file) => readFile(path.join(root, 'packages/tokens/src', file), 'utf8')),
  )
  const css = `/* DenseUI tokens — generated, edit freely */\n\n${parts.join('\n')}`
  await writeFile(path.join(outDir, 'tokens.css'), css)
}

await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })
for (const framework of frameworks) {
  const count = await buildFramework(framework)
  console.log(`✓ ${framework}: ${count} items`)
}
await buildTokens()
await rm(cliRegistryDir, { recursive: true, force: true })
await cp(outDir, cliRegistryDir, { recursive: true })
console.log(`✓ registry written to ${path.relative(root, outDir)} and bundled into packages/cli`)
