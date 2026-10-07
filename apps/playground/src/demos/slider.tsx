import { Slider } from '@/components/ui/slider'

export default function SliderDemo() {
  return (
    <div className="flex w-72 flex-col gap-5">
      <Slider defaultValue={[40]} aria-label={['Volume']} />
      <Slider defaultValue={[20, 70]} aria-label={['Min price', 'Max price']} />
      <Slider defaultValue={[60]} disabled aria-label={['Disabled']} />
    </div>
  )
}
