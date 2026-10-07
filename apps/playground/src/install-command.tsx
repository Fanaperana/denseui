import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from './code-block'

const managers = {
  pnpm: (args: string) => `pnpm dlx denseui@latest ${args}`,
  npm: (args: string) => `npx denseui@latest ${args}`,
  yarn: (args: string) => `yarn dlx denseui@latest ${args}`,
  bun: (args: string) => `bunx --bun denseui@latest ${args}`,
}

const installers = {
  pnpm: 'pnpm add',
  npm: 'npm install',
  yarn: 'yarn add',
  bun: 'bun add',
}

type Manager = keyof typeof managers

let preferred: Manager = 'pnpm'

function ManagerTabs({ render }: { render: (manager: Manager) => string }) {
  const [manager, setManager] = useState<Manager>(preferred)
  return (
    <Tabs
      value={manager}
      onValueChange={(e) => {
        preferred = e.value as Manager
        setManager(preferred)
      }}
      className="rounded-md border border-border bg-muted"
    >
      <TabsList className="px-1.5 pt-1">
        {(Object.keys(managers) as Manager[]).map((m) => (
          <TabsTrigger key={m} value={m} className="font-mono text-xs">
            {m}
          </TabsTrigger>
        ))}
      </TabsList>
      {(Object.keys(managers) as Manager[]).map((m) => (
        <TabsContent key={m} value={m} className="pt-0">
          <CodeBlock code={render(m)} className="rounded-none border-0" />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export function CliCommand({ args }: { args: string }) {
  return <ManagerTabs render={(m) => managers[m](args)} />
}

export function PackageInstall({ packages }: { packages: string[] }) {
  return <ManagerTabs render={(m) => `${installers[m]} ${packages.join(' ')}`} />
}
