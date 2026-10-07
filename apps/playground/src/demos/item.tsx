import { BadgeCheckIcon, ChevronRightIcon, FileTextIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'

export default function ItemDemo() {
  return (
    <ItemGroup className="w-96 gap-2">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic item</ItemTitle>
          <ItemDescription>A simple item with title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="sm" asChild>
        <a href="#">
          <ItemMedia>
            <BadgeCheckIcon className="size-4 text-success" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-3.5 text-muted-foreground" />
          </ItemActions>
        </a>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Quarterly report.pdf</ItemTitle>
          <ItemDescription>2.4 MB · Edited 3 days ago</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}
