import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

export default function ProgressDemo() {
  const [value, setValue] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex w-72 flex-col gap-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Uploading…</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  )
}
