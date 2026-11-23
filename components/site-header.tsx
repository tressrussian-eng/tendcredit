import { Smartphone } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="flex items-center gap-2" aria-label="MotoCredit home">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Smartphone className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Moto<span className="text-primary-foreground bg-primary px-1 rounded">Credit</span>
          </span>
        </a>
        <p className="hidden text-sm text-muted-foreground sm:block">Get your phone today, pay monthly</p>
      </div>
    </header>
  )
}
