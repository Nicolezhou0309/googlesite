'use client';

import React from 'react';
import Image from 'next/image';
import { getOptimizedImageProps } from '../../lib/imageOptimization';
import { getIconImageUrl } from '../../lib/imageConfig';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useTranslations } from '../../lib/translations';

// 通用服务卡片组件
interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  isLast?: boolean;
  index: number;
  key?: string;
}

const ServiceCard = ({ title, icon, isLast = false, index }: ServiceCardProps) => {
  return (
    <>
      {/* 大屏幕卡片布局 */}
      <div 
        className={`hidden sm:block bg-white flex-shrink-0 flex flex-col justify-center rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${!isLast ? 'mr-4 sm:mr-8' : ''}`}
        style={{
          width: 'clamp(240px, 25vw, 338px)',
          height: 'clamp(180px, 18.75vw, 250px)',
          padding: 'clamp(16px, 2.5vw, 24px)'
        }}
      >
        <div 
          className="flex items-center justify-center"
          style={{
            width: 'clamp(32px, 4vw, 45px)',
            height: 'clamp(32px, 4vw, 45px)',
            marginBottom: 'clamp(12px, 2.5vw, 24px)'
          }}
        >
          {icon}
        </div>
        <h3 
          className="font-medium text-black text-left"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(14px, 1.8vw, 20px)',
            fontWeight: 500,
            lineHeight: '1.3'
          }}
        >
          {title}
        </h3>
      </div>
      
      {/* 小屏幕双列布局 */}
      <div 
        className={`block sm:hidden flex items-center py-3 px-2 ${index % 2 === 0 ? 'mr-2' : ''}`}
        style={{
          width: 'calc(50% - 4px)',
          minHeight: '60px'
        }}
      >
        <div 
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: '32px',
            height: '32px',
            marginRight: '12px'
          }}
        >
          {icon}
        </div>
        <h3 
          className="font-medium text-black text-left flex-1"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '1.3'
          }}
        >
          {title}
        </h3>
      </div>
    </>
  );
};

const ServicesSection = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  // 服务数据定义
  const services = [
    {
      title: t.servicesNavigation.services.dailyTranslation,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Daily Translation Assistance.svg"), "Daily Translation Assistance")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.simCardRegistration,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("SIM Card Registration.svg"), "SIM Card Registration")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.powerAdapterConversion,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Power Adapter Conversion.svg"), "Power Adapter Conversion")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.travelGuide,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Travel and Commute Guide.svg"), "Travel and Commute Guide")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.sharedBikeRentals,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Shared Bike Rentals.svg"), "Shared Bike Rentals")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.localFoodRecommendations,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Local Food Recommendations.svg"), "Local Food Recommendations")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.travelItinerarySuggestions,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Travel Itinerary Suggestions.svg"), "Travel Itinerary Suggestions")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.restaurantReservations,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Restaurant Reservations.svg"), "Restaurant Reservations")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.localAppInstallation,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Local App Installation Assistance.svg"), "Local App Installation Assistance")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.parcelCollectionService,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Parcel Collection Service.svg"), "Parcel Collection Service")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.medicalAppointmentAssistance,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("Medical Appointment Assistance.svg"), "Medical Appointment Assistance")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    },
    {
      title: t.servicesNavigation.services.inHouseMaintenance,
      icon: <Image {...getOptimizedImageProps(getIconImageUrl("In-House Maintenance.svg"), "24/7 In-House Maintenance")} width={45} height={45} style={{ width: "45px", height: "auto" }} />
    }
  ];

  return (
    <div className="bg-[#f4f4f4] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <p 
          className="font-bold text-[#7da84c] text-left leading-[1.3] tracking-[0] mb-4 sm:mb-6"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(24px, 5vw, 40px)',
            fontWeight: 700
          }}
        >
          {t.servicesNavigation.title}
        </p>
        <p 
          className="text-gray-600 text-left leading-[1.6] mb-12 sm:mb-16"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 400
          }}
        >
          {t.servicesNavigation.subtitle}
        </p>
        
        {/* 大屏幕横向滚动布局 */}
        <div className="hidden sm:block">
          <div className="flex overflow-x-auto pb-4">
            {services.map((service, index) => {
              const { title, icon } = service;
              return (
                <ServiceCard
                  key={`desktop-${index}`}
                  title={title}
                  icon={icon}
                  isLast={index === services.length - 1}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        
        {/* 小屏幕双列布局 */}
        <div className="block sm:hidden">
          <div className="flex flex-wrap -mx-2">
            {services.map((service, index) => {
              const { title, icon } = service;
              return (
                <ServiceCard
                  key={`mobile-${index}`}
                  title={title}
                  icon={icon}
                  isLast={index === services.length - 1}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
