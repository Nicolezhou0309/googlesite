'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageProvider'

interface AmenityCardProps {
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
  image: string
  imageAlt?: string
  className?: string
  folderName?: string
  onImageClick?: (folderName: string) => void
}

export default function AmenityCard({
  title,
  titleEn,
  description,
  descriptionEn,
  image,
  imageAlt,
  className = '',
  folderName,
  onImageClick
}: AmenityCardProps) {
  const { language } = useLanguage()

  const displayTitle = language === 'zh' ? title : (titleEn || title)
  const displayImageAlt = imageAlt || displayTitle

  const handleClick = () => {
    if (folderName && onImageClick) {
      onImageClick(folderName)
    }
  }

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="h-48 relative">
        <Image
          src={image}
          alt={displayImageAlt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        
        {/* 底部渐变蒙版和空间名称 - 降低阴影透明度，最深10% */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent h-20 flex items-end p-3 pl-5">
          <div className="text-white">
            <h4 className="text-base font-bold">
              {displayTitle}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}
