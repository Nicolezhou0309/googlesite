'use client';

import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Image from 'next/image';
import Link from 'next/link';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import CommunityInfoWindow from '../CommunityInfoWindow';
import { getOptimizedImageProps, handleImageError, handleImageLoad } from '../../lib/imageOptimization';
import { getOSSImageUrl, getIconImageUrl } from '../../lib/imageConfig';
import { useLanguage } from '../../contexts/LanguageProvider';
import { useTranslations } from '../../lib/translations';

// 类型定义
interface CommunityLocation {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  displayName: string;
  district: string;
  description: string;
  image: string;
  tags: string[];
  priceRange: string;
  priceRangeUSD: string;
  availableUnits: number;
  subwayInfo: string;
}

interface UniversityLocation {
  id: string;
  position: { lat: number; lng: number };
  name: string;
  englishName: string;
  district: string;
  address: string;
}

// Google Maps 类型声明
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        InfoWindow: any;
        Size: any;
        Point: any;
        MapsEventListener: any;
      };
    };
  }
  
  namespace google {
    namespace maps {
      interface Map {
        addListener(event: string, handler: Function): any;
      }
      interface Marker {
        addListener(event: string, handler: Function): any;
        setMap(map: Map | null): void;
      }
      interface InfoWindow {
        open(map: Map, marker?: Marker): void;
        close(): void;
        addListener(event: string, handler: Function): any;
        setContent(content: string | HTMLElement): void;
      }
      interface Size {
        constructor(width: number, height: number): Size;
      }
      interface Point {
        constructor(x: number, y: number): Point;
      }
      interface MapsEventListener {
        remove(): void;
      }
    }
  }
}

// Google Maps配置
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// 大学位置数据 - 使用高德地图API获取的精确坐标
const universityLocations: UniversityLocation[] = [
  {
    id: 'tongji-university',
    position: { lat: 31.283465, lng: 121.501622 },
    name: '同济大学',
    englishName: 'Tongji University',
    district: '杨浦区',
    address: '上海市杨浦区四平路1239号'
  },
  {
    id: 'fudan-university',
    position: { lat: 31.297025, lng: 121.502871 },
    name: '复旦大学',
    englishName: 'Fudan University',
    district: '杨浦区',
    address: '上海市杨浦区邯郸路220号'
  },
  {
    id: 'shufe-university',
    position: { lat: 31.305858, lng: 121.499032 },
    name: '上海财经大学',
    englishName: 'Shanghai University of Finance and Economics',
    district: '杨浦区',
    address: '上海市杨浦区国定路777号'
  },
  {
    id: 'ecnu-university',
    position: { lat: 31.227663, lng: 121.406829 },
    name: '华东师范大学',
    englishName: 'East China Normal University',
    district: '普陀区',
    address: '上海市普陀区中山北路3663号'
  },
  {
    id: 'nyu-shanghai',
    position: { lat: 31.225610, lng: 121.533960 },
    name: '上海纽约大学',
    englishName: 'New York University Shanghai',
    district: '浦东新区',
    address: '上海市浦东新区世纪大道1555号'
  },
  {
    id: 'usst-university',
    position: { lat: 31.292707, lng: 121.554992 },
    name: '上海理工大学',
    englishName: 'University of Shanghai for Science and Technology',
    district: '杨浦区',
    address: '上海市杨浦区军工路516号'
  },
  {
    id: 'sjtu-university',
    position: { lat: 31.023988, lng: 121.436248 },
    name: '上海交通大学',
    englishName: 'Shanghai Jiao Tong University',
    district: '闵行区',
    address: '上海市闵行区东川路800号'
  },
  {
    id: 'sisu-university',
    position: { lat: 31.276598, lng: 121.482548 },
    name: '上海外国语大学',
    englishName: 'Shanghai International Studies University',
    district: '虹口区',
    address: '上海市虹口区大连西路550号'
  },
  {
    id: 'ecust-university',
    position: { lat: 31.14314, lng: 121.425017 },
    name: '华东理工大学',
    englishName: 'East China University of Science and Technology',
    district: '徐汇区',
    address: '上海市徐汇区梅陇路130号'
  },
  {
    id: 'dhu-university',
    position: { lat: 31.205718, lng: 121.414276 },
    name: '东华大学',
    englishName: 'Donghua University',
    district: '长宁区',
    address: '上海市长宁区延安西路1882号'
  },
  {
    id: 'shu-university',
    position: { lat: 31.320000, lng: 121.380000 },
    name: '上海大学',
    englishName: 'Shanghai University',
    district: '宝山区',
    address: '上海市宝山区上大路99号'
  },
  {
    id: 'sues-university',
    position: { lat: 31.214379, lng: 121.386909 },
    name: '上海工程技术大学',
    englishName: 'Shanghai University of Engineering Science',
    district: '长宁区',
    address: '上海市长宁区仙霞路350号'
  },
  {
    id: 'shnu-university',
    position: { lat: 31.161433, lng: 121.419384 },
    name: '上海师范大学',
    englishName: 'Shanghai Normal University',
    district: '徐汇区',
    address: '上海市徐汇区桂林路100号'
  }
];

