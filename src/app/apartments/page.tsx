import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Apartments() {
  const apartmentTypes = [
    {
      name: '单间公寓',
      size: '25-35㎡',
      price: '3500-4500元/月',
      features: ['独立卫浴', '小厨房', '阳台', '空调', 'WiFi'],
      image: '🏠'
    },
    {
      name: '一室一厅',
      size: '40-50㎡',
      price: '5000-6500元/月',
      features: ['独立客厅', '独立卧室', '独立卫浴', '厨房', '阳台'],
      image: '🏡'
    },
    {
      name: '两室一厅',
      size: '60-80㎡',
      price: '7500-9500元/月',
      features: ['两间卧室', '独立客厅', '双卫浴', '大厨房', '双阳台'],
      image: '🏘️'
    }
  ]

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                房型介绍
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                多种房型选择，满足不同居住需求，现代化装修，拎包入住
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apartmentTypes.map((apartment, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center text-6xl">
                    {apartment.image}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{apartment.name}</h3>
                    <div className="text-lg text-primary-600 font-semibold mb-2">{apartment.price}</div>
                    <div className="text-gray-600 mb-4">面积: {apartment.size}</div>
                    <ul className="space-y-2 mb-6">
                      {apartment.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="text-primary-600 mr-2">✓</span>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                      预约看房
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">配套设施</h2>
              <p className="text-xl text-gray-600">完善的配套设施，让您住得舒心</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🏋️</div>
                <h3 className="text-lg font-semibold mb-2">健身房</h3>
                <p className="text-gray-600">24小时开放</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-semibold mb-2">阅览室</h3>
                <p className="text-gray-600">安静学习空间</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="text-lg font-semibold mb-2">公共厨房</h3>
                <p className="text-gray-600">共享烹饪空间</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="text-lg font-semibold mb-2">停车位</h3>
                <p className="text-gray-600">地下停车场</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
