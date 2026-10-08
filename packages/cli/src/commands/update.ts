import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { loadConfig, transformImports } from '../config.js'
import { fetchIndex, fetchItem, resolveRegistrySource } from '../registry.js'
import { confirm, log, safeJoin } from '../utils.js'
import { add } from './add.js'

export interface UpdateOptions {
  cwd: string
  names: string[]
  yes?: boolean
  registry?: string
  skipInstall?: boolean
}

/** Re-syncs installed components with the registry, overwriting local copies that differ. */
export async function update(opts: UpdateOptions) {
  const config = await loadConfig(opts.cwd)
  const source = resolveRegistrySource(opts.registry, config.registry)
  const candidates = opts.names.length ? opts.names : (await fetchIndex(source, config.framework)).map((i) => i.name)

  const changed: string[] = []
  for (const name of candidates) {
    const item = await fetchItem(source, config.framework, name)
    let installed = false
    let differs = false
    for (const file of item.files) {
      const dir = file.type === 'registry:lib' ? config.paths.lib : config.paths.ui
      const target = safeJoin(opts.cwd, dir, path.basename(file.path))
      if (!existsSync(target)) continue
      installed = true
      if ((await readFile(target, 'utf8')) !== transformImports(file.content, config.aliases)) differs = true
    }
    if (opts.names.includes(name) && !installed) log.warn(`${name} is not installed; use \`denseui add ${name}\`.`)
    if (installed && differs) changed.push(name)
  }

  if (changed.length === 0) {
    log.success('All installed components are up to date.')
    return
  }
  log.info(`Components with registry changes:\n${changed.map((n) => `  - ${n}`).join('\n')}\n`)
  log.info('Run `denseui diff <name>` to review. Updating overwrites local edits.')
  if (!opts.yes && !(await confirm(`Update ${changed.length} component(s)?`))) return
  await add({ cwd: opts.cwd, names: changed, overwrite: true, yes: true, registry: opts.registry, skipInstall: opts.skipInstall })
}
