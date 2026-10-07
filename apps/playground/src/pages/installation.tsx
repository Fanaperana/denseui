import type { ReactNode } from 'react'
import { CodeBlock } from '../code-block'
import { CliCommand, PackageInstall } from '../install-command'

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="relative flex flex-col gap-2 pl-8">
      <span className="absolute top-0 left-0 flex size-5 items-center justify-center rounded-full border border-border bg-muted text-xs font-medium">
        {n}
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </li>
  )
}

export function InstallationPage() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Installation</h1>
        <p className="text-lg text-muted-foreground">Set up DenseUI in a React project with Tailwind CSS v4.</p>
      </header>
      <ol className="flex flex-col gap-8">
        <Step n={1} title="Install Tailwind CSS v4">
          <p className="text-muted-foreground">Skip this if your project already uses Tailwind CSS v4.</p>
          <PackageInstall packages={['tailwindcss', '@tailwindcss/vite']} />
        </Step>
        <Step n={2} title="Configure the @ path alias">
          <p className="text-muted-foreground">
            Components import from <code className="font-mono text-sm">@/components</code> and{' '}
            <code className="font-mono text-sm">@/lib</code>.
          </p>
          <CodeBlock code={`// tsconfig.json\n{\n  "compilerOptions": {\n    "paths": { "@/*": ["./src/*"] }\n  }\n}`} />
        </Step>
        <Step n={3} title="Run init">
          <p className="text-muted-foreground">
            Writes <code className="font-mono text-sm">denseui.css</code> (tokens), imports it in your global CSS,
            creates <code className="font-mono text-sm">components.json</code> and adds the{' '}
            <code className="font-mono text-sm">cn()</code> helper.
          </p>
          <CliCommand args="init" />
        </Step>
        <Step n={4} title="Add components">
          <CliCommand args="add button dropdown-menu dialog" />
          <CodeBlock
            code={`import { Button } from "@/components/ui/button"\n\nexport default function App() {\n  return <Button>Click me</Button>\n}`}
          />
        </Step>
        <Step n={5} title="Load Inter (recommended)">
          <p className="text-muted-foreground">
            The tokens are tuned for Inter, whose balanced metrics keep text optically centered in 24px controls.
            Without it, a metric-matched Arial fallback is used.
          </p>
          <PackageInstall packages={['@fontsource-variable/inter']} />
          <CodeBlock code={`// main.tsx\nimport "@fontsource-variable/inter"`} />
        </Step>
      </ol>
    </article>
  )
}