// Google地图组件
const MapComponent = ({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentInfoWindow, setCurrentInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityLocation | null>(null);
  const [allInfoWindows, setAllInfoWindows] = useState<google.maps.InfoWindow[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const eventListenersRef = useRef<google.maps.MapsEventListener[]>([]);
  const reactRootRef = useRef<ReactDOM.Root | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);
  const universityMarkersRef = useRef<google.maps.Marker[]>([]);
  const { language } = useLanguage();
  const t = useTranslations(language);


  // 社区位置数据
  const communityLocations: CommunityLocation[] = [
    {
      id: 'jingan-center',
      position: { lat: 31.311276, lng: 121.446857 },
      title: "JING'AN CENTER COMMUNITY",
      displayName: "新静安中心微领地青年社区",
      district: "Jing'an District",
      description: "Located on Linfen Road<br/>Modern youth community<br/>Convenient transportation access",
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/JINGANCENTERCOMMUNITY.webp',
      tags: ['Parking', 'Gym', 'Free Bar', 'Media Room', 'Co-working & Study Spaces', 'Shared Kitchen', 'Shuttle Bus'],
      priceRange: '¥3500-4200/month',
      priceRangeUSD: '$486-583',
      availableUnits: 5,
      subwayInfo: 'Line 1 Pengpu Xincun Station 500m walk'
    },
    {
      id: 'zhonghuan-hutai',
      position: { lat: 31.291858, lng: 121.419637 },
      title: "HUTAI ROAD COMMUNITY",
      displayName: "中环沪太路微领地青年社区",
      district: "Jing'an District",
      description: "Located on Hutai Road<br/>Modern youth community<br/>Convenient transportation access",
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/HUTAI%20ROAD%20COMMUNITY.webp',
      tags: ['Parking', 'Gym', 'Basketball Court', 'Shared Kitchen', 'Co-working & Study Spaces', 'Community Garden'],
      priceRange: '¥2500-2900/month',
      priceRangeUSD: '$347-403',
      availableUnits: 4,
      subwayInfo: 'Line 7 Dachangzhen Station 200m'
    },
    {
      id: 'north-hongqiao',
      position: { lat: 31.243580, lng: 121.315428 },
      title: "NORTH HONGQIAO COMMUNITY",
      displayName: "北虹桥国际微领地青年社区",
      district: "Jiading District",
      description: "Located at No. 1280 Jinyuan 1st Road<br/>20 mins to Hongqiao Hub<br/>Easy access to high-speed rail & airport",
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/NORTHHONGQIAOCOMMUNITY.webp',
      tags: ['Parking', 'Game Room', 'Billiards Room', 'Shared Kitchen', 'Co-working & Study Spaces', 'Community Garden'],
      priceRange: '¥2688-3688/month',
      priceRangeUSD: '$373-512',
      availableUnits: 5,
      subwayInfo: 'Line 13 Jinyun Road Station ~300m'
    },
    {
      id: 'pujiang-center',
      position: { lat: 31.067197, lng: 121.523561 },
      title: "PUJIANG CENTER COMMUNITY",
      displayName: "浦江中心微领地青年社区",
      district: "Minhang District",
      description: "Located at No. 131 Kanghua Road, Pujiang Town, Minhang District<br/>Modern youth community<br/>Convenient transportation access",
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/PUJIANG%20CENTER%20COMMUNITY.webp',
      tags: ['Parking', 'Gym', 'Basketball Court', 'Co-working & Study Spaces', 'Shared Kitchen', 'Shuttle Bus'],
      priceRange: '¥1650-2500/month',
      priceRangeUSD: '$229-347',
      availableUnits: 6,
      subwayInfo: 'Line 8 Shendu Highway Station 5min direct'
    },
    {
      id: 'pujiang-park',
      position: { lat: 31.061538, lng: 121.506352 },
      title: "PUJIANG PARK COMMUNITY",
      displayName: "浦江公园微领地青年社区",
      district: "Minhang District",
      description: "Located on Changlin Road<br/>Near Pujiang Park<br/>Modern youth community",
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/PUJIANGPARK%20COMMUNITY.webp',
      tags: ['Parking', 'Gym', 'Basketball Court', 'Ping Pong Room', 'Recording Studio', 'Yoga Room', 'Community Garden', 'Shared Kitchen', 'Co-working & Study Spaces', 'Shuttle Bus'],
      priceRange: '¥2200-2600/month',
      priceRangeUSD: '$306-361',
      availableUnits: 7,
      subwayInfo: 'Line 8 Shendu Highway Station 600m'
    }
  ];

  // 关闭所有信息窗口的函数
  const closeAllInfoWindows = () => {
    infoWindowsRef.current.forEach((infoWindow, index) => {
      if (infoWindow && typeof infoWindow.close === 'function') {
        try {
          infoWindow.close();
        } catch (error) {
          console.error(`关闭InfoWindow ${index} 时出错:`, error);
        }
      }
    });
    setCurrentInfoWindow(null);
    setSelectedCommunity(null);
    
    // 清理React根节点
    if (reactRootRef.current) {
      reactRootRef.current.unmount();
      reactRootRef.current = null;
    }
  };

  // 打开特定社区信息窗口的函数
  const openCommunityInfoWindow = (community: CommunityLocation, mapInstance?: google.maps.Map | null) => {
    const currentMap = mapInstance || map;
    
    // 防止重复打开
    if (isOpening) {
      return;
    }
    
    // 如果已经选择了同一个社区，则关闭InfoWindow
    if (selectedCommunity?.id === community.id && currentInfoWindow) {
      closeAllInfoWindows();
      return;
    }
    
    setIsOpening(true);
    
    // 关闭所有其他信息窗口
    closeAllInfoWindows();
    
    // 找到对应的标记和信息窗口
    const markerIndex = communityLocations.findIndex(loc => loc.id === community.id);
    if (markerIndex === -1) {
      console.error('找不到对应的社区:', community.id);
      return;
    }
    
    if (!markersRef.current[markerIndex]) {
      console.error('标记未初始化:', markerIndex, markersRef.current);
      return;
    }
    
    if (!infoWindowsRef.current[markerIndex]) {
      console.error('InfoWindow未初始化:', markerIndex, infoWindowsRef.current);
      return;
    }
    
    const marker = markersRef.current[markerIndex];
    const infoWindow = infoWindowsRef.current[markerIndex];
    
    if (!currentMap) {
      console.error('地图未初始化');
      return;
    }
    
    // 清理之前的React根节点
    if (reactRootRef.current) {
      reactRootRef.current.unmount();
      reactRootRef.current = null;
    }
    
    // 创建新的内容元素和React根节点
    const infoWindowContent = document.createElement('div');
    infoWindowContent.id = `info-window-${community.title.replace(/\s+/g, '-').toLowerCase()}`;
    infoWindowContent.style.width = 'clamp(280px, 90vw, 350px)';
    infoWindowContent.style.height = 'auto';
    infoWindowContent.style.padding = '0';
    infoWindowContent.style.margin = '0';
    infoWindowContent.style.border = 'none !important';
    infoWindowContent.style.borderRadius = '0';
    infoWindowContent.style.outline = 'none';
    infoWindowContent.style.boxShadow = 'none';
    
    // 添加CSS样式覆盖Google Maps默认样式（只添加一次）
    if (!document.getElementById('info-window-styles')) {
      const style = document.createElement('style');
      style.id = 'info-window-styles';
      style.textContent = `
        .gm-style-iw-c {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .gm-style-iw-tc {
          display: none !important;
        }
        .gm-style-iw-d {
          overflow: visible ;
          border: none !important;
          outline: none !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // 创建React根节点并渲染内容
    reactRootRef.current = ReactDOM.createRoot(infoWindowContent);
    reactRootRef.current.render(
      React.createElement(CommunityInfoWindow, {
        community: community
      })
    );
    
    // 等待React渲染完成后再设置内容和打开InfoWindow
    setTimeout(() => {
      try {
        // 确保之前的内容被清理
        infoWindow.setContent('');
        
        // 等待一小段时间确保内容清理完成
        setTimeout(() => {
          try {
            // 更新InfoWindow的内容
            infoWindow.setContent(infoWindowContent);
            
            // 根据Google Maps文档，正确的打开方式
            infoWindow.open(currentMap, marker);
            
            setCurrentInfoWindow(infoWindow);
            setSelectedCommunity(community);
            setIsOpening(false);
          } catch (error) {
            console.error('打开InfoWindow时出错:', error);
            setIsOpening(false);
          }
        }, 50);
      } catch (error) {
        console.error('清理InfoWindow内容时出错:', error);
      }
    }, 100); // 给React渲染一点时间
  };

  // 清理事件监听器的函数
  const cleanupEventListeners = () => {
    eventListenersRef.current.forEach(listener => {
      if (listener && typeof listener.remove === 'function') {
        listener.remove();
      }
    });
    eventListenersRef.current = [];
  };

  // 检查API Key
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">地图功能需要配置</h3>
          <p className="text-gray-600 mb-4">要使用地图功能，请在项目根目录创建 <code className="bg-gray-200 px-2 py-1 rounded text-sm">.env.local</code> 文件并添加 Google Maps API Key。</p>
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <p className="text-sm text-gray-700 mb-2">在 <code>.env.local</code> 文件中添加：</p>
            <code className="text-xs text-green-600">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here</code>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>注意：</strong> 当前 API Key 为空，地图将无法正常工作。请配置正确的 API Key 后重新加载页面。
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 初始化地图和标记
  useEffect(() => {
    if (!ref.current || map || typeof window === 'undefined' || !window.google?.maps) {
      return;
    }

    
    // 创建地图实例
    const newMap = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      language: 'en',
      region: 'US',
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
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
        // 隐藏所有POI图标
        {
          featureType: 'poi',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏商业POI
        {
          featureType: 'poi.business',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏景点POI
        {
          featureType: 'poi.attraction',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏政府POI
        {
          featureType: 'poi.government',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏医疗POI
        {
          featureType: 'poi.medical',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏公园POI
        {
          featureType: 'poi.park',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏宗教场所POI
        {
          featureType: 'poi.place_of_worship',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏学校POI（除了我们自定义的大学标记）
        {
          featureType: 'poi.school',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏体育POI
        {
          featureType: 'poi.sports_complex',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏交通POI
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit.station',
          stylers: [{ visibility: 'off' }]
        },
        // 隐藏道路标签
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        },
        // 保持基本道路和地理信息
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ visibility: 'on' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text',
          stylers: [{ visibility: 'on' }]
        }
      ]
    });
    
    setMap(newMap);
    
    // 添加地图范围调试信息
    const logMapBounds = () => {
      const bounds = newMap.getBounds();
      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
      }
    };
    
    // 地图加载完成后记录范围
    newMap.addListener('idle', logMapBounds);
    
    // 地图范围变化时记录
    newMap.addListener('bounds_changed', logMapBounds);

    // 添加地图点击事件监听器
    const mapClickListener = newMap.addListener('click', () => {
      closeAllInfoWindows();
      setIsOpening(false);
    });
    eventListenersRef.current.push(mapClickListener);

    // 创建标记
    const newMarkers: google.maps.Marker[] = [];
    const newInfoWindows: google.maps.InfoWindow[] = [];
    const newUniversityMarkers: google.maps.Marker[] = [];
    
    // 创建大学标记
    universityLocations.forEach((university) => {
      
      // 创建大学标记
      const universityMarker = new window.google.maps.Marker({
        position: university.position,
        map: newMap,
        title: university.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M789.333333 486.250667V746.666667c0 58.901333-124.16 106.666667-277.333333 106.666666-150.570667 0-273.109333-46.144-277.226667-103.68L234.666667 746.666667V486.250667l260.053333 115.285333a42.666667 42.666667 0 0 0 30.848 1.450667l3.733333-1.450667L789.333333 486.250667zM529.28 166.464l398.592 176.704a21.333333 21.333333 0 0 1 0 38.997333L874.666667 405.76 874.666667 603.093333A42.666667 42.666667 0 1 1 832 603.029333v-178.410666l-302.72 134.229333a42.666667 42.666667 0 0 1-34.56 0L96.106667 382.165333a21.333333 21.333333 0 0 1 0-38.997333l398.570666-176.704a42.666667 42.666667 0 0 1 34.602667 0z" fill="#2563eb"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });
      
      // 为大学标记添加标签
      const getUniversityDisplayName = (university: UniversityLocation) => {
        if (language === 'zh') {
          // 中文环境显示完整中文名称
          return university.name;
        } else {
          // 英文环境显示缩写
          const universityMap: { [key: string]: string } = {
            'tongji-university': t.communityLocation.universities.tongji,
            'fudan-university': t.communityLocation.universities.fudan,
            'shufe-university': t.communityLocation.universities.shufe,
            'ecnu-university': t.communityLocation.universities.ecnu,
            'nyu-shanghai': t.communityLocation.universities.nyu,
            'usst-university': t.communityLocation.universities.usst,
            'sjtu-university': t.communityLocation.universities.sjtu,
            'sisu-university': t.communityLocation.universities.sisu,
            'ecust-university': t.communityLocation.universities.ecust,
            'dhu-university': t.communityLocation.universities.dhu,
            'shu-university': t.communityLocation.universities.shu,
            'sues-university': t.communityLocation.universities.sues,
            'shnu-university': t.communityLocation.universities.shnu,
          };
          return universityMap[university.id] || university.englishName;
        }
      };

      universityMarker.setLabel({
        text: getUniversityDisplayName(university),
        color: '#2563eb',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: 'HarmonyOS Sans SC, sans-serif',
        className: 'university-label-above'
      });
      
      // 大学标记不需要点击事件和信息窗口，只作为位置标记显示
      
      // 保存大学标记
      newUniversityMarkers.push(universityMarker);
    });
    
    communityLocations.forEach((location) => {
      
      // 创建传统标记
      const marker = new window.google.maps.Marker({
        position: location.position,
        map: newMap,
        title: location.title,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="10" fill="#7da84c" stroke="white" stroke-width="3"/>
              <circle cx="20" cy="20" r="6" fill="#7da84c" opacity="0.8">
                <animate attributeName="r" values="6;18;6" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0;0.8" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="20" cy="20" r="3" fill="#7da84c" opacity="0.6">
                <animate attributeName="r" values="3;15;3" dur="1.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite"/>
              </circle>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20)
        }
      });
      
      // 创建InfoWindow - 初始内容为空，稍后动态设置
      const infoWindow = new window.google.maps.InfoWindow({
        content: '', // 初始内容为空
        maxWidth: Math.min(350, window.innerWidth * 0.9), // 响应式宽度，最大350px
        maxHeight: 320, // 增加高度以容纳所有内容
        pixelOffset: new window.google.maps.Size(0, -10),
        disableAutoPan: false,
        disableCloseButton: true // 禁用关闭按钮
      });
      
      // 添加标记点击事件
      const markerClickListener = marker.addListener('click', (event: any) => {
        if (event && event.stop) {
          event.stop();
        }
        
        // 检查初始化状态
        if (!newMap) {
          console.error('地图未初始化，无法打开InfoWindow');
          return;
        }
        
        if (!infoWindow) {
          console.error('InfoWindow未初始化，无法打开');
          return;
        }
        
        // 防止重复点击
        if (isOpening) {
          return;
        }
        
        // 直接使用统一的打开信息窗口函数，传递地图实例
        openCommunityInfoWindow(location, newMap);
      });
      
      // 添加InfoWindow关闭事件
      const closeClickListener = infoWindow.addListener('closeclick', () => {
        setCurrentInfoWindow(null);
        setSelectedCommunity(null);
        setIsOpening(false);
        if (reactRootRef.current) {
          reactRootRef.current.unmount();
          reactRootRef.current = null;
        }
      });
      
      // 保存事件监听器
      eventListenersRef.current.push(markerClickListener, closeClickListener);
      
      // 保存标记和InfoWindow
      newMarkers.push(marker);
      newInfoWindows.push(infoWindow);
    });
    
    // 保存标记和信息窗口引用
    markersRef.current = newMarkers;
    infoWindowsRef.current = newInfoWindows;
    universityMarkersRef.current = newUniversityMarkers;
    setAllInfoWindows(newInfoWindows);
    
    // 输出标记位置调试信息
    communityLocations.forEach((community, index) => {
    });
    universityLocations.forEach((university, index) => {
    });
    
    // 标记初始化完成
    setIsInitialized(true);
    
  }, [ref, map, center, zoom]);

  // 监听语言变化，更新大学标记标签
  useEffect(() => {
    if (!map || !isInitialized) return;
    
    const getUniversityDisplayName = (university: UniversityLocation) => {
      if (language === 'zh') {
        // 中文环境显示完整中文名称
        return university.name;
      } else {
        // 英文环境显示缩写
        const universityMap: { [key: string]: string } = {
          'tongji-university': t.communityLocation.universities.tongji,
          'fudan-university': t.communityLocation.universities.fudan,
          'shufe-university': t.communityLocation.universities.shufe,
          'ecnu-university': t.communityLocation.universities.ecnu,
          'nyu-shanghai': t.communityLocation.universities.nyu,
          'usst-university': t.communityLocation.universities.usst,
          'sjtu-university': t.communityLocation.universities.sjtu,
          'sisu-university': t.communityLocation.universities.sisu,
          'ecust-university': t.communityLocation.universities.ecust,
          'dhu-university': t.communityLocation.universities.dhu,
          'shu-university': t.communityLocation.universities.shu,
          'sues-university': t.communityLocation.universities.sues,
          'shnu-university': t.communityLocation.universities.shnu,
        };
        return universityMap[university.id] || university.englishName;
      }
    };
    
    universityMarkersRef.current.forEach((marker, index) => {
      if (marker && universityLocations[index]) {
        const university = universityLocations[index];
        (marker as any).setLabel({
          text: getUniversityDisplayName(university),
          color: '#2563eb',
          fontSize: '13px',
          fontWeight: '600',
          fontFamily: 'HarmonyOS Sans SC, sans-serif',
          className: 'university-label-above'
        });
      }
    });
  }, [language, map, isInitialized, t]);

  // 清理函数
  useEffect(() => {
    return () => {
      // 清理事件监听器
      eventListenersRef.current.forEach((listener: any) => {
        if (listener && typeof listener.remove === 'function') {
          listener.remove();
        }
      });
      eventListenersRef.current = [];
      
      // 清理React根节点
      if (reactRootRef.current) {
        reactRootRef.current.unmount();
        reactRootRef.current = null;
      }
      
      // 清理标记
      markersRef.current.forEach((marker: any) => {
        if (marker && typeof marker.setMap === 'function') {
          marker.setMap(null);
        }
      });
      markersRef.current = [];
      
      // 清理大学标记
      universityMarkersRef.current.forEach((marker: any) => {
        if (marker && typeof marker.setMap === 'function') {
          marker.setMap(null);
        }
      });
      universityMarkersRef.current = [];
      
      // 清理信息窗口
      infoWindowsRef.current = [];
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* 地图区域 */}
      <div className="flex-1 h-[400px] lg:h-full relative">
        <div ref={ref} style={{ width: '100%', height: '100%' }} />
        
        {/* 小屏幕下的地图点击提示 */}
        <div className="absolute top-4 right-4 lg:hidden">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <p className="text-sm text-gray-700 font-medium">
              点击地图查看详情
            </p>
          </div>
        </div>
      </div>
      
      {/* 大屏幕下的社区列表区域 */}
      <div className="hidden lg:block lg:w-80 lg:h-full p-4 bg-white overflow-y-auto">
        <h3 
          className="font-bold mb-3 sm:mb-4"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: 'clamp(16px, 3vw, 18px)',
            fontWeight: 700,
            color: '#374151'
          }}
        >
          All Communities
        </h3>
        
        <div className="space-y-3">
          {communityLocations.map((community) => (
            <div
              key={community.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedCommunity?.id === community.id 
                  ? 'bg-[#7da84c] text-white' 
                  : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => openCommunityInfoWindow(community, map)}
            >
              <h5 
                className="font-medium mb-1"
                style={{
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  fontWeight: 600
                }}
              >
                {community.title}
              </h5>
              <p 
                className="opacity-80"
                style={{
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: 'clamp(10px, 1.5vw, 12px)',
                  fontWeight: 400
                }}
              >
                {community.district} • {community.subwayInfo}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 小屏幕下的横滑社区列表 */}
      <div className="lg:hidden bg-white border-t border-gray-200">
        <div className="p-4">
          <h3 
            className="font-bold mb-3"
            style={{
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '16px',
              fontWeight: 700,
              color: '#374151'
            }}
          >
            All Communities
          </h3>
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {communityLocations.map((community) => (
              <div
                key={community.id}
                className={`flex-shrink-0 w-64 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCommunity?.id === community.id 
                    ? 'bg-[#7da84c] text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
                onClick={() => openCommunityInfoWindow(community, map)}
              >
                <h5 
                  className="font-medium mb-1"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                >
                  {community.title}
                </h5>
                <p 
                  className="opacity-80 mb-2"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: '12px',
                    fontWeight: 400
                  }}
                >
                  {community.district} • {community.subwayInfo}
                </p>
                <div className="flex justify-between items-center">
                  <span 
                    className="font-bold text-[#7da84c]"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: '16px',
                      fontWeight: 700
                    }}
                  >
                    {community.priceRangeUSD}
                  </span>
                  <span 
                    className="text-gray-600"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: '12px',
                      fontWeight: 400
                    }}
                  >
                    {community.availableUnits} Unit Types
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
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
    case Status.SUCCESS:
      return (
        <MapComponent 
          key="vlinker-communities-map"
          center={{ lat: 31.270000, lng: 121.420000 }} 
          zoom={12} 
        />
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

const CommunityLocation: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  // 图片资源
  const imgDscf6118 = getOSSImageUrl("/images/communities/jingan-center/外立面/9561b58386b5f261a605fde44656ff0ce9311ed9.webp");
  const imgWldSj35743 = getOSSImageUrl("/images/communities/north-hongqiao/外立面/NORTHHONGQIAOCOMMUNITY.webp");

  return (
    <div className="bg-[#f4f4f4] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="w-full max-w-[440px] mb-6 sm:mb-8">
          <p 
            className="font-bold text-[#7da84c] tracking-[0] text-left"
            style={{
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: 'clamp(24px, 5vw, 40px)',
              fontWeight: 700,
              lineHeight: '1.3'
            }}
          >
            {t.communityLocation.commutingTitle.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < t.communityLocation.commutingTitle.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
        
        {/* 描述文本 */}
        <div className="w-full mb-12 sm:mb-16">
          <p 
            className="text-gray-600 text-left leading-[1.6]"
            style={{
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: 'clamp(14px, 2vw, 18px)',
              fontWeight: 400
            }}
          >
            {t.communityLocation.shuttleServiceDescription}
          </p>
        </div>
        
        {/* 地图部分 */}
        <div className="relative mb-16">
          <div className="relative w-full h-[600px] lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            {/* Google地图 */}
            <Wrapper 
              apiKey={GOOGLE_MAPS_API_KEY} 
              render={render}
              libraries={['places', 'marker']}
              version="weekly"
              language="en"
              region="US"
            />
          </div>
        </div>
        
        {/* 社区卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 静安中心社区卡片 */}
          <div className="relative">
            <Link href="/communities/jingan-center" className="block">
              <div className="bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)] transition-shadow duration-300 cursor-pointer">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    {...getOptimizedImageProps(imgDscf6118, "Jing'an Community")}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="p-6">
                  <h3 
                    className="mb-2 whitespace-pre-line"
                    style={{
                      color: '#7da84c',
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(18px, 4vw, 24px)',
                      fontWeight: 700,
                      lineHeight: '1.2'
                    }}
                  >
                    {t.communityCards.jinganCenter.title}
                  </h3>
                  <p 
                    className="mb-3 sm:mb-4 text-gray-600"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      fontWeight: 400,
                      lineHeight: '1.4'
                    }}
                  >
                    {t.communityCards.jinganCenter.tagline}
                  </p>
                  <div 
                    className="space-y-2"
                    style={{
                      color: '#333333',
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: 300,
                      lineHeight: '1.5'
                    }}
                  >
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("clock.svg"), "clock")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      {t.communityCards.jinganCenter.features.joyCity}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("clock.svg"), "clock")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      {t.communityCards.jinganCenter.features.jinganTemple}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("clock.svg"), "clock")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      {t.communityCards.jinganCenter.features.bund}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* 北虹桥社区卡片 */}
          <div className="relative">
            <Link href="/communities/north-hongqiao" className="block">
              <div className="bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)] transition-shadow duration-300 cursor-pointer">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    {...getOptimizedImageProps(imgWldSj35743, "Hongqiao Community")}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="p-6">
                  <h3 
                    className="mb-2 whitespace-pre-line"
                    style={{
                      color: '#7da84c',
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(18px, 4vw, 24px)',
                      fontWeight: 700,
                      lineHeight: '1.2'
                    }}
                  >
                    {t.communityCards.northHongqiao.title}
                  </h3>
                  <p 
                    className="mb-3 sm:mb-4 text-gray-600"
                    style={{
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      fontWeight: 400,
                      lineHeight: '1.4'
                    }}
                  >
                    {t.communityCards.northHongqiao.tagline}
                  </p>
                  <div 
                    className="space-y-2"
                    style={{
                      color: '#333333',
                      fontFamily: 'HarmonyOS Sans SC',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: 300,
                      lineHeight: '1.5'
                    }}
                  >
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("clock.svg"), "clock")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      {t.communityCards.northHongqiao.features.hongqiaoHub}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center relative w-4 h-4">
                        <Image {...getOptimizedImageProps(getIconImageUrl("suitcase.svg"), "suitcase")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      {t.communityCards.northHongqiao.features.highSpeedRail}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 flex items-center justify-center">
                        <Image {...getOptimizedImageProps(getIconImageUrl("sign.svg"), "sign")} width={16} height={16} style={{ width: "16px", height: "auto" }} />
                      </span>
                      {t.communityCards.northHongqiao.features.weekendEscapes}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityLocation;
