import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">微领地青年公寓</h3>
            <p className="text-gray-300 mb-4">
              为年轻人在上海提供优质的居住环境和贴心的服务，让您在这个城市找到家的感觉。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">微信</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.5 12.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5zM15.5 12.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">微博</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.5 3C5.4 3 2 6.4 2 10.5c0 2.1.8 4 2.1 5.4L2 21l5.5-2.1c1.4.8 3 1.1 4.5 1.1 4.1 0 7.5-3.4 7.5-7.5S13.6 3 9.5 3z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">首页</Link></li>
              <li><Link href="/community" className="text-gray-300 hover:text-white">社区介绍</Link></li>
              <li><Link href="/apartments" className="text-gray-300 hover:text-white">房型介绍</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white">品牌介绍</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">联系我们</h4>
            <ul className="space-y-2 text-gray-300">
              <li>电话: 400-123-4567</li>
              <li>邮箱: info@vlinker.com</li>
              <li>地址: 上海市浦东新区</li>
              <li>工作时间: 9:00-18:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 微领地青年公寓. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}
