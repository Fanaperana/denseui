import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { CONFIG_FILE, writeConfig, type Config } from '../config.js'
import { fetchTokens, resolveRegistrySource } from '../registry.js'
import { confirm, detectPackageManager, hasDependency, installPackages, log, parseJsonc, readPackageJson, safeJoin } from '../utils.js'
import { add } from './add.js'

export interface InitOptions {
  cwd: string
  css?: string
  yes?: boolean
  registry?: string
  skipInstall?: boolean
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

  await add({ cwd, names: ['utils'], yes: opts.yes, registry: opts.registry, skipInstall: opts.skipInstall })

  await ensurePathAlias(cwd, prefix, opts)
  await ensureTailwind(cwd, opts)

  log.info('\nDone. Add components with `denseui add button dropdown-menu`.')
}

async function ensurePathAlias(cwd: string, prefix: string, opts: InitOptions) {
  const candidates = ['tsconfig.app.json', 'tsconfig.json'].map((f) => path.join(cwd, f)).filter((f) => existsSync(f))
  const texts = await Promise.all(candidates.map((f) => readFile(f, 'utf8')))
  if (texts.some((t) => t.includes('"@/*"'))) return

  const manual = `Add \`"paths": { "@/*": ["./${prefix}*"] }\` to compilerOptions in tsconfig, or edit "aliases" in ${CONFIG_FILE}.`
  const target = candidates.find((_, i) => /"compilerOptions"/.test(texts[i]!))
  if (!target) {
    log.warn(`No "@/*" path alias found. ${manual}`)
    return
  }
  const name = path.basename(target)
  const text = texts[candidates.indexOf(target)]!
  const hasComments = /\/\/|\/\*/.test(text.replace(/"(?:[^"\\]|\\.)*"/g, '""'))
  const ok =
    opts.yes || (await confirm(`Add the "@/*" path alias to ${name}?${hasComments ? ' (comments in it will be removed)' : ''}`, true))
  if (!ok) {
    log.warn(`Skipped. ${manual}`)
    return
  }
  try {
    const json = parseJsonc(text) as { compilerOptions?: { paths?: Record<string, string[]> } }
    json.compilerOptions ??= {}
    json.compilerOptions.paths = { ...json.compilerOptions.paths, '@/*': [`./${prefix}*`] }
    await writeFile(target, JSON.stringify(json, null, 2) + '\n')
    log.success(`${name} (added "@/*" alias)`)
  } catch {
    log.warn(`Couldn't parse ${name}. ${manual}`)
    return
  }

  const viteConfig = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'].find((f) => existsSync(path.join(cwd, f)))
  if (viteConfig && !(await readFile(path.join(cwd, viteConfig), 'utf8')).includes("'@'")) {
    log.info(
      `\nAlso add the alias to ${viteConfig}:\n\n  import path from 'node:path'\n  resolve: { alias: { '@': path.resolve(import.meta.dirname, './${prefix.replace(/\/$/, '')}') } }\n`,
    )
  }
}

async function ensureTailwind(cwd: string, opts: InitOptions) {
  const pkg = await readPackageJson(cwd)
  if (hasDependency(pkg, 'tailwindcss')) return
  const viteConfig = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'].find((f) => existsSync(path.join(cwd, f)))
  const packages = viteConfig ? ['tailwindcss', '@tailwindcss/vite'] : ['tailwindcss', '@tailwindcss/postcss']
  if (opts.skipInstall) {
    log.warn(`Tailwind CSS v4 is required. Install: ${packages.join(' ')}`)
    return
  }
  if (!opts.yes && !(await confirm(`Tailwind CSS v4 is required. Install ${packages.join(' ')}?`, true))) return
  installPackages(cwd, detectPackageManager(cwd), packages, true)
  log.info(
    viteConfig
      ? `\nAdd the plugin to ${viteConfig}:\n\n  import tailwindcss from '@tailwindcss/vite'\n  plugins: [react(), tailwindcss()]\n`
      : `\nAdd "@tailwindcss/postcss" to your PostCSS config: export default { plugins: { '@tailwindcss/postcss': {} } }\n`,
  )
}
