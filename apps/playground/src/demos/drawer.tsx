import { useState } from 'react'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

export default function DrawerDemo() {
  const [goal, setGoal] = useState(350)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xs">
          <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center justify-center gap-4 p-3">
            <Button variant="outline" size="icon" aria-label="Decrease" onClick={() => setGoal(goal - 10)}>
              <MinusIcon />
            </Button>
            <div className="text-center">
              <div className="text-5xl font-bold tracking-tighter tabular-nums">{goal}</div>
              <div className="text-xs text-muted-foreground uppercase">calories/day</div>
            </div>
            <Button variant="outline" size="icon" aria-label="Increase" onClick={() => setGoal(goal + 10)}>
              <PlusIcon />
            </Button>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
