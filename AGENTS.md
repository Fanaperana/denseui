# AGENTS.md

Guidance for AI coding agents working in the denseui repository.

## What this is

denseui is a copy-paste component registry (like shadcn/ui) for React 19 + Tailwind CSS v4, with behavior from Ark UI. It's a pnpm monorepo:

| Path | Purpose |
| --- | --- |
| `packages/tokens/src/*.css` | Design tokens (`@theme`), palette, base styles. Shared by every framework. |
| `packages/react/src/components/ui/*.tsx` | Component source. **This is the registry**; files are copied verbatim into user projects. |
| `packages/react/registry.json` | Registry manifest: name, description, npm + registry dependencies, files. |
| `packages/react/llm/guidelines.md` | Design rules served to LLMs (MCP `get_design_guidelines`, `llms-full.txt`). |
| `packages/cli/src` | `denseui` CLI: `init`, `add`, `list`, `diff`, `mcp`. Zero runtime dependencies. |
| `apps/playground` | Docs site. `src/demos/<name>.tsx` is the live demo **and** the example shipped to LLMs. |
| `scripts/build-registry.mjs` | Builds `registry/` (JSON, `.md` per component, `llms.txt`, `llms-full.txt`). |

## Commands

```bash
pnpm install
pnpm dev              # docs at http://localhost:5173
pnpm registry:build   # run after changing components, registry.json, demos or guidelines
pnpm typecheck        # must pass
pnpm --filter @denseui/playground build
```

## Component rules

- One file per component in `packages/react/src/components/ui/`. Only import `@/lib/utils` and other registry components via `@/components/ui/<name>` (the CLI rewrites these aliases).
- Function components with React 19 ref-as-prop. No `forwardRef`.
- Every rendered part sets `data-slot="<component>-<part>"` and merges `className` last via `cn()`.
- Variants use `class-variance-authority`. Export the variants function when it's useful to other components.
- Interactive behavior comes from `@ark-ui/react/<component>`. Overlays render in `<Portal>` and use `lazyMount unmountOnExit`.
- Data table code targets **TanStack Table v9** (`useTable`, explicit `tableFeatures`), not v8.

## Design rules (enforced in review)

- Control heights 20/24/28px (`h-5`/`h-6`/`h-7`). Text `text-sm` (12px) in controls.
- Padding is always `py < px`. Items `px-2.5 py-1.5`, panels `px-4 py-3`, popovers `px-3 py-2`.
- Semantic color tokens only (`bg-background`, `text-muted-foreground`, `border-border`, …). No raw palette colors.
- Elements with their own background hover with `hover:bg-surface-hover` (opaque). `hover:bg-accent` (translucent) is only for items with no background of their own.
- Don't change `--text-sm--line-height` (17px): it's tuned so 12px Inter sits optically centered.

## Adding a component

1. Create `packages/react/src/components/ui/<name>.tsx`.
2. Add an entry to `packages/react/registry.json` (description is shown to users and LLMs; keep it one line).
3. Add the category in `scripts/build-registry.mjs` (`categories`) and an icon in `apps/playground/src/docs.ts`.
4. Add `apps/playground/src/demos/<name>.tsx` with a realistic default-export demo.
5. Run `pnpm registry:build && pnpm typecheck`, then check light and dark mode in the docs.
