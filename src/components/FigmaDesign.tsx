'use client';

import React, { useEffect, useState } from 'react';
import { HomeOutlined, RobotOutlined, TeamOutlined, SafetyCertificateOutlined, WechatOutlined } from '@ant-design/icons';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

// 自定义弹窗组件
const CustomModal = ({ isOpen, onClose, title, message, type = 'success' }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error';
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="flex items-center mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
            type === 'success' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {type === 'success' ? (
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              type === 'success' 
                ? 'bg-[#7da84c] text-white hover:bg-[#6a8f3f]' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// 声明Google Maps类型
declare global {
  interface Window {
    google: any;
  }
}

// Google Maps配置
const GOOGLE_MAPS_API_KEY = 'AIzaSyBlI82zF6CE4yU38I88Bn5M2PcP5NpU9yo';

// Google地图组件
const MapComponent = ({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) => {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);

  const ref = React.useRef<HTMLDivElement>(null);

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
    if (ref.current && !map && window.google && window.google.maps) {
      console.log('Loading communities:', communityLocations);
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        language: 'en',
        region: 'US',
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
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

      // 添加社区位置标记
      const newMarkers = communityLocations.map((location) => {
        const marker = new window.google.maps.Marker({
          position: location.position,
          map: newMap,
          title: location.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>
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
                    .pulse {
                      animation: pulse-wave 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
                      transform-origin: 16px 16px;
                    }
                    .pulse-delayed {
                      animation: pulse-wave 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
                      animation-delay: 0.3s;
                      transform-origin: 16px 16px;
                    }
                  </style>
                </defs>
                <!-- 中心圆点 -->
                <circle cx="16" cy="16" r="8" fill="#7da84c" stroke="white" stroke-width="2"/>
                <!-- 脉冲环 - 从中心圆点内部边缘开始 -->
                <circle cx="16" cy="16" r="7" fill="none" stroke="#7da84c" stroke-width="1" opacity="0" class="pulse"/>
                <circle cx="16" cy="16" r="7" fill="none" stroke="#7da84c" stroke-width="1" opacity="0" class="pulse-delayed"/>
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
        marker.addListener('click', () => {
          infoWindow.open(newMap, marker);
        });

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

// 图片资源常量
const logo = "/images/logo.svg";
const img2720 = "/images/bb99baef700187de7fcda0109a4009493acabdb9.png";
const img9F6Cb0B90260A921Fcb08D31A40A4EabOrigin1 = "/images/a9ab380538d3cd574b54a77ffd0a4fda41b421f5.png";
const imgWechatImg485 = "/images/95afa6835184f7e964de7ca5b67d6101bd94bc35.png";
const img2602 = "/images/b420e94ff595b328cc2ee389cfac06458035250d.png";
const img80B0E79Ad1B0042Dae080A52Bfe50880Origin1 = "/images/704271f93fa3692a81c28863d781380040c01e88.png";
const img2111 = "/images/7790f530c54c4e34ebcc4e5be4d0d2305d95a319.png";
const img40C2F7E838D68721A9E5223162C28921Origin1 = "/images/016f8b07a3709e154a1f4a76a3a56475d2f1d043.png";
const img2389 = "/images/3185d165e0f68d237c147ca5bd2c732c7111a9b7.png";
const imgDscf6118 = "/images/9561b58386b5f261a605fde44656ff0ce9311ed9.png";
const imgWldSj35743 = "/images/5ad5b0f00cbe75d6366d6c97ae6efd6f3af4c704.png";

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
    icon: <img src="/images/Daily Translation Assistance.svg" alt="Daily Translation Assistance" className="w-[45px] h-[45px]" />
  },
  {
    title: "SIM Card Registration",
    icon: <img src="/images/SIM Card Registration.svg" alt="SIM Card Registration" className="w-[45px] h-[45px]" />
  },
  {
    title: "Power Adapter Conversion",
    icon: <img src="/images/Power Adapter Conversion.svg" alt="Power Adapter Conversion" className="w-[45px] h-[45px]" />
  },
  {
    title: "Travel and Commute Guide",
    icon: <img src="/images/Travel and Commute Guide.svg" alt="Travel and Commute Guide" className="w-[45px] h-[45px]" />
  },
  {
    title: "Shared Bike Rentals",
    icon: <img src="/images/Shared Bike Rentals.svg" alt="Shared Bike Rentals" className="w-[45px] h-[45px]" />
  },
  {
    title: "Local Food Recommendations",
    icon: <img src="/images/Local Food Recommendations.svg" alt="Local Food Recommendations" className="w-[45px] h-[45px]" />
  },
  {
    title: "Travel Itinerary Suggestions",
    icon: <img src="/images/Travel Itinerary Suggestions.svg" alt="Travel Itinerary Suggestions" className="w-[45px] h-[45px]" />
  },
  {
    title: "Restaurant Reservations",
    icon: <img src="/images/Restaurant Reservations.svg" alt="Restaurant Reservations" className="w-[45px] h-[45px]" />
  },
  {
    title: "Local App Installation Assistance",
    icon: <img src="/images/Local App Installation Assistance.svg" alt="Local App Installation Assistance" className="w-[45px] h-[45px]" />
  },
  {
    title: "Parcel Collection Service",
    icon: <img src="/images/Parcel Collection Service.svg" alt="Parcel Collection Service" className="w-[45px] h-[45px]" />
  },
  {
    title: "Medical Appointment Assistance",
    icon: <img src="/images/Medical Appointment Assistance.svg" alt="Medical Appointment Assistance" className="w-[45px] h-[45px]" />
  },
  {
    title: "24/7 In-House Maintenance",
    icon: <img src="/images/In-House Maintenance.svg" alt="24/7 In-House Maintenance" className="w-[45px] h-[45px]" />
  }
];

export default function FigmaDesign() {
  // 弹窗状态管理
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error'
  });

  // 防重复提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showModal = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    setModal({ isOpen: true, title, message, type });
  };

  const hideModal = () => {
    setModal({ isOpen: false, title: '', message: '', type: 'success' });
  };

  return (
    <div className="bg-white relative w-full min-h-screen" data-name="画板备份" data-node-id="0:2">
      {/* 导航栏 */}
      <div className="fixed bg-white h-[70px] left-0 right-0 top-0 z-50 border-b border-gray-200 shadow-sm" data-name="矩形" data-node-id="0:213" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
        <div className="flex items-center justify-between h-full px-4 md:px-8" style={{ alignItems: 'center' }}>
          {/* Logo区域 */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="微领地青年社区" 
              style={{
                width: '120px',
                height: '28.482px',
                flexShrink: 0
              }}
            />
          </div>
          
          {/* 导航菜单 - 右对齐 */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <a 
              href="/about" 
              className="relative cursor-pointer group"
              style={{
                color: '#7DA84C',
                fontFamily: 'HarmonyOS Sans SC',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal'
              }}
            >
              About Vlinker
              {/* 选中状态的下装饰线 */}
              <div className="absolute bottom-[-8px] left-0 right-0 h-0.5 bg-[#7DA84C] opacity-100"></div>
            </a>
            <a 
              href="/community" 
              className="hidden md:block relative cursor-pointer group"
              style={{
                color: '#333',
                fontFamily: 'HarmonyOS Sans SC',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal'
              }}
            >
              Our Communities
              {/* 悬停状态的下装饰线 */}
              <div className="absolute bottom-[-8px] left-0 right-0 h-0.5 bg-[#7DA84C] opacity-0 group-hover:opacity-60"></div>
            </a>
            <a 
              href="/newsroom" 
              className="hidden md:block relative cursor-pointer group"
              style={{
                color: '#333',
                fontFamily: 'HarmonyOS Sans SC',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal'
              }}
            >
              Newsroom & Events
              {/* 悬停状态的下装饰线 */}
              <div className="absolute bottom-[-8px] left-0 right-0 h-0.5 bg-[#7DA84C] opacity-0 group-hover:opacity-60"></div>
            </a>
            
            {/* 联系按钮 */}
            <a 
              href="#contact" 
              className="bg-[#7da84c] h-[36px] px-4 md:px-6 rounded-[18px] flex items-center cursor-pointer hover:bg-[#6a8f3f] transition-colors duration-200"
            >
              <div 
                style={{
                  color: '#FFF',
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal'
                }}
              >
                Contact Us
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* 英雄区域 */}
      <div className="relative h-[400px] md:h-[600px] w-full mt-[70px]" data-name="编组 10" data-node-id="0:43">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img2720}')` }} />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
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
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <img src="/images/Government Certified.svg" alt="Government Certified" className="w-12 h-12" />
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
                <RobotOutlined style={{ fontSize: '30px', color: '#7DA84C' }} />
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
                <HomeOutlined style={{ fontSize: '30px', color: '#7DA84C' }} />
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
                <TeamOutlined style={{ fontSize: '30px', color: '#7DA84C' }} />
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
      <div className="bg-gray-100 py-16">
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
                libraries={['places']}
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
                <div className="h-80 bg-cover bg-center" style={{ backgroundImage: `url('${imgDscf6118}')` }} />
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
                      <span className="mr-2 w-4 h-4 flex items-center justify-center">
                        <img src="/images/clock.svg" alt="clock" className="w-4 h-4" />
                      </span>
                      10 mins to Joy City (Shanghai's Akihabara)
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 w-4 h-4 flex items-center justify-center">
                        <img src="/images/clock.svg" alt="clock" className="w-4 h-4" />
                      </span>
                      20 mins to Jing'an Temple
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 w-4 h-4 flex items-center justify-center">
                        <img src="/images/clock.svg" alt="clock" className="w-4 h-4" />
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
                <div className="h-80 bg-cover bg-center" style={{ backgroundImage: `url('${imgWldSj35743}')` }} />
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
                      <span className="mr-2 w-4 h-4 flex items-center justify-center">
                        <img src="/images/clock.svg" alt="clock" className="w-4 h-4" />
                      </span>
                      20 mins to Hongqiao Hub
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 w-4 h-4 flex items-center justify-center">
                        <img src="/images/suitcase.svg" alt="suitcase" className="w-4 h-4" />
                      </span>
                      Easy access to high-speed rail & airport
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 w-4 h-4 flex items-center justify-center">
                        <img src="/images/sign.svg" alt="sign" className="w-4 h-4" />
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
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
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
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0]  overflow-hidden h-[500px] flex flex-col">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${img9F6Cb0B90260A921Fcb08D31A40A4EabOrigin1}')` }} />
                <div className="p-6 flex flex-col h-[216px]">
                  <h3 className="font-medium text-black text-[20px] mb-4 flex-shrink-0">
                    Qiantangqiuhe: Authentic "Shanghai Taste"
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
              
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0]  overflow-hidden h-[500px] flex flex-col">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${img80B0E79Ad1B0042Dae080A52Bfe50880Origin1}')` }} />
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
              
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0]  overflow-hidden h-[500px] flex flex-col">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${img40C2F7E838D68721A9E5223162C28921Origin1}')` }} />
                <div className="p-6 flex flex-col h-[216px]">
                  <h3 className="font-medium text-black text-[20px] mb-4 flex-shrink-0">
                    Auntie Fatty's: Liuzhou Luosifen
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${imgWechatImg485}')` }} />
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
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${img2111}')` }} />
                <div className="p-6 flex flex-col h-[156px]">
                  <h3 className="font-medium text-black text-[18px] mb-4 flex-shrink-0">
                    City Hiking Adventures
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <p className="font-normal text-[14px] text-black leading-[26px]">
                      Explore Shanghai's hidden gems and historic neighborhoods with our guided hikes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-[#f5faf0] overflow-hidden h-[400px] flex flex-col">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url('${img2389}')` }} />
                <div className="p-6 flex flex-col h-[156px]">
                  <h3 className="font-medium text-black text-[18px] mb-4 flex-shrink-0">
                    Monthly Themed Parties
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <p className="font-normal text-[14px] text-black leading-[26px]">
                      Celebrate international festivals and cultural events with food, music and fun activities.
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
                "I was worried about feeling lonely in a new city, but the weekly cocktail parties helped me make many friends. The commute to Fudan only takes 15 minutes!"
              </p>
              
              {/* 底部用户信息 */}
              <div className="flex items-center justify-end mt-auto">
                <div className="text-right mr-4">
                  <h4 className="font-bold text-black text-[18px]">Kim Jae-hyun</h4>
                  <p className="text-[#838383] text-[12px]">South Korea • Fudan University</p>
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
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
                "I love the city hiking events! Our guides share so much history about Shanghai. The 24-hour maintenance service is also incredibly convenient."
              </p>
              
              {/* 底部用户信息 */}
              <div className="flex items-center justify-end mt-auto">
                <div className="text-right mr-4">
                  <h4 className="font-bold text-black text-[18px]">Amy Johnson</h4>
                  <p className="text-[#838383] text-[12px]">USA • Shanghai Jiao Tong University</p>
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
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
                "Living near Hongqiao Hub makes weekend trips so easy! The staff helped me set up my phone and apps when I arrived - it made settling in much simpler."
              </p>
              
              {/* 底部用户信息 */}
              <div className="flex items-center justify-end mt-auto">
                <div className="text-right mr-4">
                  <h4 className="font-bold text-black text-[18px]">Marco Rossi</h4>
                  <p className="text-[#838383] text-[12px]">Italy • Tongji University</p>
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* 联系我们部分 */}
    <div id="contact" className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-8">
        <div className="bg-[#7da84c] overflow-hidden p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="text-white">
              <h2 className="font-bold text-[32px] md:text-[40px] mb-6">Contact Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] mb-2">Phone</h3>
                    <p className="text-[16px]">+86 21 XXXX XXXX</p>
                    <p className="text-[14px] opacity-80">English & Chinese support</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] mb-2">Email</h3>
                    <p className="text-[16px]">info@vibeliving.com</p>
                    <p className="text-[14px] opacity-80">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <WechatOutlined style={{ fontSize: '20px', color: 'white' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] mb-2">WeChat</h3>
                    <p className="text-[16px]">VibeLivingShanghai</p>
                    <p className="text-[14px] opacity-80">Quickest response</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-[16px] mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-white text-[16px]">Your Rental Journey Starts Here.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8">
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                
                // 防重复提交
                if (isSubmitting) {
                  return;
                }
                
                setIsSubmitting(true);
                
                const formData = new FormData(e.target as HTMLFormElement);
                const email = formData.get('email');
                const wechat = formData.get('wechat');
                
                if (!email && !wechat) {
                  showModal('Validation Error', 'Please provide either email address or WeChat ID for contact', 'error');
                  setIsSubmitting(false);
                  return;
                }
                
                try {
                  // 准备数据
                  const name = formData.get('name') as string;
                  const university = formData.get('university') as string;
                  const arrivalDate = formData.get('arrivalDate') as string;
                  const message = formData.get('message') as string;
                  
                  // 构建remark字段：客户名称 + message + 入住时间
                  const remark = [
                    name ? `Name: ${name}` : '',
                    message ? `Message: ${message}` : '',
                    arrivalDate ? `Arrival Date: ${arrivalDate}` : ''
                  ].filter(Boolean).join(' | ');
                  
                  // 准备插入数据，按照通用广告端点格式
                  const insertData: any = {
                    external_id: `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // 生成外部ID
                    leadtype: '表单线索',
                    traffictype: '网站表单',
                    interactiontype: '表单提交'
                  };
                  
                  // 只添加非空值，按照通用广告端点字段映射
                  if (email && String(email).trim()) {
                    insertData.phone = String(email).trim();
                  }
                  if (wechat && String(wechat).trim()) {
                    insertData.wechat = String(wechat).trim();
                  }
                  if (university && String(university).trim()) {
                    insertData.location = String(university).trim();
                  }
                  if (remark && String(remark).trim()) {
                    insertData.remark = String(remark).trim();
                  }
                  
                  // 调试信息
                  console.log('Inserting data:', insertData);
                  
                  // 添加小延迟避免时间戳冲突
                  await new Promise(resolve => setTimeout(resolve, 100));
                  
                  // 使用通用广告端点API插入数据
                  try {
                    const response = await fetch('https://lead-service.vld.com/api/v1/leads/ingest/generic', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        leads: [insertData],
                        platform: '海外站'
                      })
                    });

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json();
                    console.log('Lead submitted successfully:', result);

                    // 检查通用广告端点的响应格式
                    if (result.code === '200' && result.message === 'success') {
                      console.log('Lead created successfully via generic ads endpoint');
                      showModal('Success!', 'Thank you for your inquiry! We will contact you soon.', 'success');
                    } else {
                      // 处理其他可能的成功响应格式
                      if (result.success) {
                        console.log('Lead created successfully:', result);
                        showModal('Success!', 'Thank you for your inquiry! We will contact you soon.', 'success');
                      } else {
                        throw new Error(result.error || result.message || 'Unknown error occurred');
                      }
                    }
                  } catch (error) {
                    console.error('Error submitting lead:', error);
                    console.error('Insert data was:', insertData);
                    showModal('Submission Failed', 'Failed to submit form. Please try again.', 'error');
                    setIsSubmitting(false);
                    return;
                  }
                  
                  // 重置表单
                  (e.target as HTMLFormElement).reset();
                  setIsSubmitting(false);
                  
                } catch (error) {
                  console.error('Error submitting form:', error);
                  showModal('Submission Failed', 'Failed to submit form. Please try again.', 'error');
                  setIsSubmitting(false);
                }
              }}>
                  <div>
                    <label className="font-bold text-[16px] text-black block mb-2">How should we address you?</label>
                    <input type="text" name="name" className="w-full h-10 px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg" placeholder="Enter your name" />
                  </div>
                
                <div>
                  <label className="font-bold text-[16px] text-black block mb-2">Email Address</label>
                  <input type="email" name="email" className="w-full h-10 px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg" placeholder="Enter your email address" />
                </div>
                
                <div>
                  <label className="font-bold text-[16px] text-black block mb-2">Your WeChat</label>
                  <input type="text" name="wechat" className="w-full h-10 px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg" placeholder="Enter your WeChat ID" />
                </div>
                
                <div>
                  <label className="font-bold text-[16px] text-black block mb-2">University</label>
                  <input type="text" name="university" className="w-full h-10 px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg" placeholder="Enter your university name" />
                </div>
                
                <div>
                  <label className="font-bold text-[16px] text-black block mb-2">Arrival Date</label>
                  <input type="date" name="arrivalDate" className="w-full h-10 px-4 bg-[#F5F5F5] border border-gray-300 rounded-lg" />
                </div>
                
                <div>
                  <label className="font-bold text-[16px] text-black block mb-2">Your Message</label>
                  <textarea name="message" className="w-full h-24 px-4 py-2 bg-[#F5F5F5] border border-gray-300 rounded-lg" placeholder="Tell us about your rental needs and any questions you have..."></textarea>
                </div>
                
                <div className="text-center">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-[33.5px] font-bold text-[20px] transition-colors duration-200 ${
                      isSubmitting 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-[#7da84c] text-white hover:bg-[#6a8f3f]'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Us a Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 页脚 */}
    <div className="bg-[#333333] py-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-wrap justify-center space-x-8 text-white">
          <div className="font-bold text-[16px]">About Vlinker</div>
          <div className="font-bold text-[16px]">Communities</div>
          <div className="font-bold text-[16px]">Newsroom & Events</div>
        </div>
      </div>
    </div>
    
    {/* 自定义弹窗 */}
    <CustomModal
      isOpen={modal.isOpen}
      onClose={hideModal}
      title={modal.title}
      message={modal.message}
      type={modal.type}
    />
    </div>
  );
}
