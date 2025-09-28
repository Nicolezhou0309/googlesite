'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageProvider'

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (newLanguage: 'zh' | 'en') => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#7DA84C] focus:outline-none focus:text-[#7DA84C] transition-colors duration-200"
        style={{ fontFamily: 'HarmonyOS Sans SC' }}
      >
        <span>{language === 'zh' ? '中文' : 'English'}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50 transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      }`}>
        <div className="py-1">
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-200 hover:translate-x-1 ${
                language === 'zh' ? 'text-[#7DA84C] font-medium' : 'text-gray-700'
              }`}
              style={{ fontFamily: 'HarmonyOS Sans SC' }}
            >
              中文
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-200 hover:translate-x-1 ${
                language === 'en' ? 'text-[#7DA84C] font-medium' : 'text-gray-700'
              }`}
              style={{ fontFamily: 'HarmonyOS Sans SC' }}
            >
              English
            </button>
          </div>
        </div>
    </div>
  )
}
