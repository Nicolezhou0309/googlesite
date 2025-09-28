'use client'

import React, { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [currentPath, setCurrentPath] = useState(pathname)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (pathname !== currentPath) {
      // 对于导航切换，使用更快的过渡
      const isNavigationChange = pathname.startsWith('/communities') || 
                                pathname.startsWith('/apartments') || 
                                pathname.startsWith('/esg') ||
                                pathname === '/'
      
      if (isNavigationChange) {
        // 导航切换：立即更新，无延迟
        setCurrentPath(pathname)
        setIsVisible(true)
        setIsTransitioning(false)
      } else {
        // 其他页面切换：保持过渡效果
        setIsVisible(false)
        setIsTransitioning(true)
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        
        timeoutRef.current = setTimeout(() => {
          setCurrentPath(pathname)
          setIsVisible(true)
          setIsTransitioning(false)
        }, 50)
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [pathname, currentPath])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-[400px]">
      {/* 页面切换动画容器 */}
      <div
        className={`transition-opacity duration-150 ease-out ${
          isVisible
            ? 'opacity-100'
            : 'opacity-0'
        }`}
        style={{
          willChange: isTransitioning ? 'opacity' : 'auto',
        }}
      >
        {children}
      </div>
      
      {/* 页面切换时的加载指示器 */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#7DA84C] rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-[#7DA84C] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-[#7DA84C] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <div className="text-sm text-gray-600 font-medium" style={{ fontFamily: 'HarmonyOS Sans SC' }}>
              页面加载中...
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
