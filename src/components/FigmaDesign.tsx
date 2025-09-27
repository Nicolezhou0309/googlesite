'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// 使用自定义图标替换 Ant Design 图标
// import { HomeOutlined, RobotOutlined, TeamOutlined, SafetyCertificateOutlined, WechatOutlined } from '@ant-design/icons';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import dynamic from 'next/dynamic';
// 使用自定义轮播组件
import { Carousel } from './ui/carousel';
import { getOptimizedImageProps, handleImageError, handleImageLoad } from '../lib/imageOptimization';
import { 
  getOSSImageUrl, 
  getBannerImageUrl, 
  getRestaurantImageUrl, 
  getEventImageUrl,
  getIconImageUrl,
  getRecommendImageUrl,
  getLogoImageUrl
} from '../lib/imageConfig';



// 声明Google Maps类型
declare global {
  interface Window {
    google: any;
  }
}

// Google Maps配置
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Google地图组件
const MapComponent = ({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) => {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);

  const ref = React.useRef<HTMLDivElement>(null);

  // 检查API Key
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Google Maps API Key未配置</p>
      </div>
    );
  }

  // 社区位置数据
  const communityLocations = [
    {
      position: { lat: 31.067197, lng: 121.523561 }, // 浦江中心微领地青年社区
      title: "Pujiang Center Vlinker Youth Community",
      description: "Located on Kanghua Road<br/>Modern youth community<br/>Convenient transportation access"
    },
    {
      position: { lat: 31.061538, lng: 121.506352 }, // 浦江公园微领地青年社区
      title: "Pujiang Park Vlinker Youth Community",
      description: "Located on Changlin Road<br/>Near Pujiang Park<br/>Modern youth community"
    },
    {
      position: { lat: 31.243580, lng: 121.315428 }, // 北虹桥国际微领地青年社区
      title: "North Hongqiao International Vlinker Youth Community", 
      description: "Located in Jiading District<br/>20 mins to Hongqiao Hub<br/>Easy access to high-speed rail & airport"
    },
    {
      position: { lat: 31.311276, lng: 121.446857 }, // 新静安中心微领地青年社区
      title: "New Jing'an Center Vlinker Youth Community",
      description: "Located on Linfen Road<br/>Modern youth community<br/>Convenient transportation access"
    },
    {
      position: { lat: 31.291858, lng: 121.419637 }, // 中环沪太路微领地青年社区
      title: "Middle Ring Hutai Road Vlinker Youth Community",
      description: "Located on Hutai Road<br/>Modern youth community<br/>Convenient transportation access"
    }
  ];


  React.useEffect(() => {
    if (ref.current && !map && typeof window !== 'undefined' && window.google && window.google.maps) {
      console.log('Loading communities:', communityLocations);
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        language: 'en',
        region: 'US',
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        // 移除mapId以避免Advanced Markers错误，使用传统标记
        // 强制英文显示
        gestureHandling: 'greedy',
        clickableIcons: true,
        disableDefaultUI: false,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f5f5f5' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9c9c9' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#757575' }]
          }
        ]
      });
      setMap(newMap);

      // 添加社区位置标记 - 使用新的 AdvancedMarkerElement
      const newMarkers = communityLocations.map((location) => {
        // 创建自定义标记元素
        const markerElement = typeof document !== 'undefined' ? document.createElement('div') : null;
        if (markerElement) {
          markerElement.innerHTML = `
          <div style="
            width: 32px;
            height: 32px;
            position: relative;
            cursor: pointer;
          ">
            <div style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #7da84c;
              border: 2px solid white;
              position: absolute;
              top: 8px;
              left: 8px;
              z-index: 2;
            "></div>
            <div style="
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: #7da84c;
              opacity: 0;
              position: absolute;
              top: 9px;
              left: 9px;
              animation: pulse-wave 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
              transform-origin: 7px 7px;
            "></div>
            <div style="
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: #7da84c;
              opacity: 0;
              position: absolute;
              top: 9px;
              left: 9px;
              animation: pulse-wave 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
              animation-delay: 0.3s;
              transform-origin: 7px 7px;
            "></div>
          </div>
        `;
        }
        
        // 添加动画样式（如果还没有添加）
        if (typeof document !== 'undefined' && !document.getElementById('marker-pulse-styles')) {
          const style = document.createElement('style');
          style.id = 'marker-pulse-styles';
          style.textContent = `
            @keyframes pulse-wave {
              from {
                transform: scale(1);
                opacity: 0.7;
              }
              to {
                transform: scale(2.5);
                opacity: 0;
              }
            }
          `;
          document.head.appendChild(style);
        }

        // 使用传统 Marker，避免 AdvancedMarkerElement 的 Map ID 要求
        let marker;
        console.log('使用传统 Marker 创建标记:', location.title);
        marker = new window.google.maps.Marker({
          position: location.position,
          map: newMap,
          title: location.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="8" fill="#7da84c" stroke="white" stroke-width="2"/>
                <circle cx="16" cy="16" r="4" fill="#7da84c" opacity="0.7">
                  <animate attributeName="r" values="4;12;4" dur="1.2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="1.2s" repeatCount="indefinite"/>
                </circle>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 16)
          }
        });

        // 添加信息窗口
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #7da84c; font-size: 16px; font-weight: bold;">${location.title}</h3>
              <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.4;">${location.description}</p>
            </div>
          `
        });

        // 点击标记显示信息窗口
        if (marker) {
          marker.addListener('click', () => {
            infoWindow.open(newMap, marker);
          });
        }

        return { marker, infoWindow };
      });

      setMarkers(newMarkers);
    }
  }, [ref, map, center, zoom]);

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
};

// 地图渲染器
const render = (status: Status): React.ReactElement => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700 mb-2">Loading map...</div>
            <div className="text-sm text-gray-500">Please wait</div>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700 mb-2">Map loading failed</div>
            <div className="text-sm text-gray-500">Please check your network connection</div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700 mb-2">准备加载地图...</div>
          </div>
        </div>
      );
  }
};

// 图片资源常量 - 使用OSS地址
const img2720 = getBannerImageUrl("bb99baef700187de7fcda0109a4009493acabdb9.webp");
const img9F6Cb0B90260A921Fcb08D31A40A4EabOrigin1 = getRestaurantImageUrl("Qiantangqiuhe", "a9ab380538d3cd574b54a77ffd0a4fda41b421f5.webp");
const imgWechatImg485 = getEventImageUrl("cocktail", "95afa6835184f7e964de7ca5b67d6101bd94bc35.webp");
const img2602 = getOSSImageUrl("/images/communities/pujiang-park/公区/共享厨房/b420e94ff595b328cc2ee389cfac06458035250d.webp");
const img80B0E79Ad1B0042Dae080A52Bfe50880Origin1 = getRestaurantImageUrl("MasMuslim Restaurant", "1.webp");
const img2111 = getOSSImageUrl("/images/communities/pujiang-center/公区/共享厨房/15大.webp");
const img40C2F7E838D68721A9E5223162C28921Origin1 = getRestaurantImageUrl("LiuzhouLuosifen", "016f8b07a3709e154a1f4a76a3a56475d2f1d043.webp");
const img2389 = getOSSImageUrl("/images/communities/pujiang-park/外立面/3185d165e0f68d237c147ca5bd2c732c7111a9b7.webp");
const imgDscf6118 = getOSSImageUrl("/images/communities/jingan-center/外立面/9561b58386b5f261a605fde44656ff0ce9311ed9.webp");
const imgWldSj35743 = getOSSImageUrl("/images/communities/north-hongqiao/外立面/NORTHHONGQIAOCOMMUNITY.webp");

// 餐厅菜品图片
const qiantangqiuheDishes: string[] = [];

const masMuslimDishes = [
  getRestaurantImageUrl("MasMuslim Restaurant", "060feceac1df77831e6ac0f2ad1201e6.webp"),
  getRestaurantImageUrl("MasMuslim Restaurant", "1.webp"),
  getRestaurantImageUrl("MasMuslim Restaurant", "721363058ca26e9b5ea49c30b373ed9c.webp")
];

const liuzhouLuosifenDishes = [
  getRestaurantImageUrl("LiuzhouLuosifen", "06f8cf6ca6e094f2736a23acb846051f.webp"),
  getRestaurantImageUrl("LiuzhouLuosifen", "4121e59731f5c4a97bd9e75b6faa0b87.webp"),
  getRestaurantImageUrl("LiuzhouLuosifen", "a4e8b80434614d26fc191b1153b1e6fd.webp")
];

const foodSharingFairImages = [
  getEventImageUrl("FoodSharingFair", "1.webp"),
  getEventImageUrl("FoodSharingFair", "2.webp"),
  getEventImageUrl("FoodSharingFair", "3.webp")
];

const freshmanPartyImages = [
  getEventImageUrl(" Freshman Party", "1.webp"),
  getEventImageUrl(" Freshman Party", "2.webp"),
  getEventImageUrl(" Freshman Party", "3.webp"),
  getEventImageUrl(" Freshman Party", "4.webp")
];

const cocktailGatheringImages = [
  getEventImageUrl("cocktail", "95afa6835184f7e964de7ca5b67d6101bd94bc35.webp")
];




// 餐厅图片轮播组件（使用Ant Design Carousel）
const RestaurantCarousel = ({ 
  facadeImage, 
  dishes, 
  restaurantName
}: { 
  facadeImage: string; 
  dishes: string[]; 
  restaurantName: string;
}) => {
  const allImages = [facadeImage, ...dishes];

  return (
    <div className="w-full h-64">
        <Carousel
        images={allImages}
        autoplay
        autoplaySpeed={4000}
        dots={true}
        effect="fade"
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
      </Carousel>
    </div>
  );
};

// 活动图片轮播组件
const EventCarousel = ({ 
  images, 
  eventName
}: { 
  images: string[]; 
  eventName: string;
}) => {
  return (
    <div className="w-full h-64">
        <Carousel
        images={images}
        autoplay
        autoplaySpeed={4000}
        dots={true}
        effect="fade"
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
      </Carousel>
    </div>
  );
};

// 通用服务卡片组件
interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, isLast = false }) => {
  return (
    <div className={`bg-white w-[338px] h-[250px] flex-shrink-0 pl-10 pr-6 py-6 flex flex-col justify-center ${!isLast ? 'mr-8' : ''}`}>
      <div className="w-[45px] h-[45px] mb-6 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="w-[186px] h-[46px] font-medium text-black text-xl tracking-[0] leading-[normal] text-left">
        {title}
      </h3>
    </div>
  );
};

// 特色卡片图标现在使用Ant Design图标组件

// 服务数据定义
const services = [
  {
    title: "Daily Translation Assistance",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Daily Translation Assistance.svg"), "Daily Translation Assistance")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "SIM Card Registration",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("SIM Card Registration.svg"), "SIM Card Registration")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "Power Adapter Conversion",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Power Adapter Conversion.svg"), "Power Adapter Conversion")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "Travel and Commute Guide",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Travel and Commute Guide.svg"), "Travel and Commute Guide")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "Shared Bike Rentals",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Shared Bike Rentals.svg"), "Shared Bike Rentals")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "Local Food Recommendations",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Local Food Recommendations.svg"), "Local Food Recommendations")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "Travel Itinerary Suggestions",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Travel Itinerary Suggestions.svg"), "Travel Itinerary Suggestions")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "Restaurant Reservations",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Restaurant Reservations.svg"), "Restaurant Reservations")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "Local App Installation Assistance",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Local App Installation Assistance.svg"), "Local App Installation Assistance")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "Parcel Collection Service",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Parcel Collection Service.svg"), "Parcel Collection Service")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "Medical Appointment Assistance",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("Medical Appointment Assistance.svg"), "Medical Appointment Assistance")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  },
  {
    title: "24/7 In-House Maintenance",
    icon: <Image {...getOptimizedImageProps(getIconImageUrl("In-House Maintenance.svg"), "24/7 In-House Maintenance")} width={45} height={45} style={{ width: "45px", height: "45px" }} />
  }
];

export default function FigmaDesign() {

  // 图片优化由Next.js Image组件自动处理

  // 餐厅图片状态 - 使用OSS地址
  const qiantangqiuheImages: string[] = [
    getRestaurantImageUrl("Qiantangqiuhe", "e702f7e495ca93229d6e775e0ceee93f.webp")
  ];
  const masMuslimImages = [
    getRestaurantImageUrl("MasMuslim Restaurant", "060feceac1df77831e6ac0f2ad1201e6.webp"),
    getRestaurantImageUrl("MasMuslim Restaurant", "721363058ca26e9b5ea49c30b373ed9c.webp")
  ];
  const liuzhouLuosifenImages = [
    getRestaurantImageUrl("LiuzhouLuosifen", "06f8cf6ca6e094f2736a23acb846051f.webp"),
    getRestaurantImageUrl("LiuzhouLuosifen", "4121e59731f5c4a97bd9e75b6faa0b87.webp"),
    getRestaurantImageUrl("LiuzhouLuosifen", "a4e8b80434614d26fc191b1153b1e6fd.webp")
  ];
  




  return (
    <div className="bg-white relative w-full min-h-screen" data-name="画板备份" data-node-id="0:2">
      {/* 英雄区域 */}
      <div className="relative h-[400px] md:h-[600px] w-full" data-name="编组 10" data-node-id="0:43">
        <Image
          {...getOptimizedImageProps(img2720, "Hero background", true)}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-0 transition-opacity duration-300"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        
        <div className="absolute left-4 md:left-[84px] top-[50px] md:top-[105px] max-w-2xl">
          <h1 
            className="mb-4"
            style={{
              color: '#FFF',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.50)',
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '47px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal'
            }}
          >
            Find Your Vibe<br />
            Live Your Best Life
          </h1>
          <p 
            className="mt-8"
            style={{
              color: '#FFF',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.50)',
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal'
            }}
          >
            Experience the events, enjoy the service, belong to the community.
          </p>
          <div className="mt-8">
            <div className="bg-[#7da84c] h-[36px] md:h-[40px] px-4 md:px-6 rounded-[18px] md:rounded-[20px] inline-flex items-center">
              <div 
                style={{
                  color: '#FFF',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 'normal'
                }}
              >
                Explore Our Community
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* 标题 */}
          <h2 
            className="text-center mb-8 md:mb-16"
            style={{
              color: '#333333',
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '40px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal'
            }}
          >
            What is Vlinker Youth Community?
          </h2>

          {/* 特色卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-16">
            <div className=" h-[184px] w-[271px] mx-auto  p-6 text-center flex flex-col items-center justify-center">
              <div className="mx-auto mb-4 flex items-center justify-center relative w-12 h-12">
                <Image {...getOptimizedImageProps(getIconImageUrl("Government Certified.svg"), "Government Certified")} width={48} height={48} style={{ width: "48px", height: "auto" }} />
              </div>
              <h3 
                className="mb-2 whitespace-nowrap"
                style={{
                  color: '#333333',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal'
                }}
              >
                Government Certified
              </h3>
              <p 
                className="whitespace-nowrap"
                style={{
                  color: '#333',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal'
                }}
              >
                Officially certified talent apartment
              </p>
            </div>
            <div className=" h-[184px] w-[271px] mx-auto  p-6 text-center flex flex-col items-center justify-center">
              <div className="w-8 h-8 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#7DA84C]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z"/>
                </svg>
              </div>
              <h3 
                className="mb-2 whitespace-nowrap"
                style={{
                  color: '#333333',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal'
                }}
              >
                Designed for the Gen Z
              </h3>
              <p 
                className="whitespace-nowrap"
                style={{
                  color: '#333',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal'
                }}
              >
                A Young & Dynamic Community
              </p>
            </div>
            <div className=" h-[184px] w-[271px] mx-auto  p-6 text-center flex flex-col items-center justify-center">
              <div className="w-8 h-8 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#7DA84C]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <h3 
                className="mb-2 whitespace-nowrap"
                style={{
                  color: '#333333',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal'
                }}
              >
                Five Communities
              </h3>
              <p 
                className="whitespace-nowrap"
                style={{
                  color: '#333',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal'
                }}
              >
                Covering the core area of Shanghai
              </p>
            </div>
            <div className=" h-[184px] w-[271px] mx-auto  p-6 text-center flex flex-col items-center justify-center">
              <div className="w-8 h-8 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#7DA84C]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5v7.5h2v6h4zm-6.5-18c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM6.5 6C7.33 6 8 6.67 8 7.5S7.33 9 6.5 9 5 8.33 5 7.5 5.67 6 6.5 6zm1.5 3h-1c-.83 0-1.5-.67-1.5-1.5S6.17 6 7 6h1c.83 0 1.5.67 1.5 1.5S8.83 9 8 9zm2.5 3c-.83 0-1.5-.67-1.5-1.5S9.67 9 10.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <h3 
                className="mb-2 whitespace-nowrap"
                style={{
                  color: '#333333',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal'
                }}
              >
                30,000+ households
              </h3>
              <p 
                className="whitespace-nowrap"
                style={{
                  color: '#333',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal'
                }}
              >
                The Trusted Choice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 社区位置部分 */}
      <div className="bg-[#f4f4f4] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="w-full max-w-[440px] mb-8">
            <p 
              className="[font-family:'HarmonyOS_Sans_SC-Bold',Helvetica] font-bold text-[#7da84c] text-[40px] tracking-[0] leading-[52px] text-left"
            >
              Less Time Commuting, <br />
              More Energy Exploring
            </p>
          </div>
          
          {/* 描述文本 */}
          <div className="w-full mb-16">
            <p className="text-gray-600 text-[16px] md:text-[18px] text-left leading-[1.6]">
              Our communities are positioned near the universities in Shanghai. For
              added convenience, we offer exclusive shuttle services directly to
              campus. Just dive deeper into your studies and discover your life
              abroad.
            </p>
          </div>
          
          {/* 地图部分 */}
          <div className="relative mb-16">
            <div className="relative w-full h-[546px] bg-gray-200 rounded-lg overflow-hidden">
              {/* Google地图 */}
              <Wrapper 
                apiKey={GOOGLE_MAPS_API_KEY} 
                render={render}
                libraries={['places', 'marker']}
                version="weekly"
                language="en"
                region="US"
              >
                <MapComponent 
                  key="vlinker-communities-map"
                  center={{ lat: 31.22, lng: 121.40 }} 
                  zoom={11} 
                />
              </Wrapper>
              
              {/* 地图说明 */}
              <div 
                className="absolute top-4 right-4 px-3 py-1 bg-white bg-opacity-90 rounded text-xs shadow-md z-10"
                style={{
                  color: '#666666',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '12px',
                  fontWeight: 400
                }}
              >
                Click markers for details
              </div>
            </div>
          </div>
          
          {/* 社区卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 静安中心社区卡片 */}
            <div className="relative">
              <div className="bg-white  shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="relative h-80">
                  <Image
                    {...getOptimizedImageProps(imgDscf6118, "Jing'an Community")}
                    fill
                    className="object-cover"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="p-6">
                  <h3 
                    className="mb-2"
                    style={{
                      color: '#7da84c',
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: '24px',
                      fontWeight: 700,
                      lineHeight: 'normal'
                    }}
                  >
                    Jing'an Center Community
                  </h3>
                  <p 
                    className="mb-4 text-gray-600"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 'normal'
                    }}
                  >
                    Live in the fast lane. Own the city's pulse.
                  </p>
                  <div 
                    className="space-y-2"
                    style={{
                      color: '#333333',
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: '14px',
                      fontWeight: 300,
                      lineHeight: '24px'
                    }}
                  >
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("clock.svg"), "clock")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      10 mins to Joy City (Shanghai's Akihabara)
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("clock.svg"), "clock")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      20 mins to Jing'an Temple
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("clock.svg"), "clock")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      30 mins to the Bund
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 北虹桥社区卡片 */}
            <div className="relative">
              <div className="bg-white  shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="relative h-80">
                  <Image
                    {...getOptimizedImageProps(imgWldSj35743, "Hongqiao Community")}
                    fill
                    className="object-cover"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="p-6">
                  <h3 
                    className="mb-2"
                    style={{
                      color: '#7da84c',
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: '24px',
                      fontWeight: 700,
                      lineHeight: 'normal'
                    }}
                  >
                    North Hongqiao Community
                  </h3>
                  <p 
                    className="mb-4 text-gray-600"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 'normal'
                    }}
                  >
                    Escape the hustle. Discover your weekend rhythm.
                  </p>
                  <div 
                    className="space-y-2"
                    style={{
                      color: '#333333',
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: '14px',
                      fontWeight: 300,
                      lineHeight: '24px'
                    }}
                  >
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("clock.svg"), "clock")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      20 mins to Hongqiao Hub
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center relative w-4 h-4">
                        <Image {...getOptimizedImageProps(getIconImageUrl("suitcase.svg"), "suitcase")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      Easy access to high-speed rail & airport
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("sign.svg"), "sign")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      Ideal for weekend escapes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 生活方式选择部分 */}
      <div className="bg-[#7da84c] py-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="font-bold text-white text-[40px] mb-8">
            Which lifestyle suits you?
          </h2>
          <button 
            onClick={() => {
              if (typeof document !== 'undefined') {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className="bg-white h-[50px] rounded-[25.5px] px-8 mx-auto flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            <div className="font-bold text-[#7da84c] text-[20px] whitespace-nowrap">
              Contact Us to Learn More
            </div>
          </button>
        </div>
      </div>

      {/* 美食部分 */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="w-full mb-8">
            <p className="font-bold text-[#7da84c] text-[32px] md:text-[40px] text-left leading-[1.3] tracking-[0] mb-6">
              Taste True Flavors of China, <br />
              Just Steps Away
            </p>
            <p className="text-gray-600 text-[16px] md:text-[18px] text-left leading-[1.6]">
              Wander into authentic local eateries and trendy cafes—all right in your neighborhood.
            </p>
          </div>
          
          <div className="flex overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-6 md:gap-8">
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[500px] flex flex-col">
                {/* 餐厅图片轮播（门面照片 + 菜品图片） */}
                <RestaurantCarousel 
                  facadeImage={img9F6Cb0B90260A921Fcb08D31A40A4EabOrigin1}
                  dishes={qiantangqiuheImages} 
                  restaurantName="Qiantangqiuhe"
                />
                <div className="p-6 flex flex-col h-[216px]">
                  <h3 className="font-medium text-black text-[20px] mb-4 flex-shrink-0">
                  The autumn lotus（Shanghai recipes）
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <p className="font-normal text-[14px] text-black leading-relaxed">
                      Cuisine: Traditional Shanghainese Benbang Cuisine<br />
                      Description: Discover the classic flavors of old Shanghai in a modern setting. Qiantang Autumn Lotus specializes in rich, savory, and slightly sweet Benbang dishes. Their roast duck is a must-try, famous for its crispy skin and tender meat.<br />
                      Location: New Jing'an Center Community<br />
                      Must-Try Dishes: Roast Duck, Braised Pork Belty (Hong Shao Rou), Sweet and Sour Spareribs
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[500px] flex flex-col">
                {/* 餐厅图片轮播（门面照片 + 菜品图片） */}
                <RestaurantCarousel 
                  facadeImage={img80B0E79Ad1B0042Dae080A52Bfe50880Origin1}
                  dishes={masMuslimImages} 
                  restaurantName="Ma's Muslim Restaurant"
                />
                <div className="p-6 flex flex-col h-[216px]">
                  <h3 className="font-medium text-black text-[20px] mb-4 flex-shrink-0">
                    Ma's Muslim Restaurant: Third-Generation Noodle & Lamb Specialists
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <p className="font-normal text-[14px] text-black leading-relaxed">
                      Cuisine: Northwest Chinese / Halal<br />
                      Description: A family-run restaurant with over three generations of history. They have their own exclusive supply chain for premium Ningxia Tan Lamb, known for being tender, flavorful, and without any gamey taste.<br />
                      Location: New Jing'an Center Community<br />
                      Must-Try Dishes: Hand-Torn Ningxia Lamb, Big Plate Chicken, Lamb Skewers
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[500px] flex flex-col">
                {/* 餐厅图片轮播（门面照片 + 菜品图片） */}
                <RestaurantCarousel 
                  facadeImage={img40C2F7E838D68721A9E5223162C28921Origin1}
                  dishes={liuzhouLuosifenImages} 
                  restaurantName="Auntie Fatty's"
                />
                <div className="p-6 flex flex-col h-[216px]">
                  <h3 className="font-medium text-black text-[20px] mb-4 flex-shrink-0">
                    Auntie Fatty's: Liuzhou Luosifen
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <p className="font-normal text-[14px] text-black leading-relaxed">
                      Cuisine: Guangxi Province Specialty<br />
                      Description: A bold and addictive dish for the adventurous eater! Luosifen is a rice noodle soup known for its spicy, sour broth and the distinctive aroma of fermented bamboo shoots.<br />
                      Location: New Jing'an Center Community<br />
                      Must-Try Dishes: Signature Luosifen (add a fried egg!), Cassava Syrup Dessert
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 服务支持部分 */}
      <div className="bg-[#f4f4f4] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <p className="font-bold text-[#7da84c] text-[32px] md:text-[40px] text-left leading-[1.3] tracking-[0] mb-6">
            Navigate Shanghai with Ease
          </p>
          <p className="text-gray-600 text-[16px] md:text-[18px] text-left leading-[1.6] mb-16">
            We help you settle in, connect, and unlock the best of city life. Here's how we support you:
          </p>
          
          <div className="flex overflow-x-auto pb-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                icon={service.icon}
                isLast={index === services.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 活动部分 */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-bold text-[#7da84c] text-[32px] md:text-[40px] text-left leading-[1.3] tracking-[0] mb-6">
            Connecting, Exploring,<br />
            and Thriving Together
          </h2>
          <p className="text-gray-600 text-[16px] md:text-[18px] text-left leading-[1.6] mb-16">
            More than just events, we weave your Shanghai story.<br />
            Build friendships and discover the city together, creating vibrant memories that feel like home.
          </p>
          
          <div className="flex overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-6 md:gap-8">
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[400px] flex flex-col">
                {/* 活动图片轮播 */}
                <EventCarousel 
                  images={cocktailGatheringImages} 
                  eventName="Weekly Cocktail Gatherings"
                />
                <div className="p-6 flex flex-col h-[156px]">
                  <h3 className="font-medium text-black text-[20px] mb-4 flex-shrink-0">
                    Weekly Cocktail Gatherings
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <p className="font-normal text-[14px] text-black leading-[26px]">
                      Relax and socialize with fellow residents in our lounge bar. Non-alcoholic options available.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[400px] flex flex-col">
                {/* 活动图片轮播 */}
                <EventCarousel 
                  images={foodSharingFairImages} 
                  eventName="Food Sharing Fair"
                />
                <div className="p-6 flex flex-col h-[156px]">
                  <h3 className="font-medium text-black text-[18px] mb-4 flex-shrink-0">
                     Food Sharing Fair
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <p className="font-normal text-[14px] text-black leading-[26px]">
                    Food brings us together! Share a taste of home, explore a world of flavors.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[400px] flex flex-col">
                {/* 活动图片轮播 */}
                <EventCarousel 
                  images={freshmanPartyImages} 
                  eventName="Freshman Party"
                />
                <div className="p-6 flex flex-col h-[156px]">
                  <h3 className="font-medium text-black text-[18px] mb-4 flex-shrink-0">
                  Freshman Party
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <p className="font-normal text-[14px] text-black leading-[26px]">
                    Our Welcome Party is your first warm gathering in your new home. Let's toast to new beginnings and become family.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 用户评价部分 */}
      <div className="bg-[#f4f4f4] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-bold text-[#7da84c] text-[32px] md:text-[40px] text-left leading-[1.3] tracking-[0] mb-6">
            They Live Here!
          </h2>
          <p className="text-gray-600 text-[16px] md:text-[18px] text-left leading-[1.6] mb-16">
            Get the real scoop from your future neighbors.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 relative flex flex-col h-full">
              {/* 左上角装饰SVG */}
              <div className="absolute top-4 left-4">
                <svg width="59" height="52" viewBox="0 0 59 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.4 29.7916V51.9916H0.199997V29.7916C0.199997 25.7916 0.63333 22.0249 1.5 18.4916C2.36666 14.9583 3.7 11.8583 5.5 9.1916C7.3 6.52493 9.6 4.3916 12.4 2.7916C15.2 1.1916 18.4667 0.391602 22.2 0.391602V10.3916C19.9333 10.3916 18.0667 10.9583 16.6 12.0916C15.1333 13.2249 13.9333 14.7249 13 16.5916C12.0667 18.4583 11.4333 20.5583 11.1 22.8916C10.7667 25.2249 10.6 27.5249 10.6 29.7916H22.4ZM59 29.7916V51.9916H36.8V29.7916C36.8 25.7916 37.2333 22.0249 38.1 18.4916C38.9667 14.9583 40.3 11.8583 42.1 9.1916C43.9 6.52493 46.2 4.3916 49 2.7916C51.8 1.1916 55.0667 0.391602 58.8 0.391602V10.3916C56.5333 10.3916 54.6667 10.9583 53.2 12.0916C51.7333 13.2249 50.5333 14.7249 49.6 16.5916C48.6667 18.4583 48.0333 20.5583 47.7 22.8916C47.3667 25.2249 47.2 27.5249 47.2 29.7916H59Z" fill="#7DA84C"/>
                </svg>
              </div>
              
              {/* 评价内容 */}
              <p className="font-normal text-[14px] text-black leading-[24px] pl-16 pt-12 flex-1">
                My name is Jules from Shanghai University. VLINKER offers incredible value – it's more affordable than other options, yet the apartments are modern and beautiful. The amenities are fantastic, and the staff are always welcoming and helpful.
              </p>
              
              {/* 底部用户信息 */}
              <div className="flex items-center justify-end mt-auto">
                <div className="text-right mr-4">
                  <h4 className="font-bold text-black text-[18px]">Jules</h4>
                  <p className="text-[#838383] text-[12px]">Shanghai University</p>
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
                I'm Emrys, studying at SISU. As a pet owner, I'm thrilled that VLINKER is pet-friendly. The regular events help me meet people from all over, and the neighborhood is a foodie's paradise with everything from hot pot to international cuisine.
              </p>
              
              {/* 底部用户信息 */}
              <div className="flex items-center justify-end mt-auto">
                <div className="text-right mr-4">
                  <h4 className="font-bold text-black text-[18px]">Emrys</h4>
                  <p className="text-[#838383] text-[12px]">SISU</p>
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
                My name is Williamson from the UK. I have a deep love for Chinese culture, and living at VLINKER has been unforgettable. The community events help me immerse in the culture, and the facilities and staff make it feel like a true home.
              </p>
              
              {/* 底部用户信息 */}
              <div className="flex items-center justify-end mt-auto">
                <div className="text-right mr-4">
                  <h4 className="font-bold text-black text-[18px]">Williamson</h4>
                  <p className="text-[#838383] text-[12px]">UK</p>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image 
                    {...getOptimizedImageProps(getRecommendImageUrl("Williamson.webp"), "Williamson", false, "object-cover object-center", { 
                      color: "transparent",
                      objectPosition: 'center center'
                    })}
                    fill
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
