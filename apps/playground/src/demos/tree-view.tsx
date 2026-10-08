import { FileTextIcon, MoreHorizontalIcon, PlusIcon } from 'lucide-react'
import { TreeView, type TreeViewItem } from '@/components/ui/tree-view'

const pages: TreeViewItem[] = [
  {
    id: 'eng',
    name: 'Engineering',
    icon: '🛠️',
    children: [
      { id: 'roadmap', name: 'Roadmap', icon: <FileTextIcon /> },
      {
        id: 'rfcs',
        name: 'RFCs',
        icon: '📐',
        children: [
          { id: 'rfc-1', name: 'RFC-001 Tokens', icon: <FileTextIcon /> },
          { id: 'rfc-2', name: 'RFC-002 Registry', icon: <FileTextIcon /> },
        ],
      },
      { id: 'oncall', name: 'On-call', icon: <FileTextIcon /> },
    ],
  },
  { id: 'design', name: 'Design', icon: '🎨', children: [{ id: 'tokens', name: 'Tokens', icon: <FileTextIcon /> }] },
  { id: 'marketing', name: 'Marketing', icon: '📣', children: [] },
  { id: 'notes', name: 'Meeting notes', icon: <FileTextIcon /> },
]

const action =
  'flex size-5 items-center justify-center rounded-sm text-subtle-foreground hover:bg-accent-active hover:text-foreground'

export default function TreeViewDemo() {
  return (
    <div className="w-64 rounded-lg border border-border bg-muted px-1.5 py-1.5">
      <TreeView
        items={pages}
        defaultExpandedValue={['eng', 'rfcs']}
        defaultSelectedValue={['rfc-2']}
        renderActions={(item) => (
          <>
            <span className={action}>
              <MoreHorizontalIcon className="size-3.5" />
            </span>
            {item.children && (
              <span className={action}>
                <PlusIcon className="size-3.5" />
              </span>
            )}
          </>
        )}
      />
    </div>
  )
}
