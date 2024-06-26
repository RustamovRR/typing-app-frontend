import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { FooterModule, HeaderModule } from '@/modules/layout'
import { ThemeProvider } from '@/providers'
import { Toaster } from '@/components/ui'
import { cn } from '@/utils'
import { TanstackQueryProvider } from '@/providers'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="container flex h-screen flex-col justify-between px-20 py-8">
            <TanstackQueryProvider>
              <header className="sticky top-0 z-10">
                <HeaderModule />
              </header>
              <main className="flex h-full flex-1 items-center justify-center">{children}</main>
              <Toaster />
              <footer>
                <FooterModule />
              </footer>
            </TanstackQueryProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
