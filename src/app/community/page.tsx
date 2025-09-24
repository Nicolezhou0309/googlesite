import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Community() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                社区介绍
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                微领地青年公寓位于上海核心区域，周边配套设施完善，交通便利，为您的居住生活提供全方位保障
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">地理位置优越</h2>
                <p className="text-lg text-gray-600 mb-6">
                  位于上海浦东新区核心区域，紧邻地铁2号线和4号线，距离陆家嘴金融中心仅15分钟车程。
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    <span>地铁2号线步行5分钟</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    <span>距离陆家嘴15分钟车程</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary-600 mr-3">✓</span>
                    <span>周边商业配套完善</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">地图位置图片</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">周边配套</h2>
              <p className="text-xl text-gray-600">生活所需，一应俱全</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold mb-3">购物中心</h3>
                <p className="text-gray-600">周边3公里内有多家大型购物中心，满足您的购物需求</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold mb-3">医疗设施</h3>
                <p className="text-gray-600">附近有多家三甲医院和社区医院，保障您的健康</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-3">教育资源</h3>
                <p className="text-gray-600">周边有优质中小学和培训机构，方便子女教育</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
