'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageProvider'
import { translations } from '@/lib/translations'

interface CustomImage {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface CommunityCarouselProps {
  customImages?: CustomImage[];
}

export default function CommunityCarousel({ customImages }: CommunityCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language } = useLanguage()
  const t = translations[language]

  // 使用硬编码的图片地址
  const carouselSlides = customImages || [
    {
      id: 1,
      image: '/images/banner/list1.jpg',
      title: t.communities.carousel.slide1.title,
      description: t.communities.carousel.slide1.description
    },
    {
      id: 2,
      image: '/images/banner/list2.jpg',
      title: t.communities.carousel.slide2.title,
      description: t.communities.carousel.slide2.description
    },
    {
      id: 3,
      image: '/images/banner/list3.jpg',
      title: t.communities.carousel.slide3.title,
      description: t.communities.carousel.slide3.description
    }
  ]

  // 直接使用硬编码的图片地址
  const processedSlides = carouselSlides

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % processedSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [processedSlides.length])

  return (
    <div className="w-full h-[85vh] min-h-[600px] max-h-[900px] relative overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {processedSlides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] flex-shrink-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={slide.id === 1}
              sizes="100vw"
            />
            
            {/* 文案覆盖层 */}
            <div className="absolute left-4 md:left-[84px] top-[120px] md:top-[180px] max-w-2xl">
              <h1 
                className="mb-4 text-white text-4xl md:text-5xl font-bold whitespace-pre-line"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.50)',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: 'clamp(32px, 5vw, 47px)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              >
                {slide.title}
              </h1>
              <p 
                className="mt-8 text-white text-base md:text-lg"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.50)',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: 'clamp(16px, 2.5vw, 18px)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal'
                }}
              >
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {processedSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}