'use client';

import React from 'react';
import Image from 'next/image';
import { getOptimizedImageProps, handleImageError, handleImageLoad } from '../../lib/imageOptimization';
import { getRecommendImageUrl } from '../../lib/imageConfig';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useTranslations } from '../../lib/translations';

const TestimonialsSection: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  return (
    <div className="bg-[#f4f4f4] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h2 
          className="font-bold text-[#7da84c] text-left leading-[1.3] tracking-[0] mb-4 sm:mb-6"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(24px, 5vw, 40px)',
            fontWeight: 700
          }}
        >
          {t.testimonials.title}
        </h2>
        <p 
          className="text-gray-600 text-left leading-[1.6] mb-12 sm:mb-16"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 400
          }}
        >
          {t.testimonials.subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-4 sm:p-6 relative flex flex-col h-full">
            {/* 左上角装饰SVG */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <svg width="40" height="35" className="sm:w-[59px] sm:h-[52px]" viewBox="0 0 59 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M22.4 29.7916V51.9916H0.199997V29.7916C0.199997 25.7916 0.63333 22.0249 1.5 18.4916C2.36666 14.9583 3.7 11.8583 5.5 9.1916C7.3 6.52493 9.6 4.3916 12.4 2.7916C15.2 1.1916 18.4667 0.391602 22.2 0.391602V10.3916C19.9333 10.3916 18.0667 10.9583 16.6 12.0916C15.1333 13.2249 13.9333 14.7249 13 16.5916C12.0667 18.4583 11.4333 20.5583 11.1 22.8916C10.7667 25.2249 10.6 27.5249 10.6 29.7916H22.4ZM59 29.7916V51.9916H36.8V29.7916C36.8 25.7916 37.2333 22.0249 38.1 18.4916C38.9667 14.9583 40.3 11.8583 42.1 9.1916C43.9 6.52493 46.2 4.3916 49 2.7916C51.8 1.1916 55.0667 0.391602 58.8 0.391602V10.3916C56.5333 10.3916 54.6667 10.9583 53.2 12.0916C51.7333 13.2249 50.5333 14.7249 49.6 16.5916C48.6667 18.4583 48.0333 20.5583 47.7 22.8916C47.3667 25.2249 47.2 27.5249 47.2 29.7916H59Z" fill="#7DA84C"/>
              </svg>
            </div>
            
            {/* 评价内容 */}
            <p 
              className="font-normal text-black leading-[1.5] pl-12 sm:pl-16 pt-8 sm:pt-12 flex-1"
              style={{
                fontFamily: 'HarmonyOS Sans SC',
                fontSize: 'clamp(12px, 2vw, 14px)',
                fontWeight: 400
              }}
            >
              {t.testimonials.reviews.jules.content}
            </p>
            
            {/* 底部用户信息 */}
            <div className="flex items-center justify-end mt-auto">
              <div className="text-right mr-3 sm:mr-4">
                <h4 
                  className="font-bold text-black"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(14px, 2.5vw, 18px)',
                    fontWeight: 700
                  }}
                >
                  {t.testimonials.reviews.jules.name}
                </h4>
                <p 
                  className="text-[#838383]"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(10px, 1.5vw, 12px)',
                    fontWeight: 400
                  }}
                >
                  {t.testimonials.reviews.jules.university}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image 
                  {...getOptimizedImageProps(getRecommendImageUrl("Jules.webp"), "Jules", false, "object-cover object-center", { 
                    color: "transparent",
                    objectPosition: 'center center'
                  })}
                  fill
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  style={{ transform: 'scale(1.8) translateY(-8px) translateX(1px)' }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 relative flex flex-col h-full">
            {/* 左上角装饰SVG */}
            <div className="absolute top-4 left-4">
              <svg width="59" height="52" viewBox="0 0 59 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M22.4 29.7916V51.9916H0.199997V29.7916C0.199997 25.7916 0.63333 22.0249 1.5 18.4916C2.36666 14.9583 3.7 11.8583 5.5 9.1916C7.3 6.52493 9.6 4.3916 12.4 2.7916C15.2 1.1916 18.4667 0.391602 22.2 0.391602V10.3916C19.9333 10.3916 18.0667 10.9583 16.6 12.0916C15.1333 13.2249 13.9333 14.7249 13 16.5916C12.0667 18.4583 11.4333 20.5583 11.1 22.8916C10.7667 25.2249 10.6 27.5249 10.6 29.7916H22.4ZM59 29.7916V51.9916H36.8V29.7916C36.8 25.7916 37.2333 22.0249 38.1 18.4916C38.9667 14.9583 40.3 11.8583 42.1 9.1916C43.9 6.52493 46.2 4.3916 49 2.7916C51.8 1.1916 55.0667 0.391602 58.8 0.391602V10.3916C56.5333 10.3916 54.6667 10.9583 53.2 12.0916C51.7333 13.2249 50.5333 14.7249 49.6 16.5916C48.6667 18.4583 48.0333 20.5583 47.7 22.8916C47.3667 25.2249 47.2 27.5249 47.2 29.7916H59Z" fill="#7DA84C"/>
              </svg>
            </div>
            
            {/* 评价内容 */}
            <p className="font-normal text-[14px] text-black leading-[24px] pl-16 pt-12 flex-1">
              {t.testimonials.reviews.emrys.content}
            </p>
            
            {/* 底部用户信息 */}
            <div className="flex items-center justify-end mt-auto">
              <div className="text-right mr-4">
                <h4 className="font-bold text-black text-[18px]">{t.testimonials.reviews.emrys.name}</h4>
                <p className="text-[#838383] text-[12px]">{t.testimonials.reviews.emrys.university}</p>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image 
                  {...getOptimizedImageProps(getRecommendImageUrl("EMRYS.webp"), "Emrys", false, "object-cover object-center", { 
                    color: "transparent",
                    objectPosition: 'center center'
                  })}
                  fill
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  style={{ transform: 'scale(4) translateY(5px) translateX(-2px)' }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 relative flex flex-col h-full">
            {/* 左上角装饰SVG */}
            <div className="absolute top-4 left-4">
              <svg width="59" height="52" viewBox="0 0 59 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M22.4 29.7916V51.9916H0.199997V29.7916C0.199997 25.7916 0.63333 22.0249 1.5 18.4916C2.36666 14.9583 3.7 11.8583 5.5 9.1916C7.3 6.52493 9.6 4.3916 12.4 2.7916C15.2 1.1916 18.4667 0.391602 22.2 0.391602V10.3916C19.9333 10.3916 18.0667 10.9583 16.6 12.0916C15.1333 13.2249 13.9333 14.7249 13 16.5916C12.0667 18.4583 11.4333 20.5583 11.1 22.8916C10.7667 25.2249 10.6 27.5249 10.6 29.7916H22.4ZM59 29.7916V51.9916H36.8V29.7916C36.8 25.7916 37.2333 22.0249 38.1 18.4916C38.9667 14.9583 40.3 11.8583 42.1 9.1916C43.9 6.52493 46.2 4.3916 49 2.7916C51.8 1.1916 55.0667 0.391602 58.8 0.391602V10.3916C56.5333 10.3916 54.6667 10.9583 53.2 12.0916C51.7333 13.2249 50.5333 14.7249 49.6 16.5916C48.6667 18.4583 48.0333 20.5583 47.7 22.8916C47.3667 25.2249 47.2 27.5249 47.2 29.7916H59Z" fill="#7DA84C"/>
              </svg>
            </div>
            
            {/* 评价内容 */}
            <p className="font-normal text-[14px] text-black leading-[24px] pl-16 pt-12 flex-1">
              {t.testimonials.reviews.williamson.content}
            </p>
            
            {/* 底部用户信息 */}
            <div className="flex items-center justify-end mt-auto">
              <div className="text-right mr-4">
                <h4 className="font-bold text-black text-[18px]">{t.testimonials.reviews.williamson.name}</h4>
                <p className="text-[#838383] text-[12px]">{t.testimonials.reviews.williamson.university}</p>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image 
                  {...getOptimizedImageProps(getRecommendImageUrl("Williamson.webp"), "Williamson", false, "object-cover object-center", { 
                    color: "transparent"
                  })}
                  fill
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  style={{ 
                    transform: 'scale(2) translateY(1px) translateX(-1px)',
                    objectPosition: 'center -5%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
