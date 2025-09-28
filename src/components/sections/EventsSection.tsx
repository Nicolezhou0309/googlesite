'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { getOptimizedImageProps, handleImageError, handleImageLoad } from '../../lib/imageOptimization';
import { getEventImageUrl } from '../../lib/imageConfig';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useTranslations } from '../../lib/translations';

// 优化的轮播组件 - 使用 useMemo 和 useCallback 减少重新渲染
const SimpleCarousel = React.memo(({ images, autoplay = true, autoplaySpeed = 4000, dots = true, effect = 'fade', t }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 使用 useCallback 优化定时器函数
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!autoplay || !images || images.length === 0) return;

    const timer = setInterval(nextSlide, autoplaySpeed);
    return () => clearInterval(timer);
  }, [autoplay, autoplaySpeed, nextSlide]);

  // 使用 useCallback 优化点击处理函数
  const handleDotClick = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  if (!images || images.length === 0) {
    return <div className="relative overflow-hidden h-64">{t.common.noImagesToDisplay}</div>;
  }

  return (
    <div className="relative overflow-hidden h-64">
      <div className="flex transition-transform duration-500 ease-in-out h-64" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((image: string, index: number) => (
          <div key={index} className="relative w-full h-64 flex-shrink-0">
            <Image
              src={image}
              alt={`Carousel image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
        ))}
      </div>
      
      {dots && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_: any, index: number) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
});

// 活动图片轮播组件
const EventCarousel = ({ 
  images, 
  eventName,
  t
}: { 
  images: string[]; 
  eventName: string;
  t: any;
}) => {
  return (
    <div className="w-full h-64">
      <SimpleCarousel
        images={images}
        autoplay
        autoplaySpeed={4000}
        dots={true}
        effect="fade"
        t={t}
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-64">
            <Image
              {...getOptimizedImageProps(image, `${eventName} ${index + 1}`)}
              fill
              className="object-cover"
              style={{
                objectPosition: 'center center'
              }}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </div>
        ))}
      </SimpleCarousel>
    </div>
  );
};

const EventsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  // 使用 useMemo 缓存活动图片URL，避免每次渲染都重新计算
  const eventImages = useMemo(() => ({
    foodSharingFairImages: [
      getEventImageUrl("FoodSharingFair", "1.webp"),
      getEventImageUrl("FoodSharingFair", "2.webp"),
      getEventImageUrl("FoodSharingFair", "3.webp")
    ],
    freshmanPartyImages: [
      getEventImageUrl(" Freshman Party", "1.webp"),
      getEventImageUrl(" Freshman Party", "2.webp"),
      getEventImageUrl(" Freshman Party", "3.webp"),
      getEventImageUrl(" Freshman Party", "4.webp")
    ],
    cocktailGatheringImages: [
      getEventImageUrl("cocktail", "95afa6835184f7e964de7ca5b67d6101bd94bc35.webp")
    ]
  }), []);

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h2 
          className="font-bold text-[#7da84c] text-left leading-[1.3] tracking-[0] mb-4 sm:mb-6"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(24px, 5vw, 40px)',
            fontWeight: 700
          }}
        >
          {t.events.title.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < t.events.title.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <p 
          className="text-gray-600 text-left leading-[1.6] mb-12 sm:mb-16"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 400
          }}
        >
          {t.events.subtitle.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < t.events.subtitle.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        
        <div className="flex overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-6 md:gap-8">
            <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[400px] flex flex-col">
              {/* 活动图片轮播 */}
              <EventCarousel 
                images={eventImages.cocktailGatheringImages} 
                eventName="Weekly Cocktail Gatherings"
                t={t}
              />
              <div className="p-4 sm:p-6 flex flex-col h-[140px] sm:h-[156px]">
                <h3 
                  className="font-medium text-black mb-3 sm:mb-4 flex-shrink-0"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(16px, 3vw, 20px)',
                    fontWeight: 500
                  }}
                >
                  {t.events.activities.cocktailGathering.name}
                </h3>
                <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <p 
                    className="font-normal text-black leading-[1.5]"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: 400
                    }}
                  >
                    {t.events.activities.cocktailGathering.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[400px] flex flex-col">
              {/* 活动图片轮播 */}
              <EventCarousel 
                images={eventImages.foodSharingFairImages} 
                eventName="Food Sharing Fair"
                t={t}
              />
              <div className="p-4 sm:p-6 flex flex-col h-[140px] sm:h-[156px]">
                <h3 
                  className="font-medium text-black mb-3 sm:mb-4 flex-shrink-0"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: 500
                  }}
                >
                  {t.events.activities.foodSharingFair.name}
                </h3>
                <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <p 
                    className="font-normal text-black leading-[1.5]"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: 400
                    }}
                  >
                    {t.events.activities.foodSharingFair.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[400px] flex flex-col">
              {/* 活动图片轮播 */}
              <EventCarousel 
                images={eventImages.freshmanPartyImages} 
                eventName="Freshman Party"
                t={t}
              />
              <div className="p-4 sm:p-6 flex flex-col h-[140px] sm:h-[156px]">
                <h3 
                  className="font-medium text-black mb-3 sm:mb-4 flex-shrink-0"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: 500
                  }}
                >
                  {t.events.activities.freshmanParty.name}
                </h3>
                <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <p 
                    className="font-normal text-black leading-[1.5]"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: 400
                    }}
                  >
                    {t.events.activities.freshmanParty.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
