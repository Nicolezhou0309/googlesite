'use client'

import React, { useEffect, useState } from 'react'
import FigmaDesign from '@/components/FigmaDesign'

export default function Home() {
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
      <FigmaDesign />
    </div>
  )
}
