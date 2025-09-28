'use client'

import React, { useState } from 'react'
import GalleryModal from '@/components/GalleryModal'

export default function LightboxTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Lightbox 功能测试页面
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            测试说明
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>功能特性：</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>点击图片可以打开lightbox模式</li>
              <li>支持图片缩放和旋转</li>
              <li>支持键盘导航（左右箭头键切换图片）</li>
              <li>支持ESC键关闭lightbox</li>
              <li>支持点击背景关闭lightbox</li>
              <li>响应式设计，适配移动端</li>
              <li>图片加载动画</li>
              <li>自定义控制按钮（旋转、缩放）</li>
            </ul>
          </div>
          
          <div className="mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              打开画廊测试 Lightbox
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">测试步骤：</h3>
            <ol className="list-decimal list-inside space-y-1 text-yellow-700 text-sm">
              <li>点击上方按钮打开画廊</li>
              <li>点击任意图片进入lightbox模式</li>
              <li>测试缩放功能（点击缩放按钮或鼠标滚轮）</li>
              <li>测试旋转功能（点击旋转按钮）</li>
              <li>测试键盘导航（左右箭头键）</li>
              <li>测试关闭功能（ESC键或点击背景）</li>
            </ol>
          </div>
        </div>
        
        <GalleryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          communityId="jingan-center"
        />
      </div>
    </div>
  )
}
