# Rating

Star rating input

## Install

```bash
npx denseui@latest add rating
```

npm dependencies: `@ark-ui/react`, `lucide-react`

## Usage

```tsx
import { Rating } from "@/components/ui/rating"
```

## Example

```tsx
import { Label } from '@/components/ui/label'
import { Rating } from '@/components/ui/rating'

export default function RatingDemo() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Label className="w-16">Quality</Label>
        <Rating defaultValue={4} />
      </div>
      <div className="flex items-center gap-3">
        <Label className="w-16">Speed</Label>
        <Rating defaultValue={2} />
      </div>
      <div className="flex items-center gap-3">
        <Label className="w-16">Read-only</Label>
        <Rating defaultValue={3} readOnly />
      </div>
    </div>
  )
}
```

## Source: components/ui/rating.tsx

```tsx
import { RatingGroup } from '@ark-ui/react/rating-group'
import { StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Rating({ className, count = 5, ...props }: RatingGroup.RootProps) {
  return (
    <RatingGroup.Root data-slot="rating" count={count} className={cn('inline-flex', className)} {...props}>
      <RatingGroup.Control className="flex items-center gap-0.5">
        <RatingGroup.Context>
          {({ items }) =>
            items.map((item) => (
              <RatingGroup.Item
                key={item}
                index={item}
                className="rounded-xs text-subtle-foreground/60 outline-none transition-colors duration-75 data-disabled:opacity-50 data-focus-visible:ring-2 data-focus-visible:ring-ring data-highlighted:text-warning data-highlighted:[&_svg]:fill-current"
              >
                <StarIcon className="size-3.5" />
              </RatingGroup.Item>
            ))
          }
        </RatingGroup.Context>
      </RatingGroup.Control>
      <RatingGroup.HiddenInput />
    </RatingGroup.Root>
  )
}

export { Rating }
```
