'use client'

import React from 'react'
import CommunityLocation from '@/components/sections/CommunityLocation'

export default function TestMapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Google Maps InfoWindow 测试页面
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            测试说明
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>1. 打开浏览器开发者工具的控制台</p>
            <p>2. 点击地图上的绿色标记</p>
            <p>3. 观察控制台输出和地图上的信息窗口</p>
            <p>4. 检查是否显示简单的信息窗口，然后显示完整的React组件</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <CommunityLocation />
        </div>
      </div>
    </div>
  )
}
