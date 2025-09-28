'use client'

import React from 'react'
import Navigation from '@/components/Navigation'

interface PageLayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
  className?: string
}

export default function PageLayout({ 
  children, 
  showNavigation = true, 
  className = '' 
}: PageLayoutProps) {
  return (
    <div className={`bg-white ${className}`}>
      {showNavigation && <Navigation />}
      <div className={showNavigation ? 'pt-[70px]' : ''}>
        {children}
      </div>
    </div>
  )
}
