'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { getOptimizedImageProps, handleImageError, handleImageLoad } from '../../lib/imageOptimization';
import { getRestaurantImageUrl } from '../../lib/imageConfig';
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

// 餐厅图片轮播组件
const RestaurantCarousel = ({ 
  facadeImage, 
  dishes, 
  restaurantName,
  t
}: { 
  facadeImage: string; 
  dishes: string[]; 
  restaurantName: string;
  t: any;
}) => {
  const allImages = [facadeImage, ...dishes];

  return (
    <div className="w-full h-64">
      <SimpleCarousel
        images={allImages}
        autoplay
        autoplaySpeed={4000}
        dots={true}
        effect="fade"
        t={t}
      >
        {allImages.map((image, index) => (
          <div key={index} className="relative w-full h-64">
            <Image
              {...getOptimizedImageProps(image, index === 0 ? `${restaurantName} facade` : `${restaurantName} dish ${index}`)}
              fill
              className={`object-cover ${
                image.includes('e702f7e495ca93229d6e775e0ceee93f') 
                  ? 'object-top' 
                  : image.includes('016f8b07a3709e154a1f4a76a3a56475d2f1d043')
                  ? 'object-top'
                  : image.includes('4121e59731f5c4a97bd9e75b6faa0b87')
                  ? 'object-top'
                  : ''
              }`}
              style={{
                objectPosition: image.includes('e702f7e495ca93229d6e775e0ceee93f') 
                  ? 'center top' 
                  : image.includes('016f8b07a3709e154a1f4a76a3a56475d2f1d043')
                  ? 'center 30%'
                  : image.includes('4121e59731f5c4a97bd9e75b6faa0b87')
                  ? 'center 80%'
                  : 'center center'
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

const FoodSection: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  // 使用 useMemo 缓存图片URL，避免每次渲染都重新计算
  const imageUrls = useMemo(() => ({
    img9F6Cb0B90260A921Fcb08D31A40A4EabOrigin1: getRestaurantImageUrl("Qiantangqiuhe", "a9ab380538d3cd574b54a77ffd0a4fda41b421f5.webp"),
    img80B0E79Ad1B0042Dae080A52Bfe50880Origin1: getRestaurantImageUrl("MasMuslim Restaurant", "1.webp"),
    img40C2F7E838D68721A9E5223162C28921Origin1: getRestaurantImageUrl("LiuzhouLuosifen", "016f8b07a3709e154a1f4a76a3a56475d2f1d043.webp"),
    qiantangqiuheImages: [
      getRestaurantImageUrl("Qiantangqiuhe", "e702f7e495ca93229d6e775e0ceee93f.webp")
    ],
    masMuslimImages: [
      getRestaurantImageUrl("MasMuslim Restaurant", "060feceac1df77831e6ac0f2ad1201e6.webp"),
      getRestaurantImageUrl("MasMuslim Restaurant", "721363058ca26e9b5ea49c30b373ed9c.webp")
    ],
    liuzhouLuosifenImages: [
      getRestaurantImageUrl("LiuzhouLuosifen", "06f8cf6ca6e094f2736a23acb846051f.webp"),
      getRestaurantImageUrl("LiuzhouLuosifen", "4121e59731f5c4a97bd9e75b6faa0b87.webp"),
      getRestaurantImageUrl("LiuzhouLuosifen", "a4e8b80434614d26fc191b1153b1e6fd.webp")
    ]
  }), []);

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="w-full mb-6 sm:mb-8">
          <p 
            className="font-bold text-[#7da84c] text-left leading-[1.3] tracking-[0] mb-4 sm:mb-6"
            style={{
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: 'clamp(24px, 5vw, 40px)',
              fontWeight: 700
            }}
          >
            {t.food.title.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < t.food.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <p 
            className="text-gray-600 text-left leading-[1.6]"
            style={{
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: 'clamp(14px, 2vw, 18px)',
              fontWeight: 400
            }}
          >
            {t.food.subtitle}
          </p>
        </div>
        
        <div className="flex overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-6 md:gap-8">
            <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[500px] flex flex-col">
              {/* 餐厅图片轮播（门面照片 + 菜品图片） */}
              <RestaurantCarousel 
                facadeImage={imageUrls.img9F6Cb0B90260A921Fcb08D31A40A4EabOrigin1}
                dishes={imageUrls.qiantangqiuheImages} 
                restaurantName="Qiantangqiuhe"
                t={t}
              />
              <div className="p-4 sm:p-6 flex flex-col h-[200px] sm:h-[216px]">
                <h3 
                  className="font-medium text-black mb-3 sm:mb-4 flex-shrink-0"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(16px, 3vw, 20px)',
                    fontWeight: 500
                  }}
                >
                  {t.food.restaurants.qiantangqiuhe.name}
                </h3>
                <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <p 
                    className="font-normal text-black leading-relaxed"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: 400
                    }}
                  >
                    {t.food.restaurants.qiantangqiuhe.description.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < t.food.restaurants.qiantangqiuhe.description.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[500px] flex flex-col">
              {/* 餐厅图片轮播（门面照片 + 菜品图片） */}
              <RestaurantCarousel 
                facadeImage={imageUrls.img80B0E79Ad1B0042Dae080A52Bfe50880Origin1}
                dishes={imageUrls.masMuslimImages} 
                restaurantName="Ma's Muslim Restaurant"
                t={t}
              />
              <div className="p-4 sm:p-6 flex flex-col h-[200px] sm:h-[216px]">
                <h3 
                  className="font-medium text-black mb-3 sm:mb-4 flex-shrink-0"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(16px, 3vw, 20px)',
                    fontWeight: 500
                  }}
                >
                  {t.food.restaurants.masMuslim.name}
                </h3>
                <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <p 
                    className="font-normal text-black leading-relaxed"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: 400
                    }}
                  >
                    {t.food.restaurants.masMuslim.description.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < t.food.restaurants.masMuslim.description.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[500px] flex flex-col">
              {/* 餐厅图片轮播（门面照片 + 菜品图片） */}
              <RestaurantCarousel 
                facadeImage={imageUrls.img40C2F7E838D68721A9E5223162C28921Origin1}
                dishes={imageUrls.liuzhouLuosifenImages} 
                restaurantName="Auntie Fatty's"
                t={t}
              />
              <div className="p-4 sm:p-6 flex flex-col h-[200px] sm:h-[216px]">
                <h3 
                  className="font-medium text-black mb-3 sm:mb-4 flex-shrink-0"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(16px, 3vw, 20px)',
                    fontWeight: 500
                  }}
                >
                  {t.food.restaurants.auntieFatty.name}
                </h3>
                <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <p 
                    className="font-normal text-black leading-relaxed"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: 400
                    }}
                  >
                    {t.food.restaurants.auntieFatty.description.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < t.food.restaurants.auntieFatty.description.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
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

export default FoodSection;
