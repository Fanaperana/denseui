import { TagsInput } from '@/components/ui/tags-input'

export default function TagsInputDemo() {
  return (
    <div className="flex w-80 flex-col gap-3">
      <TagsInput defaultValue={['design', 'frontend', 'v2']} placeholder="Add tag…" />
      <TagsInput defaultValue={['react', 'tailwind']} colorful={false} max={5} placeholder="Up to 5…" />
    </div>
  )
}
