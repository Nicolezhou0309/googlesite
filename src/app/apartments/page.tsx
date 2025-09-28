'use client'

import React, { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import ApartmentCardGrid from '@/components/ApartmentCardGrid'

export default function Apartments() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
    <main>
      <Navigation />
      <div className={`pt-[70px] transition-all duration-700 ease-out ${
        isLoaded 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}>
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

        {/* 房型卡片展示区域 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                {/* 左侧装饰图标 - 优雅的叶子图案 */}
                <div className="flex items-center mr-6">
                  <svg className="w-10 h-10 text-[#7DA84C] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2c-3 2-5 6-5 10 0 5.5 4.5 10 10 10s10-4.5 10-10c0-4-2-8-5-10"/>
                    <path d="M12 2c3 2 5 6 5 10 0 5.5-4.5 10-10 10S-3 17.5-3 12c0-4 2-8 5-10"/>
                  </svg>
                  <div className="ml-2 flex flex-col space-y-1">
                    <div className="w-2 h-2 bg-[#7DA84C] rounded-full opacity-60"></div>
                    <div className="w-3 h-2 bg-[#7DA84C] rounded-full opacity-40"></div>
                  </div>
                </div>
                
                {/* 标题 */}
                <h2 className="text-3xl font-bold text-gray-900 relative">
                  精选房型
                  {/* 标题下方装饰线 */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#7DA84C] to-transparent"></div>
                </h2>
                
                {/* 右侧装饰图标 - 镜像叶子图案 */}
                <div className="flex items-center ml-6">
                  <div className="mr-2 flex flex-col space-y-1">
                    <div className="w-3 h-2 bg-[#7DA84C] rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-[#7DA84C] rounded-full opacity-60"></div>
                  </div>
                  <svg className="w-10 h-10 text-[#7DA84C] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2c-3 2-5 6-5 10 0 5.5 4.5 10 10 10s10-4.5 10-10c0-4-2-8-5-10"/>
                    <path d="M12 2c3 2 5 6 5 10 0 5.5-4.5 10-10 10S-3 17.5-3 12c0-4 2-8 5-10"/>
                  </svg>
                </div>
              </div>
              <p className="text-xl text-gray-600">从功能到美学，为你呈现无需妥协的理想家</p>
            </div>
            <ApartmentCardGrid 
              variant="detailed"
              imageLayout="one-drag-two"
              maxItems={12}
            />
          </div>
        </section>

        {/* 原有房型介绍区域 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">房型概览</h2>
              <p className="text-xl text-gray-600">多种房型选择，满足不同居住需求</p>
            </div>
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
    </main>
  )
}
