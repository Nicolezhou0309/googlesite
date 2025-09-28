'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageProvider'
import { generateCommunityAmenities } from '@/lib/apartmentData'
import AmenityCard from './AmenityCard'

interface AmenityCardGridProps {
  communityId: string
  count?: number
  className?: string
  gridCols?: '1' | '2' | '3'
  showTitle?: boolean
  title?: string
  titleEn?: string
  onImageClick?: (folderName: string) => void
}

export default function AmenityCardGrid({
  communityId,
  count = 6,
  className = '',
  gridCols = '3',
  showTitle = true,
  title,
  titleEn,
  onImageClick
}: AmenityCardGridProps) {
  const { language } = useLanguage()
  
  // 生成公区设施数据
  const amenities = generateCommunityAmenities(communityId, count)
  
  if (!amenities || amenities.length === 0) {
    return null
  }

  // 网格列数配置
  const gridColsClass = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[gridCols]

  const displayTitle = title || (language === 'zh' ? '社区设施' : 'Community Facilities')
  const displayTitleEn = titleEn || displayTitle
  const finalTitle = language === 'zh' ? displayTitle : displayTitleEn

  return (
    <div className={className}>
      {showTitle && (
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {finalTitle}
        </h2>
      )}
      
      <div className={`grid ${gridColsClass} gap-8`}>
        {amenities.map((amenity, index) => (
          <AmenityCard
            key={`${amenity.title}-${index}`}
            title={amenity.title}
            titleEn={amenity.titleEn}
            image={amenity.image}
            imageAlt={amenity.title}
            folderName={amenity.folderName}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    </div>
  )
}
