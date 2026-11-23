import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { formatPrice, monthlyPayment, type Phone } from '@/lib/phones'

type PhoneCardProps = {
  phone: Phone
  onGet: (phone: Phone) => void
}

export function PhoneCard({ phone, onGet }: PhoneCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-square bg-muted">
        <Image
          src={phone.image || '/placeholder.svg'}
          alt={`${phone.brand} ${phone.name} in ${phone.color}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium">
          {phone.brand}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-semibold leading-tight">{phone.name}</h3>
          <p className="text-sm text-muted-foreground">{phone.color}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-lg font-bold">
              {formatPrice(monthlyPayment(phone.price, 12))}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </p>
          </div>
          <Button onClick={() => onGet(phone)} className="font-semibold">
            Get
          </Button>
        </div>
      </div>
    </article>
  )
}
