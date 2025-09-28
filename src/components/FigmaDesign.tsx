'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import HeroCarouselSimple from './HeroCarouselSimple';
import { useLanguage } from '../contexts/LanguageProvider';
import { useTranslations } from '../lib/translations';

// 导入所有子组件
import FeatureCards from './sections/FeatureCards';
import CommunityLocation from './sections/CommunityLocation';
import LifestyleCTA from './sections/LifestyleCTA';
import FoodSection from './sections/FoodSection';
import ServicesSection from './sections/ServicesSection';
import EventsSection from './sections/EventsSection';
import TestimonialsSection from './sections/TestimonialsSection';

export default function FigmaDesign() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  // 定义轮播幻灯片数据，使用翻译配置
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

  // 根据路径选择不同的轮播数据
  const getHeroSlides = () => {
    // 所有页面都显示三张轮播图
    return heroSlides;
  };

  return (
    <div className="bg-white relative w-full min-h-screen" data-name="画板备份" data-node-id="0:2">
      {/* 英雄轮播区域 */}
      <HeroCarouselSimple 
        slides={getHeroSlides()}
        autoPlay={true}
        autoPlayInterval={5000}
      />

      {/* 特色卡片区域 */}
      <FeatureCards />

      {/* 社区位置部分 */}
      <CommunityLocation />

      {/* 生活方式选择部分 */}
      <LifestyleCTA />

      {/* 美食部分 */}
      <FoodSection />

      {/* 服务支持部分 */}
      <ServicesSection />

      {/* 活动部分 */}
      <EventsSection />

      {/* 用户评价部分 */}
      <TestimonialsSection />
    </div>
  );
}