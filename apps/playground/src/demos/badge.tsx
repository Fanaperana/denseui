import { Badge } from '@/components/ui/badge'

const colors = ['default', 'gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'] as const

export default function BadgeDemo() {
  return (
    <div className="flex max-w-md flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-1">
        {colors.map((color) => (
          <Badge key={color} color={color}>
            {color}
          </Badge>
        ))}
      </div>
      <div className="flex gap-1">
        <Badge variant="outline">Outline</Badge>
        <Badge variant="solid">New</Badge>
      </div>
    </div>
  )
}
