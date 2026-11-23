'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Battery, Camera, Cpu, HardDrive, Loader2, MonitorSmartphone, Sparkles } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { formatPrice, loanTerms, monthlyPayment, type Phone } from '@/lib/phones'

const REDIRECT_URL = 'https://mtncredit.vercel.app/'

type PhoneDetailsDialogProps = {
  phone: Phone | null
  onOpenChange: (open: boolean) => void
}

export function PhoneDetailsDialog({ phone, onOpenChange }: PhoneDetailsDialogProps) {
  const [term, setTerm] = useState<number>(12)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current)
    }
  }, [])

  function handleOpenChange(open: boolean) {
    if (!open) {
      if (redirectTimer.current) clearTimeout(redirectTimer.current)
      setIsRedirecting(false)
    }
    onOpenChange(open)
  }

  function handleGet() {
    setIsRedirecting(true)
    redirectTimer.current = setTimeout(() => {
      if (window.self !== window.top) {
        window.open(REDIRECT_URL, '_blank', 'noopener,noreferrer')
        setIsRedirecting(false)
      } else {
        window.location.assign(REDIRECT_URL)
      }
    }, 2000)
  }

  const specs = phone
    ? [
        { icon: MonitorSmartphone, label: 'Display', value: phone.display },
        { icon: Cpu, label: 'Chip', value: phone.chip },
        { icon: HardDrive, label: 'Storage', value: phone.storage },
        { icon: Camera, label: 'Camera', value: phone.camera },
        { icon: Battery, label: 'Battery', value: phone.battery },
        { icon: Sparkles, label: 'Highlight', value: phone.highlight },
      ]
    : []

  return (
    <Dialog open={phone !== null} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {phone && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">
                {phone.brand} {phone.name}
              </DialogTitle>
              <DialogDescription>
                {phone.color} &middot; Cash price {formatPrice(phone.price)}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={phone.image || '/placeholder.svg'}
                  alt={`${phone.brand} ${phone.name} in ${phone.color}`}
                  fill
                  sizes="(min-width: 640px) 320px, 100vw"
                  className="object-cover"
                />
              </div>

              <dl className="flex flex-col gap-3">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="text-sm font-medium">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <fieldset className="rounded-lg border border-border p-4">
              <legend className="px-1 text-sm font-semibold">Choose your loan term</legend>
              <div className="grid grid-cols-3 gap-2">
                {loanTerms.map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setTerm(months)}
                    aria-pressed={term === months}
                    className={cn(
                      'rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      term === months
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:bg-muted',
                    )}
                  >
                    {months} months
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Monthly payment</span>
                <span className="text-2xl font-bold">
                  {formatPrice(monthlyPayment(phone.price, term))}
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </span>
              </div>
            </fieldset>

            {isRedirecting && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm"
              >
                <Loader2 className="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
                <span>Redirecting you to MTN Credit to complete your application...</span>
              </div>
            )}

            <DialogFooter showCloseButton>
              <button
                type="button"
                onClick={handleGet}
                disabled={isRedirecting}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
              >
                {isRedirecting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                {isRedirecting ? 'Redirecting...' : 'Get'}
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
