import { Avatar as ArkAvatar } from '@ark-ui/react/avatar'
import { cn } from '@/lib/utils'

function Avatar({ className, ...props }: ArkAvatar.RootProps) {
  return (
    <ArkAvatar.Root
      data-slot="avatar"
      className={cn('relative inline-flex size-5 shrink-0 overflow-hidden rounded-full select-none', className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: ArkAvatar.ImageProps) {
  return <ArkAvatar.Image data-slot="avatar-image" className={cn('size-full object-cover', className)} {...props} />
}

function AvatarFallback({ className, ...props }: ArkAvatar.FallbackProps) {
  return (
    <ArkAvatar.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center bg-tag-gray-bg text-[10px] font-medium text-tag-gray uppercase',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
