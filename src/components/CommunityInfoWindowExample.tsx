'use client'

import React from 'react'
import CommunityInfoWindow from './CommunityInfoWindow'

// 示例社区数据
const exampleCommunity = {
  id: 'jingan-center',
  position: { lat: 31.311276, lng: 121.446857 },
  title: "JING'AN CENTER COMMUNITY",
  displayName: "新静安中心微领地青年社区",
  district: "Jing'an District",
  description: "Located on Linfen Road<br/>Modern youth community<br/>Convenient transportation access",
  image: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/Facade/JINGANCENTERCOMMUNITY.webp',
  tags: ['Parking', 'Gym', 'Free Bar', 'Media Room', 'Co-working & Study Spaces', 'Shared Kitchen', 'Shuttle Bus'],
  priceRange: '¥3500-4200/month',
  priceRangeUSD: '$486-583/month',
  availableUnits: 5,
  subwayInfo: 'Line 1 Pengpu Xincun Station 500m walk'
}

const CommunityInfoWindowExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Community Info Window Component</h1>
        <div className="flex justify-center">
          <CommunityInfoWindow community={exampleCommunity} />
        </div>
      </div>
    </div>
  )
}

export default CommunityInfoWindowExample
