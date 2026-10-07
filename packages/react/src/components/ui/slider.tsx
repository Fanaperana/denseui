import { Slider as ArkSlider } from '@ark-ui/react/slider'
import { cn } from '@/lib/utils'

function Slider({ className, ...props }: ArkSlider.RootProps) {
  return (
    <ArkSlider.Root
      data-slot="slider"
      className={cn('flex w-full touch-none flex-col gap-1 select-none data-disabled:opacity-50', className)}
      {...props}
    >
      <ArkSlider.Control className="relative flex h-4 items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-4 data-[orientation=vertical]:flex-col">
        <ArkSlider.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-accent-active data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1">
          <ArkSlider.Range className="absolute h-full bg-primary data-[orientation=vertical]:w-full" />
        </ArkSlider.Track>
        <ArkSlider.Context>
          {(api) =>
            api.value.map((_, index) => (
              <ArkSlider.Thumb
                key={index}
                index={index}
                className="block size-3 rounded-full border border-input bg-background shadow-sm outline-none transition-shadow hover:ring-3 hover:ring-ring focus-visible:ring-3 focus-visible:ring-ring data-dragging:ring-3 data-dragging:ring-ring"
              >
                <ArkSlider.HiddenInput />
              </ArkSlider.Thumb>
            ))
          }
        </ArkSlider.Context>
      </ArkSlider.Control>
    </ArkSlider.Root>
  )
}

export { Slider }
