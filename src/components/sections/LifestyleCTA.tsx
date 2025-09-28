'use client';

import React from 'react';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useTranslations } from '../../lib/translations';

const LifestyleCTA: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const handleContactClick = () => {
    if (typeof document !== 'undefined') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-[#7da84c] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <h2 
          className="font-bold text-white mb-6 sm:mb-8"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(24px, 5vw, 40px)',
            fontWeight: 700,
            lineHeight: '1.2'
          }}
        >
          {t.lifestyle.title}
        </h2>
        <button 
          onClick={handleContactClick}
          className="bg-white h-[40px] sm:h-[50px] rounded-[20px] sm:rounded-[25.5px] px-6 sm:px-8 mx-auto flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div 
            className="font-bold text-[#7da84c] whitespace-nowrap"
            style={{
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: 'clamp(16px, 3vw, 20px)',
              fontWeight: 700
            }}
          >
            {t.lifestyle.cta}
          </div>
        </button>
      </div>
    </div>
  );
};

export default LifestyleCTA;
