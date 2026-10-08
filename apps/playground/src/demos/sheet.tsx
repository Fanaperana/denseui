import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const sides = ['left', 'right', 'top', 'bottom'] as const

export default function SheetDemo() {
  return (
    <div className="flex gap-2">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-1">
              <Label htmlFor={`sheet-name-${side}`}>Name</Label>
              <Input id={`sheet-name-${side}`} defaultValue="Jane Doe" />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button>Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
