'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCommunityImageUrl } from '@/lib/imageConfig'
import { useLanguage } from '@/contexts/LanguageProvider'
import { translations } from '@/lib/translations'

interface Community {
  id: string
  name: string
  district: string
  description: string
  image: string
  tags: string[]
  priceRange: string
  priceRangeUSD: string
  availableUnits: number
  subwayInfo: string
}


export default function CommunityGrid() {
  const { language } = useLanguage()
  const t = translations[language]

  // 标签翻译映射
  const getTranslatedTag = (tag: string): string => {
    const tagMap: Record<string, string> = {
      'Parking': t.communities.grid.tags.parking,
      'Gym': t.communities.grid.tags.gym,
      'Free Bar': t.communities.grid.tags.freeBar,
      'Media Room': t.communities.grid.tags.mediaRoom,
      'Co-working & Study Spaces': t.communities.grid.tags.coworkingStudySpaces,
      'Shared Kitchen': t.communities.grid.tags.sharedKitchen,
      'Shuttle Bus': t.communities.grid.tags.shuttleBus,
      'Game Room': t.communities.grid.tags.gameRoom,
      'Billiards Room': t.communities.grid.tags.billiardsRoom,
      'Community Garden': t.communities.grid.tags.communityGarden,
      'Basketball Court': t.communities.grid.tags.basketballCourt,
      'Ping Pong Room': t.communities.grid.tags.pingPongRoom,
      'Recording Studio': t.communities.grid.tags.recordingStudio,
      'Yoga Room': t.communities.grid.tags.yogaRoom,
    }
    return tagMap[tag] || tag
  }

  const communities: Community[] = [
    {
      id: 'jingan-center',
      name: t.communities.communities.jinganCenter.name,
      district: t.communities.communities.jinganCenter.district,
      description: '',
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/JINGANCENTERCOMMUNITY.webp',
      tags: ['Parking', 'Gym', 'Free Bar', 'Media Room', 'Co-working & Study Spaces', 'Shared Kitchen', 'Shuttle Bus'],
      priceRange: '¥3500-4200/month',
      priceRangeUSD: '$486-583/month',
      availableUnits: 5,
      subwayInfo: t.communities.communities.jinganCenter.subwayInfo
    },
    {
      id: 'north-hongqiao',
      name: t.communities.communities.northHongqiao.name,
      district: t.communities.communities.northHongqiao.district,
      description: '',
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/NORTHHONGQIAOCOMMUNITY.webp',
      tags: ['Parking', 'Game Room', 'Billiards Room', 'Shared Kitchen', 'Co-working & Study Spaces', 'Community Garden'],
      priceRange: '¥2688-3688/month',
      priceRangeUSD: '$373-512/month',
      availableUnits: 5,
      subwayInfo: t.communities.communities.northHongqiao.subwayInfo
    },
    {
      id: 'pujiang-center',
      name: t.communities.communities.pujiangCenter.name,
      district: t.communities.communities.pujiangCenter.district,
      description: '',
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/PUJIANG%20CENTER%20COMMUNITY.webp',
      tags: ['Parking', 'Gym', 'Basketball Court', 'Co-working & Study Spaces', 'Shared Kitchen', 'Shuttle Bus'],
      priceRange: '¥1650-2500/month',
      priceRangeUSD: '$229-347/month',
      availableUnits: 6,
      subwayInfo: t.communities.communities.pujiangCenter.subwayInfo
    },
    {
      id: 'zhonghuan-hutai',
      name: t.communities.communities.hutaiRoad.name,
      district: t.communities.communities.hutaiRoad.district,
      description: '',
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/HUTAI%20ROAD%20COMMUNITY.webp',
      tags: ['Parking', 'Gym', 'Basketball Court', 'Shared Kitchen', 'Co-working & Study Spaces', 'Community Garden'],
      priceRange: '¥2500-2900/month',
      priceRangeUSD: '$347-403/month',
      availableUnits: 4,
      subwayInfo: t.communities.communities.hutaiRoad.subwayInfo
    },
    {
      id: 'pujiang-park',
      name: t.communities.communities.pujiangPark.name,
      district: t.communities.communities.pujiangPark.district,
      description: '',
      image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/PUJIANGPARK%20COMMUNITY.webp',
      tags: ['Parking', 'Gym', 'Basketball Court', 'Ping Pong Room', 'Recording Studio', 'Yoga Room', 'Community Garden', 'Shared Kitchen', 'Co-working & Study Spaces', 'Shuttle Bus'],
      priceRange: '¥2200-2600/month',
      priceRangeUSD: '$306-361/month',
      availableUnits: 7,
      subwayInfo: t.communities.communities.pujiangPark.subwayInfo
    },
  ]

  return (
    <div className="space-y-6">
      {communities.map((community) => (
        <Link
          key={community.id}
          href={`/communities/${community.id}`}
          className="block bg-white overflow-hidden group cursor-pointer hover:opacity-95 transition-opacity duration-300 min-h-[400px]"
        >
          <div className="flex flex-col md:flex-row">
            {/* Community Image - Left Side */}
            <div className="relative w-full md:w-96 h-56 md:h-80 bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
              <Image
                src={community.image}
                alt={community.name}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%',
                  minWidth: '100%',
                  minHeight: '100%'
                }}
                sizes="(max-width: 768px) 100vw, 384px"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
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
                          <p class="text-sm opacity-70">{t.communities.grid.communityImage}</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
            
            {/* Community Info - Right Side */}
            <div className="flex-1 p-6 flex flex-col justify-center">
            <h3 
              className="text-xl font-bold mb-3 group-hover:opacity-80 transition-opacity"
              style={{
                fontFamily: 'HarmonyOS Sans SC',
                fontSize: '20px',
                fontWeight: 700,
                color: '#374151'
              }}
            >
              {community.name}
            </h3>
            
            {/* Location */}
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span 
                className="text-base text-gray-600 font-medium"
                style={{
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '16px',
                  fontWeight: 400
                }}
              >
                {community.district}
              </span>
            </div>
            
            {/* Subway Information */}
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 1024 1024">
                <path d="M691.73 162H332.27c-78.239 0-141.892 63.648-141.892 141.892V682.27c0 36.508 29.704 66.216 66.216 66.216h56.212l-46.078 56.757L220.65 862h582.698l-46.078-56.757-46.078-56.757h56.212c36.512 0 66.216-29.709 66.216-66.216V303.892C833.622 225.648 769.969 162 691.73 162z m0 56.757c46.942 0 85.135 38.189 85.135 85.135v113.513H540.378V218.757H691.73z m-359.46 0h151.351v198.649H247.135V303.892c0-46.946 38.194-85.135 85.135-85.135z m304.599 586.486H339.834l46.078-56.757h252.176l46.078 56.757h-47.297zM767.405 691.73h-510.81c-5.127 0-9.459-4.333-9.459-9.459V474.162h529.73V682.27c-0.001 5.127-4.334 9.46-9.461 9.46z" />
                <path d="M346.459 587.676m-47.297 0a47.297 47.297 0 1 0 94.594 0 47.297 47.297 0 1 0-94.594 0Z" />
                <path d="M677.541 587.676m-47.297 0a47.297 47.297 0 1 0 94.594 0 47.297 47.297 0 1 0-94.594 0Z" />
              </svg>
              <span 
                className="text-base text-gray-600 font-medium"
                style={{
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '16px',
                  fontWeight: 400
                }}
              >
                {community.subwayInfo}
              </span>
            </div>
            
            {/* Available Units */}
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span 
                className="text-base text-gray-600 font-medium"
                style={{
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '16px',
                  fontWeight: 400
                }}
              >
                {community.availableUnits} {t.communities.grid.unitTypes} {t.communities.grid.availableUnits}
              </span>
            </div>
            
            {/* Description */}
            {community.description && (
              <p 
                className="text-base text-gray-600 mb-4 leading-relaxed"
                style={{
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '16px',
                  fontWeight: 400
                }}
              >
                {community.description}
              </p>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {community.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full border border-gray-200"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: '12px',
                    fontWeight: 400
                  }}
                >
                  {getTranslatedTag(tag)}
                </span>
              ))}
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <div 
                className="text-lg font-bold"
                style={{
                  fontFamily: 'HarmonyOS Sans SC',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#7da84c'
                }}
              >
                {community.priceRangeUSD}
                <span 
                  className="ml-2 text-sm font-normal"
                  style={{
                    fontFamily: 'HarmonyOS Sans SC',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#6b7280'
                  }}
                >
                  ({community.priceRange})
                </span>
              </div>
            </div>
            
            {/* Learn More Indicator */}
            <div className="inline-flex items-center text-base font-medium self-start text-gray-400 group-hover:text-gray-600 transition-colors">
              {t.communities.grid.learnMore}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
