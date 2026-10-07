import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function AspectRatioDemo() {
  return (
    <div className="w-80">
      <AspectRatio
        ratio={16 / 9}
        className="flex items-center justify-center rounded-lg bg-gradient-to-br from-tag-purple-bg to-tag-blue-bg text-sm text-muted-foreground"
      >
        16 / 9
      </AspectRatio>
    </div>
  )
}
