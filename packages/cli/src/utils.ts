import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { createInterface } from 'node:readline/promises'

export type PackageManager = 'pnpm' | 'yarn' | 'bun' | 'npm'

const color = (code: number) => (text: string) => (process.stdout.isTTY ? `\x1b[${code}m${text}\x1b[0m` : text)
export const dim = color(2)
export const green = color(32)
export const yellow = color(33)
export const red = color(31)

export const log = {
  info: (msg: string) => console.log(msg),
  success: (msg: string) => console.log(`${green('✓')} ${msg}`),
  warn: (msg: string) => console.log(`${yellow('!')} ${msg}`),
  skip: (msg: string) => console.log(`${dim('-')} ${dim(msg)}`),
}

export function detectPackageManager(cwd: string): PackageManager {
  const ua = process.env.npm_config_user_agent ?? ''
  if (existsSync(path.join(cwd, 'pnpm-lock.yaml')) || ua.startsWith('pnpm')) return 'pnpm'
  if (existsSync(path.join(cwd, 'yarn.lock')) || ua.startsWith('yarn')) return 'yarn'
  if (existsSync(path.join(cwd, 'bun.lockb')) || existsSync(path.join(cwd, 'bun.lock')) || ua.startsWith('bun'))
    return 'bun'
  return 'npm'
}

export interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export async function readPackageJson(cwd: string): Promise<PackageJson> {
  const file = path.join(cwd, 'package.json')
  if (!existsSync(file)) throw new Error('No package.json found. Run this command in your project root.')
  return JSON.parse(await readFile(file, 'utf8')) as PackageJson
}

export function hasDependency(pkg: PackageJson, name: string) {
  return Boolean(pkg.dependencies?.[name] ?? pkg.devDependencies?.[name])
}

// Registry content may be remote: only allow plain package specifiers before handing them to a shell.
const PACKAGE_SPEC_RE = /^(@[a-z0-9][\w.-]*\/)?[a-z0-9][\w.-]*(@[\w.^~<>=|-]+)?$/i

export function installPackages(cwd: string, pm: PackageManager, packages: string[], dev = false) {
  if (packages.length === 0) return
  const invalid = packages.filter((p) => !PACKAGE_SPEC_RE.test(p))
  if (invalid.length) throw new Error(`Refusing to install invalid package names: ${invalid.join(', ')}`)

  const args = [pm === 'npm' ? 'install' : 'add', ...(dev ? ['-D'] : []), ...packages]
  log.info(dim(`$ ${pm} ${args.join(' ')}`))
  const result = spawnSync(pm, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
  if (result.status !== 0) throw new Error(`${pm} exited with code ${result.status}`)
}

export async function confirm(question: string, defaultYes = false): Promise<boolean> {
  if (!process.stdin.isTTY) return defaultYes
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  try {
    const answer = (await rl.question(`${question} ${dim(defaultYes ? '(Y/n)' : '(y/N)')} `)).trim().toLowerCase()
    return answer === '' ? defaultYes : answer === 'y' || answer === 'yes'
  } finally {
    rl.close()
  }
}

/** Resolves path segments under `root` and throws if the result escapes it. */
export function safeJoin(root: string, ...segments: string[]) {
  const target = path.resolve(root, ...segments)
  const rel = path.relative(root, target)
  if (rel.startsWith('..') || path.isAbsolute(rel)) throw new Error(`Refusing to write outside the project: ${target}`)
  return target
}
