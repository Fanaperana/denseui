import { Pagination as ArkPagination } from '@ark-ui/react/pagination'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const pageButton = cn(
  buttonVariants({ variant: 'ghost', size: 'icon' }),
  'min-w-6 w-auto px-1.5 tabular-nums data-disabled:pointer-events-none data-disabled:opacity-40',
)

function Pagination({ className, ...props }: Omit<ArkPagination.RootProps, 'children'>) {
  return (
    <ArkPagination.Root
      data-slot="pagination"
      className={cn('flex items-center gap-0.5 text-sm', className)}
      {...props}
    >
      <ArkPagination.PrevTrigger aria-label="Previous page" className={pageButton}>
        <ChevronLeftIcon />
      </ArkPagination.PrevTrigger>
      <ArkPagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <ArkPagination.Item
                key={index}
                {...page}
                className={cn(
                  pageButton,
                  'data-selected:border data-selected:border-input data-selected:bg-background data-selected:font-semibold data-selected:hover:bg-surface-hover',
                )}
              >
                {page.value}
              </ArkPagination.Item>
            ) : (
              <ArkPagination.Ellipsis
                key={index}
                index={index}
                className="flex size-6 items-center justify-center text-muted-foreground"
              >
                <MoreHorizontalIcon className="size-3.5" />
              </ArkPagination.Ellipsis>
            ),
          )
        }
      </ArkPagination.Context>
      <ArkPagination.NextTrigger aria-label="Next page" className={pageButton}>
        <ChevronRightIcon />
      </ArkPagination.NextTrigger>
    </ArkPagination.Root>
  )
}

export { Pagination }
