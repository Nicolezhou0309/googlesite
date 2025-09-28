'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { getBannerImageUrl } from '../lib/imageConfig';
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

const HeroCarousel = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000
}: HeroCarouselProps) => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Framer Motion scroll hooks
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100, 200], [1, 0.9, 0]);
  const scale = useTransform(scrollY, [0, 100, 200], [1, 0.98, 0.95]);
  const y = useTransform(scrollY, [0, 100, 200], [0, -50, -100]);
  
  // 平滑的动画效果
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

  // 自动播放功能
  useEffect(() => {
    if (!autoPlay || isScrolling || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length, isScrolling]);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // 切换幻灯片
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [currentSlide, isTransitioning]);

  // 手势支持
  const handleTouchStart = useRef({ x: 0, y: 0 });
  const handleTouchMove = useRef({ x: 0, y: 0 });

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleTouchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleTouchMove.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const onTouchEnd = () => {
    const deltaX = handleTouchStart.current.x - handleTouchMove.current.x;
    const deltaY = handleTouchStart.current.y - handleTouchMove.current.y;
    
    // 如果垂直滚动距离大于水平滚动距离，则认为是页面滚动
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }
    
    // 水平滑动切换幻灯片
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // 向左滑动，下一张
        goToSlide((currentSlide + 1) % slides.length);
      } else {
        // 向右滑动，上一张
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
      }
    }
  };

  // 键盘支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
      } else if (e.key === 'ArrowRight') {
        goToSlide((currentSlide + 1) % slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, goToSlide, slides.length]);

  const currentSlideData = slides[currentSlide] || slides[0];


  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden -mt-[70px] pt-[70px]"
      style={{
        opacity: smoothOpacity,
        scale: smoothScale,
        y: smoothY
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* 背景图片轮播 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0.0, 0.2, 1]
          }}
        >
          <Image
            src={getBannerImageUrl(currentSlideData.image)}
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

      {/* 内容区域 */}
      <div className="absolute inset-0 flex items-center">
        <div className="relative z-10 left-4 md:left-[84px] max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 
                className="mb-4 text-white text-5xl font-bold"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.50)',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '47px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              >
                {(currentSlideData.title || t.hero.title).split('\n').map((line: string, index: number) => [
                  line,
                  index < (currentSlideData.title || t.hero.title).split('\n').length - 1 && <br key={`br-${index}`} />
                ])}
              </h1>
              
              <p 
                className="mt-8 text-white text-lg"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.50)',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal'
                }}
              >
                {currentSlideData.subtitle || t.hero.subtitle}
              </p>
              
              <div className="mt-8">
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
                  className="bg-[#7da84c] h-[36px] md:h-[40px] px-4 md:px-6 rounded-[18px] md:rounded-[20px] inline-flex items-center cursor-pointer focus:outline-none hover:bg-[#6d9340] transition-colors duration-200"
                >
                  <div 
                    className="text-white text-base font-bold"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: '16px',
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
          </AnimatePresence>
        </div>
      </div>

      {/* 导航指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* 左右导航箭头 */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/70 text-sm"
        >
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroCarousel;
