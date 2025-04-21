import { Montserrat } from 'next/font/google'
import { Providers } from './providers'
import type { Metadata } from 'next'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Visão Automotiva',
  description:
    'Explore e analise preços de carros, motos e caminhões com dados atualizados da Tabela FIPE.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${montserrat.variable} antialiased`}>
        <Providers
          ipInfoToken={process.env.IPINFO_TOKEN!}
          appToken={process.env.APP_TOKEN!}
          appName={process.env.APP_NAME!}
          appApiUrl={process.env.APP_API_URL!}
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}
