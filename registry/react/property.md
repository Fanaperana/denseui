# Property

Label/value property rows for record details

## Install

```bash
npx denseui@latest add property
```

## Usage

```tsx
import { PropertyList, Property, PropertyEmpty } from "@/components/ui/property"
```

## Example

```tsx
import { CalendarIcon, CircleDotIcon, LinkIcon, TagIcon, UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Editable } from '@/components/ui/editable'
import { Property, PropertyEmpty, PropertyList } from '@/components/ui/property'

export default function PropertyDemo() {
  return (
    <PropertyList className="w-[420px]">
      <Property icon={<CircleDotIcon />} label="Status">
        <Badge color="blue">In progress</Badge>
      </Property>
      <Property icon={<UserIcon />} label="Assignee">
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        Jane Doe
      </Property>
      <Property icon={<CalendarIcon />} label="Due date">
        October 24, 2026
      </Property>
      <Property icon={<TagIcon />} label="Tags">
        <Badge color="purple">design</Badge>
        <Badge color="green">v2</Badge>
      </Property>
      <Property icon={<LinkIcon />} label="URL">
        <Editable placeholder="Empty" />
      </Property>
      <Property icon={<CalendarIcon />} label="Completed">
        <PropertyEmpty />
      </Property>
    </PropertyList>
  )
}
```

## Source: components/ui/property.tsx

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

function PropertyList({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="property-list" className={cn('flex w-full flex-col', className)} {...props} />
}

type PropertyProps = React.ComponentProps<'div'> & {
  label: React.ReactNode
  icon?: React.ReactNode
}

function Property({ label, icon, className, children, ...props }: PropertyProps) {
  return (
    <div data-slot="property" className={cn('flex min-h-7 items-start', className)} {...props}>
      <div
        data-slot="property-label"
        className="flex w-36 shrink-0 items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm text-muted-foreground [&_svg]:size-3.5 [&_svg]:shrink-0"
      >
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div
        data-slot="property-value"
        className="flex min-h-7 min-w-0 flex-1 flex-wrap items-center gap-1 rounded-sm px-2 py-1 text-sm transition-colors duration-75 hover:bg-accent has-[[data-slot=editable]]:p-0.5"
      >
        {children}
      </div>
    </div>
  )
}

function PropertyEmpty({ className, children = 'Empty', ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="property-empty" className={cn('text-subtle-foreground', className)} {...props}>{children}</span>
}

export { PropertyList, Property, PropertyEmpty, type PropertyProps }
```
