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
