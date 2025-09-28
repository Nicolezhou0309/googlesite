'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageProvider'
import { getIconsByNames } from '@/lib/iconLibrary'
import AmenityCardGrid from './AmenityCardGrid'
import BilliardsIcon from './ui/BilliardsIcon'
import GameRoomIcon from './ui/GameRoomIcon'
import ConvenienceStoreIcon from './ui/ConvenienceStoreIcon'
import PackageStationIcon from './ui/PackageStationIcon'
import YogaRoomIcon from './ui/YogaRoomIcon'
import MiniTheaterIcon from './ui/MiniTheaterIcon'
import RecordingStudioIcon from './ui/RecordingStudioIcon'
import PingPongRoomIcon from './ui/PingPongRoomIcon'

interface CommunityAmenitiesProps {
  communityId: string
  amenityNames?: string[] // 社区特有的配套名称列表
  className?: string
  onImageClick?: (folderName: string) => void
}

// Icon组件映射
const iconComponents: Record<string, React.ComponentType<any>> = {
  'BilliardsIcon': BilliardsIcon,
  'GameRoomIcon': GameRoomIcon,
  'ConvenienceStoreIcon': ConvenienceStoreIcon,
  'PackageStationIcon': PackageStationIcon,
  'YogaRoomIcon': YogaRoomIcon,
  'MiniTheaterIcon': MiniTheaterIcon,
  'RecordingStudioIcon': RecordingStudioIcon,
  'PingPongRoomIcon': PingPongRoomIcon,
}

// 渲染icon的函数
const renderIcon = (iconName: string, alt: string) => {
  if (iconComponents[iconName]) {
    const IconComponent = iconComponents[iconName]
    return <IconComponent className="w-10 h-10" />
  }
  
  // 如果是URL，使用Image组件
  return (
    <Image
      src={iconName}
      alt={alt}
      fill
      className="object-contain"
      sizes="40px"
      loading="lazy"
    />
  )
}

export default function CommunityAmenities({ 
  communityId, 
  amenityNames = [],
  className = '',
  onImageClick
}: CommunityAmenitiesProps) {
  const { language } = useLanguage()
  
  // 根据社区ID获取对应的配套图标
  const communityAmenityIcons = getIconsByNames(amenityNames, 'community')

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {language === 'zh' ? '社区配套' : 'Community Amenities'}
        </h2>
        
        {/* 社区配套图标列表 - 动态显示 */}
        {communityAmenityIcons.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {communityAmenityIcons.map((amenity, index) => (
                <div key={index} className="flex flex-col items-center p-2">
                  <div className="w-10 h-10 mb-1 flex items-center justify-center relative">
                    {renderIcon(amenity.icon, amenity.name)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                    {language === 'zh' ? amenity.name : amenity.nameEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 社区设施详情卡片 - 使用AmenityCardGrid组件 */}
        <AmenityCardGrid 
          communityId={communityId}
          count={6}
          gridCols="3"
          showTitle={false}
          onImageClick={onImageClick}
        />
      </div>
    </section>
  )
}
