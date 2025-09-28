'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CheckIcon from '@/components/ui/CheckIcon'

// 社区位置数据接口
interface CommunityLocation {
  id: string
  position: { lat: number; lng: number }
  title: string
  displayName: string
  district: string
  description: string
  image: string
  priceRange: string
  priceRangeUSD: string
  availableUnits: number
  subwayInfo: string
  tags: string[]
}

interface CommunityInfoWindowProps {
  community: CommunityLocation
}

const CommunityInfoWindow: React.FC<CommunityInfoWindowProps> = ({ community }) => {
  // 根据社区ID生成对应的详情页路径
  const getCommunityPath = (communityId: string) => {
    const pathMap: { [key: string]: string } = {
      'jingan-center': '/communities/jingan-center',
      'north-hongqiao': '/communities/north-hongqiao',
      'pujiang-center': '/communities/pujiang-center',
      'pujiang-park': '/communities/pujiang-park',
      'zhonghuan-hutai': '/communities/zhonghuan-hutai'
    };
    return pathMap[communityId] || '/communities';
  };

  return (
    <Link 
      href={getCommunityPath(community.id)}
      className="block cursor-pointer focus:outline-none"
      style={{ outline: 'none' }}
    >
      <div 
        className="bg-white overflow-hidden font-['HarmonyOS_Sans_SC'] hover:shadow-lg transition-shadow duration-200"
        style={{
          width: 'clamp(280px, 90vw, 350px)',
          margin: 0,
          padding: 0,
          border: 'none !important',
          borderRadius: '0',
          outline: 'none',
          boxShadow: 'none'
        }}
      >
        {/* 图片区域 - 纯图片显示，无覆盖信息 */}
        <div 
          className="relative bg-gray-100 overflow-hidden"
          style={{
            width: '100%',
            height: 'clamp(140px, 25vw, 180px)',
            margin: 0,
            padding: 0,
            borderRadius: '0'
          }}
        >
          <Image
            src={community.image}
            alt={community.title}
            fill
            className="object-cover object-center"
            sizes="350px"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div class="text-center text-gray-400">
                      <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p class="text-sm opacity-70">Community Image</p>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>
        
        {/* 信息卡片区域 - 只显示价格和户型信息 */}
        <div className="p-3 sm:p-4 bg-white">
          {/* 价格和户型信息 */}
          <div className="flex justify-between items-center">
            {/* 左侧：价格信息 */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span 
                  className="font-bold text-[#7da84c]"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(16px, 3vw, 20px)',
                    fontWeight: 700
                  }}
                >
                  {community.priceRangeUSD}
                </span>
                <span 
                  className="text-gray-500"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: 'clamp(11px, 2vw, 14px)',
                    fontWeight: 400
                  }}
                >
                  /month
                </span>
              </div>
            </div>
            
            {/* 右侧：户型数量信息 */}
            <div className="flex items-center gap-1">
              <span 
                className="font-bold text-gray-800"
                style={{
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: 'clamp(14px, 2.5vw, 18px)',
                  fontWeight: 700
                }}
              >
                {community.availableUnits}
              </span>
              <span 
                className="text-gray-600"
                style={{
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: 'clamp(10px, 1.8vw, 14px)',
                  fontWeight: 400
                }}
              >
                Unit Types
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CommunityInfoWindow
