import { existsSync } from 'node:fs'
import path from 'node:path'
import { CONFIG_FILE, loadConfig, type Config } from '../config.js'
import { fetchIndex, resolveRegistrySource } from '../registry.js'
import { dim, green, log } from '../utils.js'

export async function list(opts: { cwd: string; registry?: string }) {
  const config: Config | undefined = existsSync(path.join(opts.cwd, CONFIG_FILE))
    ? await loadConfig(opts.cwd)
    : undefined
  const framework = config?.framework ?? 'react'
  const items = await fetchIndex(resolveRegistrySource(opts.registry, config?.registry), framework)
  const width = Math.max(...items.map((i) => i.name.length))

  log.info(`Available ${framework} components:\n`)
  for (const item of items) {
    if (item.type !== 'registry:ui') continue
    const installed = config && existsSync(path.join(opts.cwd, config.paths.ui, `${item.name}.tsx`))
    log.info(`  ${(installed ? green : (s: string) => s)(item.name.padEnd(width))}  ${dim(item.description ?? '')}`)
  }
}
