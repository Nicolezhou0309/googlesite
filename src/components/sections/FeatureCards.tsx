'use client';

import React from 'react';
import Image from 'next/image';
import { getOptimizedImageProps } from '../../lib/imageOptimization';
import { getIconImageUrl } from '../../lib/imageConfig';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useTranslations } from '../../lib/translations';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="h-[140px] sm:h-[160px] lg:h-[184px] w-full p-3 sm:p-4 lg:p-6 text-center flex flex-col items-center justify-center">
      <div className="mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
        {icon}
      </div>
      <h3 
        className="mb-1 sm:mb-2"
        style={{
          color: '#333333',
          fontFamily: 'HarmonyOS Sans SC',
          fontSize: 'clamp(14px, 2.5vw, 20px)',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '1.2'
        }}
      >
        {title}
      </h3>
      <p 
        style={{
          color: '#333',
          fontFamily: 'HarmonyOS Sans SC',
          fontSize: 'clamp(11px, 1.8vw, 14px)',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '1.3'
        }}
      >
        {description}
      </p>
    </div>
  );
};

const FeatureCards: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  const features = [
    {
      icon: (
        <div className="w-12 h-12">
          <Image {...getOptimizedImageProps(getIconImageUrl("Government Certified.svg"), "Government Certified")} width={48} height={48} style={{ width: "100%", height: "auto" }} />
        </div>
      ),
      title: t.features.governmentCertified.title,
      description: t.features.governmentCertified.description
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#7DA84C]" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M914.8 374.1c-8.6-18.6-27.8-29.8-57.1-33.3-22-2.6-50.6-1-85 4.8l0.5 2.7a331.43 331.43 0 0 0-42.8-52.6c-30.3-30.3-65.6-54.1-104.9-70.7-40.7-17.3-84-26-128.5-26s-87.8 8.7-128.5 25.9c-39.3 16.6-74.6 40.4-104.9 70.7s-54.1 65.6-70.7 104.9c-17.2 40.7-25.9 84-25.9 128.5 0 30.2 4 59.8 12 88.4-26 21.2-45.8 41-59.1 58.9-20.2 27.2-25.7 51.3-16.4 71.5 9.4 20.5 31.7 31.9 66.2 34.1 4.2 0.3 8.6 0.4 13.2 0.4 24.2 0 53.8-3.7 88.3-10.9l1.5-0.3c28.2 26.2 60.4 47.1 95.9 62.1C409.2 850.3 452.5 859 497 859s87.8-8.7 128.5-25.9c39.3-16.6 74.6-40.4 104.9-70.7 30.3-30.3 54.1-65.6 70.7-104.9 17.2-40.7 25.9-84 25.9-128.5 0-4.8-0.1-9.7-0.3-14.5 31.8-24.7 55.7-47.6 71-68 20.7-27.6 26.5-52 17.1-72.4zM497 247c143 0 261.4 107 279.6 245.1-62.1 45-145.7 92.4-237.1 134.6-89.5 41.2-177.8 73.3-251.4 91.5C242.7 668.1 215 601.7 215 529c0-155.5 126.5-282 282-282zM179.1 734.2c-21.5-0.4-30.2-4.8-32-6.6-0.2-2.3 1.9-11 13.8-26.1 8.5-10.8 20.6-23 35.5-36.1 10.3 22.8 23.2 44.1 38.3 63.9-21.5 3.5-40.4 5.2-55.6 4.9zM497 811c-62.2 0-119.7-20.2-166.3-54.4 69.5-19.6 148.7-49.4 228.9-86.3 82.1-37.8 157.9-79.8 218.7-120.8C767.7 695.4 645.6 811 497 811z m358.3-388.3c-8.8 10.8-21 22.9-35.9 35.7-4.3-19.8-10.4-39.1-18.4-57.9-1.4-3.4-2.9-6.7-4.5-10 20.6-2.8 38-3.6 51.7-2.4 16.8 1.4 21.9 5.3 22.8 6.1 0.3 2.5-2.1 12-15.7 28.5z"/>
          <path d="M460.7 361.8c1.3 0 2.7-0.1 4-0.4 16-3.3 32.5-4.4 49-3.4 11 0.7 20.5-7.7 21.2-18.7 0.7-11-7.7-20.5-18.7-21.2-20-1.2-40 0.2-59.4 4.1-10.8 2.2-17.8 12.8-15.6 23.6 1.9 9.5 10.2 16 19.5 16zM293.7 542.4c0.7 0.1 1.5 0.1 2.2 0.1 10.1 0 18.7-7.6 19.9-17.8 6.6-59.7 41.7-113 94.1-142.7 9.6-5.4 13-17.7 7.5-27.3-5.4-9.6-17.7-13-27.3-7.5-63.5 36-106.2 100.7-114.2 173.1-1.1 11 6.8 20.9 17.8 22.1zM756.1 238c29.2 0 53-23.8 53-53s-23.8-53-53-53-53 23.8-53 53 23.8 53 53 53z m0-76c12.7 0 23 10.3 23 23s-10.3 23-23 23-23-10.3-23-23 10.3-23 23-23z"/>
        </svg>
      ),
      title: t.features.designedForGenZ.title,
      description: t.features.designedForGenZ.description
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#7DA84C]" fill="none" viewBox="0 0 49 40">
          <path d="M1.46496 38.5308H47.535" stroke="#7DA84C" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12.6179 15.4929H21.3694" stroke="#7DA84C" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12.6179 21.9288H21.3694" stroke="#7DA84C" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12.6179 28.3646H21.3694" stroke="#7DA84C" strokeWidth="2" strokeLinecap="round"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M6 11.2917C6 9.59857 7.06602 8.08882 8.66158 7.52229L25.3308 1.60352C26.6327 1.14126 28 2.10673 28 3.48824V38.5308H6L6 11.2917Z" stroke="#7DA84C" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M28 12.6558H40C41.6569 12.6558 43 13.9989 43 15.6558V38.5308H28V12.6558Z" stroke="#7DA84C" strokeWidth="2"/>
        </svg>
      ),
      title: t.features.fiveCommunities.title,
      description: t.features.fiveCommunities.description
    },
    {
      icon: (
        <svg className="w-12 h-12 text-[#7DA84C]" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M736 531.2l-25.6 44.8c83.2 44.8 128 134.4 128 224l51.2 0C889.6 691.2 832 588.8 736 531.2zM505.6 128C390.4 128 300.8 224 300.8 339.2c0 76.8 38.4 140.8 96 179.2C281.6 556.8 192 672 192 806.4l51.2 0c0-140.8 121.6-262.4 268.8-262.4 115.2 0 211.2-96 211.2-211.2S620.8 128 505.6 128zM505.6 492.8c-83.2 0-153.6-70.4-153.6-153.6 0-83.2 70.4-153.6 153.6-153.6 83.2 0 153.6 70.4 153.6 153.6C665.6 422.4 595.2 492.8 505.6 492.8zM883.2 364.8c0-89.6-70.4-166.4-166.4-166.4 6.4 12.8 19.2 32 25.6 44.8 57.6 12.8 96 64 96 121.6 0 70.4-57.6 128-128 128-12.8 19.2-25.6 32-38.4 44.8 12.8 0 25.6-6.4 38.4-6.4C806.4 531.2 883.2 454.4 883.2 364.8zM902.4 518.4l-19.2 38.4c64 38.4 102.4 108.8 102.4 179.2L1024 736C1024 646.4 979.2 563.2 902.4 518.4zM0 736l44.8 0c0-76.8 38.4-147.2 102.4-179.2L121.6 518.4C44.8 563.2 0 646.4 0 736zM345.6 531.2C332.8 518.4 320 505.6 307.2 486.4c-70.4 0-128-57.6-128-128 0-57.6 44.8-108.8 96-121.6C288 224 294.4 211.2 300.8 192c-89.6 0-166.4 76.8-166.4 166.4 0 89.6 76.8 166.4 166.4 166.4C320 531.2 332.8 531.2 345.6 531.2z"/>
        </svg>
      ),
      title: t.features.thirtyThousandHouseholds.title,
      description: t.features.thirtyThousandHouseholds.description
    }
  ];

  return (
    <div className="bg-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* 标题 */}
        <h2 
          className="text-center mb-6 sm:mb-8 md:mb-16"
          style={{
            color: '#333333',
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(24px, 5vw, 40px)',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '1.2'
          }}
        >
          {t.features.title}
        </h2>

        {/* 特色卡片 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
