'use client';

import React from 'react';
import HeroCarouselSimple from '@/components/HeroCarouselSimple';
import { useLanguage } from '@/contexts/LanguageProvider';
import { useTranslations } from '@/lib/translations';

export default function TestCarouselPage() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  const heroSlides = [
    {
      image: 'about1.png',
      title: t.hero.slides.slide1.title,
      subtitle: t.hero.slides.slide1.subtitle,
      cta: t.hero.slides.slide1.cta
    },
    {
      image: 'about2.jpg',
      title: t.hero.slides.slide2.title,
      subtitle: t.hero.slides.slide2.subtitle,
      cta: t.hero.slides.slide2.cta
    },
    {
      image: 'about3.jpg',
      title: t.hero.slides.slide3.title,
      subtitle: t.hero.slides.slide3.subtitle,
      cta: t.hero.slides.slide3.cta
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeroCarouselSimple 
        slides={heroSlides}
        autoPlay={true}
        autoPlayInterval={3000}
      />
      
      <div className="p-8 text-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">轮播测试页面</h2>
        <p className="text-gray-600">
          如果您能看到全屏轮播图片在自动切换，说明轮播功能正常工作。
        </p>
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">功能测试</h3>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li>✅ 全屏轮播显示</li>
            <li>✅ 自动播放切换</li>
            <li>✅ 手动导航控制</li>
            <li>✅ 触摸手势支持</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
