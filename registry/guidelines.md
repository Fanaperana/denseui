# denseui design guidelines

Rules for generating UI with denseui. Follow them exactly; they are what makes denseui look like denseui.

## Setup

- Components live in your project (copied by the CLI), imported from `@/components/ui/<name>`.
- Add components with `npx denseui@latest add <name...>`; never hand-write a component that exists in the registry.
- Class merging: `cn()` from `@/lib/utils`. Always pass user `className` last through `cn()`.
- Icons: `lucide-react`. Inside controls they size themselves (`size-3.5`); don't add sizes unless deviating.

## Density

- Default control height is **24px** (`h-6`). Use `size="sm"` (20px) in toolbars/tables and `size="lg"` (28px) for primary page actions only.
- Text: body `text-base` (13px), controls `text-sm` (12px), labels/meta `text-xs` (11px). Headings use `text-lg`/`text-xl`/`text-2xl` with `font-semibold tracking-tight`.
- Padding: vertical is always smaller than horizontal (`py < px`). Rows/items `px-2.5 py-1.5`; panels `px-4 py-3`; popovers `px-3 py-2`.
- Gaps: `gap-1`/`gap-1.5` between controls, `gap-2`/`gap-3` between form rows, `gap-6`/`gap-8` between page sections.
- Prefer one dense screen over many sparse ones: tables over cards for lists, inline editing over dialogs, popovers over pages.

## Color

Use semantic tokens only; never raw palette colors (`bg-zinc-100`, `text-gray-500`, hex values).

| Purpose | Classes |
| --- | --- |
| Page / text | `bg-background text-foreground` |
| Secondary text | `text-muted-foreground`; tertiary/placeholder `text-subtle-foreground` |
| Sidebars, wells, table headers | `bg-muted` |
| Cards / panels | `bg-card text-card-foreground border border-border` |
| Hover on items without their own background | `hover:bg-accent`, active `bg-accent-active` |
| Hover on elements that have a background | `hover:bg-surface-hover`; never `hover:bg-accent` (it is translucent) |
| Primary action | `<Button>` (near-black in light, near-white in dark) |
| Highlight / focus / links | `brand` (`text-brand`, `ring-ring`) |
| Danger | `destructive` variants |
| Labels / statuses | `<Badge color="green">` or `bg-tag-<color>-bg text-tag-<color>` (default, gray, brown, orange, yellow, green, blue, purple, pink, red) |

Dark mode is the `.dark` class on `<html>`; tokens switch automatically. Never write `dark:` overrides for colors that already use tokens.

## Component choice

| Need | Use |
| --- | --- |
| List of records with search/filter/sort/paging | `data-table` |
| Small static tabular data | `table` |
| Pick one of few (≤5) visible options | `toggle-group` or `radio-group` |
| Pick one of many | `select`; searchable → `combobox`; native forms → `native-select` |
| Global actions / navigation search | `command` (`CommandDialog` on ⌘K) |
| Row/item actions | `dropdown-menu` on a ghost `size="icon-sm"` button with `MoreHorizontalIcon` |
| Confirm destructive action | `alert-dialog` |
| Edit a record without leaving context | `sheet` (side) or `popover` (small) |
| Form layout | `field` (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`) |
| Status message | `toaster.success/error/info(...)` from `toast` (mount `<Toaster />` once) |
| App shell | `sidebar` (`SidebarProvider` → `Sidebar` + `SidebarInset`) |
| Empty list | `empty` |

## Buttons

- One `default` (primary) button per view region. Secondary actions: `outline`. Toolbar/inline actions: `ghost`. Quiet links: `subtle`.
- Icon-only buttons need `aria-label` and `size="icon" | "icon-sm"`.
- Use `asChild` to render a link: `<Button asChild><a href="…">…</a></Button>`.

### Action pairs (dialogs, sheets, drawers, cards, popovers)

- Footers are a right-aligned row (`DialogFooter`, `SheetFooter`, `DrawerFooter`, `AlertDialogFooter`, `CardFooter className="ml-auto grid w-fit auto-cols-fr grid-flow-col"`).
- Order: dismiss first, confirm last. `Cancel` is always `variant="outline"` and always labelled "Cancel".
- Confirm is `default`; if it destroys data it is `destructive` (`<AlertDialogAction variant="destructive">`). Never restyle with `bg-destructive` classes.
- A button that *opens* a destructive flow is `destructive-outline` and ends with … ("Delete page…"). Bulk delete in a toolbar is also `destructive-outline`.
- Both buttons in a pair use the same `size` and the same width; the overlay footers size every button to the widest label.

## Accessibility

- Every input has a `<Label htmlFor>` or `FieldLabel`; icon-only controls have `aria-label`.
- Don't remove focus rings. Don't put interactive elements inside other interactive elements.

## Don't

- Don't increase control heights or padding to "breathe"; density is the point.
- Don't use `shadow-lg`/`shadow-xl`; overlays already use `shadow-popover` / `shadow-dialog`.
- Don't use `rounded-xl`+ on controls; `rounded-sm` (4px) controls, `rounded-lg` (8px) panels.
- Don't nest cards in cards; use `Separator` or `Item` rows.
