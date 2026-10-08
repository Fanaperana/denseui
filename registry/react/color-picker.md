# Color Picker

Color input with saturation area, hue/alpha sliders, eyedropper and presets

## Install

```bash
npx denseui@latest add color-picker
```

npm dependencies: `@ark-ui/react`, `lucide-react`

## Usage

```tsx
import { ColorPicker, parseColor } from "@/components/ui/color-picker"
```

## Example

```tsx
import { ColorPicker, parseColor } from '@/components/ui/color-picker'
import { Label } from '@/components/ui/label'

export default function ColorPickerDemo() {
  return (
    <div className="flex w-56 flex-col gap-3">
      <div className="grid gap-1">
        <Label>Brand color</Label>
        <ColorPicker />
      </div>
      <div className="grid gap-1">
        <Label>Highlight (no alpha)</Label>
        <ColorPicker defaultValue={parseColor('#1f7a4f')} showAlpha={false} />
      </div>
    </div>
  )
}
```

## Source: components/ui/color-picker.tsx

```tsx
import { ColorPicker as ArkColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { Portal } from '@ark-ui/react/portal'
import { PipetteIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const defaultPresets = ['#111113', '#5b5bd6', '#1e63c4', '#1f7a4f', '#946200', '#c2410c', '#c4262c', '#b8306f', '#6e46c0', '#8a5a3c']

const thumb = 'size-3 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.3)] outline-none'

type ColorPickerProps = Omit<ArkColorPicker.RootProps, 'children'> & {
  presets?: string[]
  showAlpha?: boolean
}

function ColorPicker({
  className,
  presets = defaultPresets,
  showAlpha = true,
  defaultValue = parseColor('#5b5bd6'),
  ...props
}: ColorPickerProps) {
  return (
    <ArkColorPicker.Root
      data-slot="color-picker"
      defaultValue={defaultValue}
      lazyMount
      unmountOnExit
      className={cn('w-full', className)}
      {...props}
    >
      <ArkColorPicker.Control className="flex h-6 w-full items-center rounded-sm border border-input bg-input-background transition-[border-color,box-shadow] duration-75 focus-within:border-brand/60 focus-within:ring-2 focus-within:ring-ring">
        <ArkColorPicker.Trigger
          aria-label="Open color picker"
          className="ml-[3px] flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-xs outline-none"
        >
          <ArkColorPicker.TransparencyGrid size="6px" className="rounded-xs" />
          <ArkColorPicker.ValueSwatch className="relative size-full rounded-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
        </ArkColorPicker.Trigger>
        <ArkColorPicker.ChannelInput
          channel="hex"
          aria-label="Hex color"
          className="h-full w-full min-w-0 bg-transparent px-2 font-mono text-xs uppercase outline-none"
        />
      </ArkColorPicker.Control>
      <Portal>
        <ArkColorPicker.Positioner>
          <ArkColorPicker.Content className="z-50 flex w-56 origin-(--transform-origin) flex-col gap-2 rounded-lg bg-popover px-3 py-3 shadow-popover outline-none data-[state=closed]:animate-out data-[state=open]:animate-in">
            <ArkColorPicker.Area className="h-32 w-full overflow-hidden rounded-md">
              <ArkColorPicker.AreaBackground className="size-full" />
              <ArkColorPicker.AreaThumb className={thumb} />
            </ArkColorPicker.Area>
            <div className="flex items-center gap-2">
              <ArkColorPicker.EyeDropperTrigger
                aria-label="Pick a color from the screen"
                className="flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <PipetteIcon className="size-3.5" />
              </ArkColorPicker.EyeDropperTrigger>
              <div className="flex flex-1 flex-col gap-1.5">
                <ArkColorPicker.ChannelSlider channel="hue" className="relative">
                  <ArkColorPicker.ChannelSliderTrack className="h-2.5 rounded-full" />
                  <ArkColorPicker.ChannelSliderThumb className={cn(thumb, '-translate-y-1/2 top-1/2')} />
                </ArkColorPicker.ChannelSlider>
                {showAlpha && (
                  <ArkColorPicker.ChannelSlider channel="alpha" className="relative">
                    <ArkColorPicker.TransparencyGrid size="6px" className="rounded-full" />
                    <ArkColorPicker.ChannelSliderTrack className="h-2.5 rounded-full" />
                    <ArkColorPicker.ChannelSliderThumb className={cn(thumb, '-translate-y-1/2 top-1/2')} />
                  </ArkColorPicker.ChannelSlider>
                )}
              </div>
            </div>
            {presets.length > 0 && (
              <ArkColorPicker.SwatchGroup className="grid grid-cols-10 gap-1">
                {presets.map((color) => (
                  <ArkColorPicker.SwatchTrigger
                    key={color}
                    value={color}
                    aria-label={color}
                    className="rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ArkColorPicker.Swatch
                      value={color}
                      className="aspect-square w-full rounded-xs shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]"
                    />
                  </ArkColorPicker.SwatchTrigger>
                ))}
              </ArkColorPicker.SwatchGroup>
            )}
          </ArkColorPicker.Content>
        </ArkColorPicker.Positioner>
      </Portal>
      <ArkColorPicker.HiddenInput aria-hidden tabIndex={-1} />
    </ArkColorPicker.Root>
  )
}

export { ColorPicker, parseColor, type ColorPickerProps }
```
