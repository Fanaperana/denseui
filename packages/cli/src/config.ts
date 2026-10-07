import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const CONFIG_FILE = 'components.json'

export interface Config {
  $schema?: string
  framework: 'react'
  tailwind: { css: string }
  aliases: { components: string; ui: string; lib: string; utils: string }
  /** Filesystem locations (relative to project root) that the aliases point to. */
  paths: { ui: string; lib: string }
  registry?: string
}

export async function loadConfig(cwd: string): Promise<Config> {
  const file = path.join(cwd, CONFIG_FILE)
  if (!existsSync(file)) throw new Error(`No ${CONFIG_FILE} found. Run \`denseui init\` first.`)
  const config = JSON.parse(await readFile(file, 'utf8')) as Config
  if (!config.aliases || !config.paths) throw new Error(`${CONFIG_FILE} is missing "aliases" or "paths".`)
  return config
}

export async function writeConfig(cwd: string, config: Config) {
  await writeFile(path.join(cwd, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n')
}

/** Rewrites the registry's `@/` imports to the project's configured aliases. */
export function transformImports(code: string, aliases: Config['aliases']): string {
  return code
    .replace(/(['"])@\/lib\/utils\1/g, (_, q: string) => `${q}${aliases.utils}${q}`)
    .replace(/(['"])@\/components\/ui\//g, (_, q: string) => `${q}${aliases.ui}/`)
    .replace(/(['"])@\/lib\//g, (_, q: string) => `${q}${aliases.lib}/`)
}
