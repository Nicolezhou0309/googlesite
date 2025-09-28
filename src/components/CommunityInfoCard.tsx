'use client'

import React from 'react'
import Image from 'next/image'

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

// 社区卡片组件
const CommunityInfoCard: React.FC<{
  community: CommunityLocation
  isSelected?: boolean
  onClick?: () => void
  className?: string
}> = ({ community, isSelected = false, onClick, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-[#7da84c] shadow-lg' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="relative h-48">
        <Image
          src={community.image}
          alt={community.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div class="text-center text-gray-400">
                    <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p class="text-xs opacity-70">Community Image</p>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 
          className="text-lg font-bold mb-2 truncate"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: '18px',
            fontWeight: 700,
            color: '#374151'
          }}
        >
          {community.title}
        </h3>
        
        {/* 位置信息 */}
        <div className="flex items-center mb-2">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span 
            className="text-sm text-gray-600"
            style={{
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '14px',
              fontWeight: 400
            }}
          >
            {community.district}
          </span>
        </div>
        
        {/* 地铁信息 */}
        <div className="flex items-center mb-3">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 1024 1024">
            <path d="M691.73 162H332.27c-78.239 0-141.892 63.648-141.892 141.892V682.27c0 36.508 29.704 66.216 66.216 66.216h56.212l-46.078 56.757L220.65 862h582.698l-46.078-56.757-46.078-56.757h56.212c36.512 0 66.216-29.709 66.216-66.216V303.892C833.622 225.648 769.969 162 691.73 162z m0 56.757c46.942 0 85.135 38.189 85.135 85.135v113.513H540.378V218.757H691.73z m-359.46 0h151.351v198.649H247.135V303.892c0-46.946 38.194-85.135 85.135-85.135z m304.599 586.486H339.834l46.078-56.757h252.176l46.078 56.757h-47.297zM767.405 691.73h-510.81c-5.127 0-9.459-4.333-9.459-9.459V474.162h529.73V682.27c-0.001 5.127-4.334 9.46-9.461 9.46z" />
            <path d="M346.459 587.676m-47.297 0a47.297 47.297 0 1 0 94.594 0 47.297 47.297 0 1 0-94.594 0Z" />
            <path d="M677.541 587.676m-47.297 0a47.297 47.297 0 1 0 94.594 0 47.297 47.297 0 1 0-94.594 0Z" />
          </svg>
          <span 
            className="text-sm text-gray-600"
            style={{
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '14px',
              fontWeight: 400
            }}
          >
            {community.subwayInfo}
          </span>
        </div>
        
        {/* 价格 */}
        <div 
          className="text-lg font-bold mb-2"
          style={{
            fontFamily: 'HarmonyOS Sans SC',
            fontSize: '16px',
            fontWeight: 700,
            color: '#7da84c'
          }}
        >
          {community.priceRangeUSD}
        </div>
        
        {/* 可用户型 */}
        <div className="flex items-center mb-3">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <span 
            className="text-sm text-gray-600"
            style={{
              fontFamily: 'HarmonyOS Sans SC',
              fontSize: '14px',
              fontWeight: 400
            }}
          >
            {community.availableUnits} Unit Types Available
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommunityInfoCard
