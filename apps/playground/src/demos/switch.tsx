import { Switch } from '@/components/ui/switch'

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-1.5">
      <Switch defaultChecked>Full width</Switch>
      <Switch>Small text</Switch>
      <Switch disabled>Lock page</Switch>
    </div>
  )
}
