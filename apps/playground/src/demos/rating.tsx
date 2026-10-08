import { Label } from '@/components/ui/label'
import { Rating } from '@/components/ui/rating'

export default function RatingDemo() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Label className="w-16">Quality</Label>
        <Rating defaultValue={4} />
      </div>
      <div className="flex items-center gap-3">
        <Label className="w-16">Speed</Label>
        <Rating defaultValue={2} />
      </div>
      <div className="flex items-center gap-3">
        <Label className="w-16">Read-only</Label>
        <Rating defaultValue={3} readOnly />
      </div>
    </div>
  )
}
