'use client'

import { useState } from 'react'
import { PhoneCard } from '@/components/phone-card'
import { PhoneDetailsDialog } from '@/components/phone-details-dialog'
import { phones, type Phone } from '@/lib/phones'

const groups = [
  { brand: 'Apple', title: 'iPhone' },
  { brand: 'Samsung', title: 'Samsung Galaxy' },
] as const

export function PhoneCatalog() {
  const [selected, setSelected] = useState<Phone | null>(null)

  return (
    <>
      {groups.map(({ brand, title }) => (
        <section key={brand} aria-labelledby={`${brand}-heading`} className="flex flex-col gap-5">
          <h2 id={`${brand}-heading`} className="text-2xl font-bold tracking-tight">
            {title}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {phones
              .filter((phone) => phone.brand === brand)
              .map((phone) => (
                <PhoneCard key={phone.id} phone={phone} onGet={setSelected} />
              ))}
          </div>
        </section>
      ))}

      <PhoneDetailsDialog
        phone={selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      />
    </>
  )
}
