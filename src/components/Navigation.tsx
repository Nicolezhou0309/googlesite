'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageProvider'
import { getLogoImageUrl } from '@/lib/imageConfig'
import { createScrollListener } from '@/lib/scrollUtils'
import { useTranslations } from '@/lib/translations'

// 图片资源常量
const logo = getLogoImageUrl("logo.svg");

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = useTranslations(language)
  const pathname = usePathname()

  // 监听滚动事件，添加背景变化效果 - 使用优化的滚动监听器
  useEffect(() => {
    const removeScrollListener = createScrollListener(
      (scrollY) => {
        setIsScrolled(scrollY > 10)
      },
      { throttle: 16, passive: true }
    )
    
    return removeScrollListener
  }, [])

  // 判断当前路径是否匹配
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <nav className={`fixed h-[70px] left-0 right-0 top-0 z-50 transition-all duration-200 ease-in-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-sm border-b border-gray-100'
    }`}
         style={{ 
           transform: 'translateZ(0)', 
           backfaceVisibility: 'hidden'
         }}>
      <div className="flex items-center justify-between h-full px-4 md:px-8" style={{ alignItems: 'center' }}>
        {/* Logo区域 */}
        <div className="flex items-center">
          <Link href="/" className="transition-transform duration-200 hover:scale-105">
            <img 
              src={logo} 
              alt="微领地青年社区" 
              style={{
                width: '120px',
                height: '28.482px',
                flexShrink: 0
              }}
            />
          </Link>
        </div>
        
        {/* 导航菜单 - 右对齐 */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-8">
          <Link 
            href="/" 
            className="relative cursor-pointer group transition-all duration-200 ease-in-out active:transform-none focus:outline-none"
            style={{
              color: isActive('/') ? '#7DA84C' : '#333',
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: isActive('/') ? 700 : 500,
              lineHeight: 'normal'
            }}
          >
            <span className="relative z-10 transition-transform duration-200 group-hover:translate-y-[-1px]">
              {t.navigation.about}
            </span>
            {/* 选中状态的下装饰线 */}
            <div className={`absolute bottom-[-8px] left-0 right-0 h-0.5 bg-[#7DA84C] transition-all duration-200 ease-in-out ${
              isActive('/') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'
            }`}></div>
          </Link>
          <Link 
            href="/communities" 
            className="relative cursor-pointer group transition-all duration-200 ease-in-out active:transform-none focus:outline-none"
            style={{
              color: isActive('/communities') ? '#7DA84C' : '#333',
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: isActive('/communities') ? 700 : 500,
              lineHeight: 'normal'
            }}
          >
            <span className="relative z-10 transition-transform duration-200 group-hover:translate-y-[-1px]">
              {t.navigation.communities}
            </span>
            {/* 悬停状态的下装饰线 */}
            <div className={`absolute bottom-[-8px] left-0 right-0 h-0.5 bg-[#7DA84C] transition-all duration-200 ease-in-out ${
              isActive('/communities') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'
            }`}></div>
          </Link>
          <Link 
            href="/esg" 
            className="relative cursor-pointer group transition-all duration-200 ease-in-out active:transform-none focus:outline-none"
            style={{
              color: isActive('/esg') ? '#7DA84C' : '#333',
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: isActive('/esg') ? 700 : 500,
              lineHeight: 'normal'
            }}
          >
            <span className="relative z-10 transition-transform duration-200 group-hover:translate-y-[-1px]">
              {t.navigation.esg}
            </span>
            {/* 悬停状态的下装饰线 */}
            <div className={`absolute bottom-[-8px] left-0 right-0 h-0.5 bg-[#7DA84C] transition-all duration-200 ease-in-out ${
              isActive('/esg') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'
            }`}></div>
          </Link>
          
          {/* 语言切换器 */}
          <LanguageSwitcher />
          
          {/* 联系按钮 */}
          <Link 
            href="#contact" 
            className="bg-[#7da84c] h-[36px] px-4 md:px-6 rounded-[18px] flex items-center cursor-pointer hover:bg-[#6a8f3f] transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg active:transform-none active:scale-100 focus:outline-none"
          >
            <div 
              style={{
                color: '#FFF',
                fontFamily: 'HarmonyOS Sans SC',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal'
              }}
            >
              {t.common.contactUs}
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-[#7DA84C] focus:outline-none focus:text-[#7DA84C] transition-colors duration-200 p-2 rounded-md hover:bg-gray-100 active:transform-none"
          >
            <svg 
              className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-50 shadow-lg transition-all duration-200 ease-in-out overflow-hidden ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-3 space-y-2">
            <Link 
              href="/" 
              className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                isActive('/') 
                  ? 'text-[#7DA84C] bg-gray-50' 
                  : 'text-gray-700 hover:text-[#7DA84C] hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'HarmonyOS Sans SC' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.navigation.about}
            </Link>
            <Link 
              href="/communities" 
              className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                isActive('/communities') 
                  ? 'text-[#7DA84C] bg-gray-50' 
                  : 'text-gray-700 hover:text-[#7DA84C] hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'HarmonyOS Sans SC' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.navigation.communities}
            </Link>
            <Link 
              href="/esg" 
              className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                isActive('/esg') 
                  ? 'text-[#7DA84C] bg-gray-50' 
                  : 'text-gray-700 hover:text-[#7DA84C] hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'HarmonyOS Sans SC' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.navigation.esg}
            </Link>
            
            {/* 移动端语言切换器 */}
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            
            <Link 
              href="#contact" 
              className="block px-3 py-2 text-base font-medium bg-[#7da84c] text-white rounded-md hover:bg-[#6a8f3f] text-center transition-all duration-200 hover:scale-105 active:transform-none active:scale-100 focus:outline-none"
              style={{ fontFamily: 'HarmonyOS Sans SC' }}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.common.contactUs}
            </Link>
          </div>
        </div>
    </nav>
  )
}
