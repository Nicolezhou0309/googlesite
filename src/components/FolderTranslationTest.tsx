'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageProvider'
import { getFolderDisplayName, getCommunityDisplayName, folderTranslations } from '@/lib/folderTranslations'

export default function FolderTranslationTest() {
  const { language, setLanguage } = useLanguage()
  const [testFolder, setTestFolder] = useState('公区')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">OSS文件夹名称翻译测试</h1>
      
      {/* 语言切换 */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">当前语言: {language}</label>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('zh')}
            className={`px-4 py-2 rounded ${language === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            中文
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            English
          </button>
        </div>
      </div>

      {/* 文件夹名称测试 */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">测试文件夹名称:</label>
        <select
          value={testFolder}
          onChange={(e) => setTestFolder(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-xs"
        >
          {folderTranslations.map((translation) => (
            <option key={translation.chinese} value={translation.chinese}>
              {translation.chinese}
            </option>
          ))}
        </select>
        
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>中文名称:</strong> {testFolder}</p>
          <p><strong>英文名称:</strong> {getFolderDisplayName(testFolder, 'en')}</p>
          <p><strong>当前语言显示:</strong> {getFolderDisplayName(testFolder, language)}</p>
        </div>
      </div>

      {/* 所有翻译对照表 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">所有文件夹翻译对照表</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">中文名称</th>
                <th className="border border-gray-300 px-4 py-2 text-left">英文名称</th>
                <th className="border border-gray-300 px-4 py-2 text-left">分类</th>
              </tr>
            </thead>
            <tbody>
              {folderTranslations.map((translation, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-4 py-2">{translation.chinese}</td>
                  <td className="border border-gray-300 px-4 py-2">{translation.english}</td>
                  <td className="border border-gray-300 px-4 py-2">{translation.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 社区名称测试 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">社区名称翻译测试</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['jingan-center', 'north-hongqiao', 'pujiang-center', 'pujiang-park', 'zhonghuan-hutai'].map((communityId) => (
            <div key={communityId} className="p-4 bg-gray-100 rounded">
              <p><strong>社区ID:</strong> {communityId}</p>
              <p><strong>中文显示:</strong> {getCommunityDisplayName(communityId, 'zh')}</p>
              <p><strong>英文显示:</strong> {getCommunityDisplayName(communityId, 'en')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
