'use client'

import React from 'react'
import Link from 'next/link'
import { Theme, AuthButton } from './components'

const HeaderModule = () => {
  return (
    <div className="flex items-center justify-between">
      <section className="flex items-center gap-4">
        <Link href="/" className="text-4xl font-semibold">
          Typing app
        </Link>
        <Link href="/settings">Sozlamalar</Link>
      </section>
      <section className="flex items-center gap-3">
        <Theme />
        <AuthButton />
      </section>
    </div>
  )
}

export default HeaderModule
