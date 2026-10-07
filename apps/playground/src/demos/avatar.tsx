import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="size-7">
        <AvatarFallback className="text-xs">AB</AvatarFallback>
      </Avatar>
      <div className="flex -space-x-1">
        {['AL', 'BO', 'CY'].map((initials) => (
          <Avatar key={initials} className="ring-2 ring-background">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  )
}
