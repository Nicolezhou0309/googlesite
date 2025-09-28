'use client'

import React, { useEffect, useState } from 'react'
import CommunityCarousel from '@/components/CommunityCarousel'
import CommunityGrid from '@/components/CommunityGrid'

export default function CommunityPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`transition-all duration-700 ease-out ${
      isLoaded 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`}>
      <CommunityCarousel />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CommunityGrid />
      </div>
    </div>
  )
}