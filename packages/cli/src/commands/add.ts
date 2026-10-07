import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { loadConfig, transformImports } from '../config.js'
import { fetchIndex, resolveRegistrySource, resolveTree } from '../registry.js'
import {
  confirm,
  detectPackageManager,
  hasDependency,
  installPackages,
  log,
  readPackageJson,
  safeJoin,
} from '../utils.js'

export interface AddOptions {
  cwd: string
  names: string[]
  all?: boolean
  overwrite?: boolean
  yes?: boolean
  registry?: string
}

const packageName = (spec: string) => spec.replace(/(?<=.)@.*$/, '')

export async function add(opts: AddOptions) {
  const config = await loadConfig(opts.cwd)
  const source = resolveRegistrySource(opts.registry, config.registry)

  const names = opts.all ? (await fetchIndex(source, config.framework)).map((item) => item.name) : opts.names
  if (names.length === 0) throw new Error('Specify components to add, e.g. `denseui add button`, or pass --all.')

  const items = await resolveTree(source, config.framework, names)
  const deps = new Set<string>()
  const devDeps = new Set<string>()

  for (const item of items) {
    item.dependencies?.forEach((d) => deps.add(d))
    item.devDependencies?.forEach((d) => devDeps.add(d))

    for (const file of item.files) {
      const dir = file.type === 'registry:lib' ? config.paths.lib : config.paths.ui
      const target = safeJoin(opts.cwd, dir, path.basename(file.path))
      const display = path.relative(opts.cwd, target).split(path.sep).join('/')
      const content = transformImports(file.content, config.aliases)

      if (existsSync(target)) {
        if ((await readFile(target, 'utf8')) === content) {
          log.skip(`${display} (up to date)`)
          continue
        }
        const overwrite = opts.overwrite || (!opts.yes && (await confirm(`${display} already exists. Overwrite?`)))
        if (!overwrite) {
          log.skip(`${display} (kept existing)`)
          continue
        }
      }

      await mkdir(path.dirname(target), { recursive: true })
      await writeFile(target, content)
      log.success(display)
    }
  }

  const pkg = await readPackageJson(opts.cwd)
  const pm = detectPackageManager(opts.cwd)
  installPackages(opts.cwd, pm, [...deps].filter((d) => !hasDependency(pkg, packageName(d))))
  installPackages(opts.cwd, pm, [...devDeps].filter((d) => !hasDependency(pkg, packageName(d))), true)
}
