import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const components = [
  { title: 'Alert Dialog', description: 'A modal that interrupts the user.' },
  { title: 'Hover Card', description: 'Preview content behind a link.' },
  { title: 'Progress', description: 'Completion progress of a task.' },
  { title: 'Tabs', description: 'Layered sections of content.' },
]

export default function NavigationMenuDemo() {
  return (
    <div className="h-56">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="getting-started">
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent className="w-72">
              <NavigationMenuLink href="#">
                <span className="font-medium">Introduction</span>
                <span className="text-muted-foreground">Re-usable components built with Ark UI.</span>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <span className="font-medium">Installation</span>
                <span className="text-muted-foreground">Install the CLI and add components.</span>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="components">
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent className="grid w-96 grid-cols-2">
              {components.map((c) => (
                <NavigationMenuLink key={c.title} href="#">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-muted-foreground">{c.description}</span>
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="docs">
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle}>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
