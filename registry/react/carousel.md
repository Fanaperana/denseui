# Carousel

Swipeable slides with controls and indicators

## Install

```bash
npx denseui@latest add carousel
```

npm dependencies: `@ark-ui/react`, `lucide-react`

Also installs: `button`

## Usage

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators } from "@/components/ui/carousel"
```

## Example

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const slides = ['bg-tag-blue-bg', 'bg-tag-purple-bg', 'bg-tag-green-bg', 'bg-tag-orange-bg', 'bg-tag-pink-bg']

export default function CarouselDemo() {
  return (
    <Carousel slideCount={slides.length} className="w-80">
      <CarouselContent>
        {slides.map((bg, index) => (
          <CarouselItem key={bg} index={index}>
            <div className={`flex aspect-video items-center justify-center rounded-lg text-3xl font-semibold ${bg}`}>
              {index + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  )
}
```

## Source: components/ui/carousel.tsx

```tsx
import { Carousel as ArkCarousel } from '@ark-ui/react/carousel'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Carousel({ className, ...props }: ArkCarousel.RootProps) {
  return <ArkCarousel.Root data-slot="carousel" className={cn('relative', className)} {...props} />
}

function CarouselContent({ className, ...props }: ArkCarousel.ItemGroupProps) {
  return (
    <ArkCarousel.ItemGroup data-slot="carousel-content" className={cn('rounded-lg', className)} {...props} />
  )
}

function CarouselItem({ className, ...props }: ArkCarousel.ItemProps) {
  return <ArkCarousel.Item data-slot="carousel-item" className={cn('min-w-0', className)} {...props} />
}

const navClass = cn(
  buttonVariants({ variant: 'outline', size: 'icon' }),
  'absolute top-1/2 -translate-y-1/2 rounded-full bg-popover shadow-sm disabled:opacity-0',
)

function CarouselPrevious({ className, ...props }: ArkCarousel.PrevTriggerProps) {
  return (
    <ArkCarousel.PrevTrigger
      data-slot="carousel-previous"
      aria-label="Previous slide"
      className={cn(navClass, 'left-2', className)}
      {...props}
    >
      <ChevronLeftIcon />
    </ArkCarousel.PrevTrigger>
  )
}

function CarouselNext({ className, ...props }: ArkCarousel.NextTriggerProps) {
  return (
    <ArkCarousel.NextTrigger
      data-slot="carousel-next"
      aria-label="Next slide"
      className={cn(navClass, 'right-2', className)}
      {...props}
    >
      <ChevronRightIcon />
    </ArkCarousel.NextTrigger>
  )
}

function CarouselIndicators({ className, ...props }: ArkCarousel.IndicatorGroupProps) {
  return (
    <ArkCarousel.IndicatorGroup
      data-slot="carousel-indicators"
      className={cn('mt-2 flex justify-center gap-1', className)}
      {...props}
    >
      <ArkCarousel.Context>
        {(api) =>
          api.pageSnapPoints.map((_, index) => (
            <ArkCarousel.Indicator
              key={index}
              index={index}
              className="h-1.5 w-1.5 rounded-full bg-foreground/20 transition-all data-current:w-3 data-current:bg-foreground"
            />
          ))
        }
      </ArkCarousel.Context>
    </ArkCarousel.IndicatorGroup>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators }
```
