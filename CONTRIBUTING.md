# Contributing to denseui

Thanks for helping make denseui better! Bug reports, component ideas, docs fixes and pull requests are all welcome.

## Ground rules

- Be kind. This project follows the [Code of Conduct](CODE_OF_CONDUCT.md).
- For anything bigger than a small fix, [open an issue](https://github.com/Fanaperana/denseui/issues/new/choose) first so we can agree on the approach.
- Security problems go through [SECURITY.md](SECURITY.md), not public issues.

## Setup

Requirements: Node 20+ and pnpm 10.

```bash
git clone https://github.com/Fanaperana/denseui.git
cd denseui
pnpm install
pnpm dev              # docs at http://localhost:5173
```

## Project layout

| Path | What lives there |
| --- | --- |
| `packages/tokens/src` | Design tokens (`@theme`), palette and base styles |
| `packages/react/src/components/ui` | Component source. **This is the registry**; files are copied verbatim into user projects |
| `packages/react/registry.json` | Registry manifest: descriptions and dependencies |
| `packages/cli/src` | The `denseui` CLI and MCP server |
| `apps/playground` | Docs site; `src/demos/<name>.tsx` is both the live demo and the example shipped to AI tools |
| `e2e` | Playwright tests with an axe accessibility audit for every component page |

## Adding or changing a component

1. Edit or create `packages/react/src/components/ui/<name>.tsx`.
2. Register new components in `packages/react/registry.json` (one-line description).
3. Add the category in `scripts/build-registry.mjs` and an icon in `apps/playground/src/docs.ts`.
4. Add a realistic demo at `apps/playground/src/demos/<name>.tsx`. Extra examples go in `demos/<name>.<example>.tsx`.
5. Check light and dark mode in the docs.

### Design rules

These are enforced in review (see [`packages/react/llm/guidelines.md`](packages/react/llm/guidelines.md) for the full list):

- Control heights are `h-5` / `h-6` / `h-7` (20/24/28px); control text is `text-sm` (12px).
- Padding is always `py < px`.
- Use semantic color tokens only (`bg-background`, `text-muted-foreground`, …), never raw palette colors.
- Elements with their own background hover with `hover:bg-surface-hover`; `hover:bg-accent` is for items without one.
- Function components with React 19 ref-as-prop, `data-slot` on every part, `className` merged last with `cn()`.

## Before opening a pull request

```bash
pnpm registry:build   # commit the regenerated registry/
pnpm typecheck
pnpm lint
pnpm test             # CLI unit tests
pnpm test:e2e         # runtime errors + accessibility for every page
```

CI runs the same checks and fails if `registry/` is out of date.

Keep pull requests focused, describe the change and include a screenshot for visual changes. Commit messages in the [Conventional Commits](https://www.conventionalcommits.org) style (`feat:`, `fix:`, `docs:`) are appreciated.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
