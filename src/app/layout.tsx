import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { LanguageProvider } from '@/contexts/LanguageProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vlinker Youth Community - Premium Student Housing in Shanghai',
  description: 'Vlinker Youth Community offers premium student housing services in Shanghai with modern facilities, convenient transportation, and comfortable living environment. Professional service to help you find your ideal home in Shanghai.',
  keywords: 'shanghai student housing,shanghai apartment,shanghai youth community,vlinker,shanghai rent,shanghai studio,student accommodation',
  authors: [{ name: 'Vlinker Youth Community' }],
  openGraph: {
    title: 'Vlinker Youth Community - Premium Student Housing in Shanghai',
    description: 'Vlinker Youth Community offers premium student housing services in Shanghai with modern facilities, convenient transportation, and comfortable living environment.',
    url: 'https://go.vlinker.com.cn',
    siteName: 'Vlinker Youth Community',
    locale: 'en_US',
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
  other: {
    // 优化CSS预加载配置
    'preload-css': 'true',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* 预加载 HarmonyOS 字体 - 优化预加载策略 */}
        <link
          rel="preload"
          href="/fonts/HarmonyOS_Sans_SC_Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HarmonyOS_Sans_SC_Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/HarmonyOS_Sans_SC_Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* 确保字体立即被使用 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body { font-family: 'HarmonyOS Sans SC', system-ui, sans-serif; }
          `
        }} />
      </head>
      <body className={`${inter.className} font-harmony`}>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 pt-[70px]">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
