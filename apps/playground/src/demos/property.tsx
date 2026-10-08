import { CalendarIcon, CircleDotIcon, LinkIcon, TagIcon, UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Editable } from '@/components/ui/editable'
import { Property, PropertyEmpty, PropertyList } from '@/components/ui/property'

export default function PropertyDemo() {
  return (
    <PropertyList className="w-[420px]">
      <Property icon={<CircleDotIcon />} label="Status">
        <Badge color="blue">In progress</Badge>
      </Property>
      <Property icon={<UserIcon />} label="Assignee">
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        Jane Doe
      </Property>
      <Property icon={<CalendarIcon />} label="Due date">
        October 24, 2026
      </Property>
      <Property icon={<TagIcon />} label="Tags">
        <Badge color="purple">design</Badge>
        <Badge color="green">v2</Badge>
      </Property>
      <Property icon={<LinkIcon />} label="URL">
        <Editable placeholder="Empty" />
      </Property>
      <Property icon={<CalendarIcon />} label="Completed">
        <PropertyEmpty />
      </Property>
    </PropertyList>
  )
}
