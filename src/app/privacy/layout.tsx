import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Vlinker Youth Community',
  description: 'Privacy Policy of Vlinker Youth Community, explaining how we collect, use, and share your personal information.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy - Vlinker Youth Community',
    description: 'Privacy Policy of Vlinker Youth Community, explaining how we collect, use, and share your personal information.',
    url: 'https://go.vlinker.com.cn/privacy',
    siteName: 'Vlinker Youth Community',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://go.vlinker.com.cn/privacy',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
