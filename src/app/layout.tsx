import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '微领地青年公寓 - 上海优质青年公寓租赁',
  description: '微领地青年公寓提供上海优质青年公寓租赁服务，现代化设施，便利交通，舒适居住环境。专业服务，让您在上海找到理想的家。',
  keywords: '上海租房,上海公寓,上海青年公寓,微领地,shanghai rent,shanghai apartment,shanghai studio',
  authors: [{ name: '微领地青年公寓' }],
  openGraph: {
    title: '微领地青年公寓 - 上海优质青年公寓租赁',
    description: '微领地青年公寓提供上海优质青年公寓租赁服务，现代化设施，便利交通，舒适居住环境。',
    url: 'https://go.vlinker.com.cb',
    siteName: '微领地青年公寓',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
