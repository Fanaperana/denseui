import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { CONFIG_FILE, writeConfig, type Config } from '../config.js'
import { fetchTokens, resolveRegistrySource } from '../registry.js'
import { confirm, hasDependency, log, readPackageJson, safeJoin } from '../utils.js'
import { add } from './add.js'

export interface InitOptions {
  cwd: string
  css?: string
  yes?: boolean
  registry?: string
}

const CSS_CANDIDATES = [
  'src/index.css',
  'src/app/globals.css',
  'app/globals.css',
  'src/styles/globals.css',
  'styles/globals.css',
  'src/styles.css',
  'src/global.css',
]
const TOKENS_FILE = 'denseui.css'
const TAILWIND_IMPORT_RE = /^@import\s+["']tailwindcss["'][^;]*;[^\S\n]*$/m
const toPosix = (p: string) => p.split(path.sep).join('/')

export async function init(opts: InitOptions) {
  const { cwd } = opts
  const pkg = await readPackageJson(cwd)
  if (!hasDependency(pkg, 'react')) {
    throw new Error('Only React projects are supported right now ("react" not found in package.json).')
  }
  if (!hasDependency(pkg, 'tailwindcss')) {
    log.warn('tailwindcss not found in package.json. DenseUI requires Tailwind CSS v4.')
  }
  if (existsSync(path.join(cwd, CONFIG_FILE)) && !opts.yes) {
    if (!(await confirm(`${CONFIG_FILE} already exists. Overwrite?`))) return
  }

  const cssPath = opts.css ?? CSS_CANDIDATES.find((c) => existsSync(path.join(cwd, c)))
  if (!cssPath) throw new Error('Could not find your global CSS file. Pass it with --css <path>.')
  const cssFile = safeJoin(cwd, cssPath)

  const source = resolveRegistrySource(opts.registry)
  const tokensFile = path.join(path.dirname(cssFile), TOKENS_FILE)
  const writeTokens =
    !existsSync(tokensFile) || opts.yes || (await confirm(`${toPosix(path.relative(cwd, tokensFile))} exists. Overwrite?`))
  if (writeTokens) {
    await writeFile(tokensFile, await fetchTokens(source))
    log.success(toPosix(path.relative(cwd, tokensFile)))
  }

  let css = existsSync(cssFile) ? await readFile(cssFile, 'utf8') : ''
  const importLine = `@import "./${TOKENS_FILE}";`
  if (!css.includes(importLine)) {
    css = TAILWIND_IMPORT_RE.test(css)
      ? css.replace(TAILWIND_IMPORT_RE, (line) => `${line}\n${importLine}`)
      : `@import "tailwindcss";\n${importLine}\n${css}`
    await writeFile(cssFile, css)
    log.success(`${toPosix(cssPath)} (added tokens import)`)
  }

  const prefix = existsSync(path.join(cwd, 'src')) ? 'src/' : ''
  const config: Config = {
    framework: 'react',
    tailwind: { css: toPosix(cssPath) },
    aliases: { components: '@/components', ui: '@/components/ui', lib: '@/lib', utils: '@/lib/utils' },
    paths: { ui: `${prefix}components/ui`, lib: `${prefix}lib` },
    ...(opts.registry ? { registry: opts.registry } : {}),
  }
  await writeConfig(cwd, config)
  log.success(CONFIG_FILE)

  await add({ cwd, names: ['utils'], yes: opts.yes, registry: opts.registry })

  const tsconfigs = ['tsconfig.json', 'tsconfig.app.json'].map((f) => path.join(cwd, f)).filter((f) => existsSync(f))
  const hasAlias = (await Promise.all(tsconfigs.map((f) => readFile(f, 'utf8')))).some((t) => t.includes('"@/*"'))
  if (!hasAlias) {
    log.warn(
      `No "@/*" path alias found. Add \`"paths": { "@/*": ["./${prefix}*"] }\` to tsconfig and a matching bundler alias, or edit "aliases" in ${CONFIG_FILE}.`,
    )
  }

  log.info('\nDone. Add components with `denseui add button dropdown-menu`.')
}
