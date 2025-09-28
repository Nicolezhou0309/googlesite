'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageProvider'
import { roomAmenityIcons } from '@/lib/iconLibrary'

interface RoomAmenitiesProps {
  className?: string
}

export default function RoomAmenities({ className = '' }: RoomAmenitiesProps) {
  const { language } = useLanguage()

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {language === 'zh' ? '房间配套' : 'Room Amenities'}
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {roomAmenityIcons.map((amenity, index) => (
            <div key={index} className="flex flex-col items-center p-2">
              <div className="w-10 h-10 mb-1 flex items-center justify-center relative">
                <Image
                  src={amenity.icon}
                  alt={amenity.name}
                  fill
                  className="object-contain"
                  sizes="40px"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                {language === 'zh' ? amenity.name : amenity.nameEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
