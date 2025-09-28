'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageProvider';
import { useTranslations } from '../lib/translations';

interface HeroCarouselProps {
  slides: Array<{
    image: string;
    title?: string;
    subtitle?: string;
    cta?: string;
  }>;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const HeroCarouselSimple = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000
}: HeroCarouselProps) => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fullpage 滚动效果
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 200], ['100vh', '0vh']);
  const opacity = useTransform(scrollY, [0, 100, 200], [1, 0.8, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);
  const y = useTransform(scrollY, [0, 200], [0, -50]);
  
  // 平滑动画
  const smoothHeight = useSpring(height, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const smoothOpacity = useSpring(opacity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const smoothScale = useSpring(scale, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 鼠标悬停时暂停自动播放
  const [isHovered, setIsHovered] = useState(false);
  
  // 自动播放功能
  useEffect(() => {
    if (!autoPlay || slides.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length, isHovered]);

  const currentSlideData = slides[currentSlide] || slides[0];


  return (
    <motion.div 
      className="relative w-full overflow-hidden -mt-[70px] pt-[70px] group"
      style={{
        height: smoothHeight,
        opacity: smoothOpacity,
        scale: smoothScale,
        y: smoothY
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 背景图片轮播 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={`/images/banner/${currentSlideData.image}`}
            alt={`Slide ${currentSlide + 1}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* 内容区域 - 调整到页面1/3位置 */}
      <div className="absolute inset-0 flex">
        <div className="relative z-10 w-full h-full">
          {/* 文案容器 - 调整到更合适的位置 */}
          <div className="absolute left-4 md:left-[84px] top-[120px] md:top-[180px] max-w-2xl">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 
                className="mb-3 sm:mb-4 text-white font-bold leading-tight"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.50)',
                  fontFamily: 'HarmonyOS Sans SC',
                  // 响应式字号：与社区列表页面保持一致
                  fontSize: 'clamp(32px, 5vw, 47px)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '1.1'
                }}
              >
                {(currentSlideData.title || t.hero.title).split('\n').map((line: string, index: number) => [
                  line,
                  index < (currentSlideData.title || t.hero.title).split('\n').length - 1 && <br key={`br-${index}`} />
                ])}
              </h1>
              
              <p 
                className="mt-4 sm:mt-6 md:mt-8 text-white leading-relaxed"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.50)',
                  fontFamily: 'HarmonyOS Sans SC',
                  // 响应式字号：与社区列表页面保持一致
                  fontSize: 'clamp(16px, 2.5vw, 18px)',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '1.5'
                }}
              >
                {currentSlideData.subtitle || t.hero.subtitle}
              </p>
              
              <div className="mt-4 sm:mt-6 md:mt-8">
                <button 
                  onClick={() => {
                    const contactElement = document.getElementById('contact');
                    if (contactElement) {
                      contactElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="bg-[#7da84c] h-[32px] sm:h-[36px] md:h-[40px] lg:h-[44px] px-3 sm:px-4 md:px-6 lg:px-8 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] lg:rounded-[22px] inline-flex items-center cursor-pointer focus:outline-none hover:bg-[#6d9340] transition-colors duration-200"
                >
                  <div 
                    className="text-white font-bold"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      // 响应式字号：小屏幕14px，中等屏幕15px，大屏幕16px，超大屏幕18px
                      fontSize: 'clamp(14px, 1.5vw, 18px)',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 'normal'
                    }}
                  >
                    {currentSlideData.cta || t.hero.cta}
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 导航指示器 - 响应式优化 */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 md:space-x-3 z-20">
        {slides.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* 左右导航箭头 - 响应式优化 */}
      <button
        onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
};

export default HeroCarouselSimple;
