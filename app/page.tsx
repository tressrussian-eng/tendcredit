import { SiteHeader } from '@/components/site-header'
import { PhoneCatalog } from '@/components/phone-catalog'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            {/* <h1 className="max-w-2xl text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Your next phone, on easy monthly payments.
            </h1> */}
            <p className="mt-4 max-w-xl text-pretty text-lg opacity-80">
              Choose from the latest iPhone and Samsung Galaxy models and spread the cost over 6, 12, or 18 months.
            </p>
          </div>
        </section>
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12">
          <PhoneCatalog />
        </div>
      </main>
      <footer className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MotoCredit. Monthly amounts are estimates.
        </p>
      </footer>
    </>
  )
}
