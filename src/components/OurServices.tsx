'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageProvider'
import { getIconsByNames } from '@/lib/iconLibrary'

interface OurServicesProps {
  serviceNames?: string[] // 服务名称列表
  className?: string
}

export default function OurServices({ 
  serviceNames = [],
  className = ''
}: OurServicesProps) {
  const { language } = useLanguage()
  
  // 根据服务名称获取对应的图标
  const serviceIcons = getIconsByNames(serviceNames, 'service')

  // 如果没有传入服务名称，显示所有服务
  const displayServices = serviceNames.length > 0 ? serviceIcons : getIconsByNames([
    '专属管家', '公区保洁', '扫地机器人', '日常消毒', '24H安保', 
    '专业维修', '搬家协助', '代收快递', '社区活动', '安全保障', 'APP服务自助办理'
  ], 'service')

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {language === 'zh' ? '我们的服务' : 'Our Services'}
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {displayServices.map((service, index) => (
            <div key={index} className="flex flex-col items-center p-2">
              <div className="w-10 h-10 mb-1 flex items-center justify-center relative">
                <Image
                  src={service.icon}
                  alt={service.name}
                  fill
                  className="object-contain"
                  sizes="40px"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                {language === 'zh' ? service.name : service.nameEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
