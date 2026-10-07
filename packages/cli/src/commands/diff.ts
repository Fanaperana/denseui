import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { loadConfig, transformImports } from '../config.js'
import { fetchItem, resolveRegistrySource } from '../registry.js'
import { dim, green, log, red, safeJoin } from '../utils.js'

/** Minimal LCS line diff; registry files are small so O(n*m) is fine. */
function diffLines(a: string[], b: string[]): string[] {
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      dp[i]![j] = a[i] === b[j] ? dp[i + 1]![j + 1]! + 1 : Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!)
    }
  }
  const out: string[] = []
  let i = 0
  let j = 0
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      i++
      j++
    } else if (j < b.length && (i >= a.length || dp[i]![j + 1]! >= dp[i + 1]![j]!)) {
      out.push(green(`+ ${b[j++]}`))
    } else {
      out.push(red(`- ${a[i++]}`))
    }
  }
  return out
}

export async function diff(opts: { cwd: string; name: string; registry?: string }) {
  const config = await loadConfig(opts.cwd)
  const item = await fetchItem(resolveRegistrySource(opts.registry, config.registry), config.framework, opts.name)

  for (const file of item.files) {
    const dir = file.type === 'registry:lib' ? config.paths.lib : config.paths.ui
    const target = safeJoin(opts.cwd, dir, path.basename(file.path))
    const display = path.relative(opts.cwd, target).split(path.sep).join('/')
    if (!existsSync(target)) {
      log.info(`${display} ${dim('(not installed)')}`)
      continue
    }
    const local = (await readFile(target, 'utf8')).split(/\r?\n/)
    const remote = transformImports(file.content, config.aliases).split(/\r?\n/)
    const changes = diffLines(local, remote)
    if (changes.length === 0) {
      log.success(`${display} is up to date`)
      continue
    }
    log.info(`${display} ${dim('(- local, + registry)')}`)
    changes.forEach((line) => log.info(`  ${line}`))
  }
}
