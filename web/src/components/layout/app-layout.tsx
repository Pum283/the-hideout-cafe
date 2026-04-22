import type { ReactNode } from 'react'
import { BrandHeader } from './brand-header'
import { LanguageSwitch } from './language-switch'
import { TopNav } from './top-nav'

type Props = {
  children: ReactNode
}

export function AppLayout({ children }: Props) {
  return (
    <div className="min-h-dvh">
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-8 md:px-8 md:pb-20 md:pt-10">
        <div className="flex items-start justify-end">
          <LanguageSwitch />
        </div>
        <BrandHeader />
        <TopNav />
        <main className="mt-8">{children}</main>
      </div>
    </div>
  )
}

