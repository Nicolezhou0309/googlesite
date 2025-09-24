import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                品牌介绍
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                微领地青年公寓致力于为年轻人在上海提供优质的居住环境和贴心的服务
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">我们的使命</h2>
                <p className="text-lg text-gray-600 mb-6">
                  微领地青年公寓成立于2020年，专注于为在上海打拼的年轻人提供高品质的居住解决方案。
                  我们深知年轻人在大城市生活的挑战，因此致力于创造安全、舒适、便利的居住环境。
                </p>
                <p className="text-lg text-gray-600">
                  通过现代化的设施、贴心的服务和合理的价格，我们希望每一位租客都能在上海找到属于自己的家。
                </p>
              </div>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">公司形象图片</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">我们的优势</h2>
              <p className="text-xl text-gray-600">专业团队，用心服务</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-4">专业团队</h3>
                <p className="text-gray-600">
                  拥有10年以上房地产管理经验的专业团队，为您提供专业的租赁服务
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold mb-4">创新理念</h3>
                <p className="text-gray-600">
                  采用现代化的管理模式，结合科技手段，提升居住体验
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold mb-4">贴心服务</h3>
                <p className="text-gray-600">
                  24小时客服热线，及时响应您的需求，让您住得安心
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">发展历程</h2>
              <p className="text-xl text-gray-600">稳步发展，持续创新</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  2020
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">公司成立</h3>
                  <p className="text-gray-600">微领地青年公寓正式成立，开始为上海年轻人提供租赁服务</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  2021
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">业务扩展</h3>
                  <p className="text-gray-600">业务范围扩展至浦东新区多个区域，服务更多租客</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  2023
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">数字化升级</h3>
                  <p className="text-gray-600">引入数字化管理系统，提升服务效率和租客体验</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  2024
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">品牌升级</h3>
                  <p className="text-gray-600">品牌形象全面升级，推出全新服务理念</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
