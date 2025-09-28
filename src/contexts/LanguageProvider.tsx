'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getLanguageConfig } from '@/lib/env'

interface LanguageContextType {
  language: 'zh' | 'en'
  setLanguage: (language: 'zh' | 'en') => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // 从环境变量配置获取默认语言
  const { defaultLanguage, isLanguageSupported } = getLanguageConfig()
  const [language, setLanguage] = useState<'zh' | 'en'>(defaultLanguage)
  const [isClient, setIsClient] = useState(false)

  // 确保只在客户端运行
  useEffect(() => {
    setIsClient(true)
    const savedLanguage = localStorage.getItem('language') as 'zh' | 'en' | null
    
    if (savedLanguage && isLanguageSupported(savedLanguage)) {
      // 如果有保存的语言设置且支持，则使用保存的语言
      setLanguage(savedLanguage)
    } else {
      // 否则使用默认语言
      setLanguage(defaultLanguage)
      localStorage.setItem('language', defaultLanguage)
    }
  }, [defaultLanguage, isLanguageSupported])

  // 保存语言设置到localStorage
  const handleSetLanguage = (newLanguage: 'zh' | 'en') => {
    setLanguage(newLanguage)
    if (isClient) {
      localStorage.setItem('language', newLanguage)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
