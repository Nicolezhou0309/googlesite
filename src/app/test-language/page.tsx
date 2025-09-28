'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageProvider'
import { useTranslations } from '@/lib/translations'

export default function TestLanguage() {
  const { language, setLanguage } = useLanguage()
  const t = useTranslations(language)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">语言测试页面</h1>
      
      <div className="mb-4">
        <p>当前语言: <span className="font-bold">{language}</span></p>
        <p>默认语言应该是: <span className="font-bold">en</span></p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">语言切换测试</h2>
        <button 
          onClick={() => setLanguage('zh')}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          切换到中文
        </button>
        <button 
          onClick={() => setLanguage('en')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          切换到英文
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">翻译测试</h2>
        <p>Hero标题: {t.hero.title}</p>
        <p>Hero副标题: {t.hero.subtitle}</p>
        <p>Hero CTA: {t.hero.cta}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">localStorage检查</h2>
        <p>localStorage中的语言: {typeof window !== 'undefined' ? localStorage.getItem('language') : 'N/A'}</p>
      </div>
    </div>
  )
}
