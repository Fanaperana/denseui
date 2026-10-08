import * as React from 'react'
import { TreeView as ArkTreeView, createTreeCollection } from '@ark-ui/react/tree-view'
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type TreeViewItem = {
  id: string
  name: string
  icon?: React.ReactNode
  children?: TreeViewItem[]
}

type TreeViewProps = Omit<ArkTreeView.RootProps<TreeViewItem>, 'collection' | 'children'> & {
  items: TreeViewItem[]
  /** Hover actions rendered at the end of each row, e.g. "+" and "…" buttons. */
  renderActions?: (item: TreeViewItem) => React.ReactNode
}

const rowClass =
  'group/tree-row relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.5 pr-2.5 ps-[calc((var(--depth)-1)*14px+10px)] text-left text-sm text-muted-foreground outline-none select-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-selected:bg-accent-active data-selected:font-medium data-selected:text-foreground'

function TreeNode({
  node,
  indexPath,
  renderActions,
}: {
  node: TreeViewItem
  indexPath: number[]
  renderActions?: TreeViewProps['renderActions']
}) {
  const actions = renderActions?.(node)
  // Tree items can't contain interactive children, so actions are pointer affordances; offer keyboard
  // equivalents (e.g. a context menu) for the same operations.
  const actionSlot = actions ? (
    <span
      aria-hidden
      className="ml-auto flex items-center gap-0.5 opacity-0 group-hover/tree-row:opacity-100 group-focus-within/tree-row:opacity-100"
    >
      {actions}
    </span>
  ) : null

  return (
    <ArkTreeView.NodeProvider node={node} indexPath={indexPath}>
      {node.children ? (
        <ArkTreeView.Branch data-slot="tree-view-branch">
          <ArkTreeView.BranchControl className={rowClass}>
            <ArkTreeView.BranchIndicator className="flex size-3.5 shrink-0 items-center justify-center text-subtle-foreground transition-transform duration-100 data-[state=open]:rotate-90">
              <ChevronRightIcon className="size-3" />
            </ArkTreeView.BranchIndicator>
            {node.icon && <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5">{node.icon}</span>}
            <ArkTreeView.BranchText className="truncate">{node.name}</ArkTreeView.BranchText>
            {actionSlot}
          </ArkTreeView.BranchControl>
          <ArkTreeView.BranchContent className="relative">
            <ArkTreeView.BranchIndentGuide className="absolute inset-y-0 start-[calc((var(--depth)-1)*14px+16px)] w-px bg-border" />
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} renderActions={renderActions} />
            ))}
            {node.children.length === 0 && (
              <div className="py-1.5 ps-[calc(var(--depth)*14px+24px)] text-xs text-subtle-foreground">No pages inside</div>
            )}
          </ArkTreeView.BranchContent>
        </ArkTreeView.Branch>
      ) : (
        <ArkTreeView.Item data-slot="tree-view-item" className={rowClass}>
          <span className="size-3.5 shrink-0" />
          {node.icon && <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5">{node.icon}</span>}
          <ArkTreeView.ItemText className="truncate">{node.name}</ArkTreeView.ItemText>
          {actionSlot}
        </ArkTreeView.Item>
      )}
    </ArkTreeView.NodeProvider>
  )
}

function TreeView({ items, renderActions, className, ...props }: TreeViewProps) {
  const collection = React.useMemo(
    () =>
      createTreeCollection<TreeViewItem>({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.name,
        rootNode: { id: 'ROOT', name: '', children: items },
      }),
    [items],
  )

  return (
    <ArkTreeView.Root data-slot="tree-view" collection={collection} className={cn('w-full', className)} {...props}>
      <ArkTreeView.Tree className="flex flex-col gap-px">
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} renderActions={renderActions} />
        ))}
      </ArkTreeView.Tree>
    </ArkTreeView.Root>
  )
}

export { TreeView, type TreeViewItem, type TreeViewProps }
