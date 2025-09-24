'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">微领地青年公寓</span>
                <div className="text-xs text-gray-500">Vlinker Youth Community</div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="text-gray-700 hover:text-primary-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-colors">
              About Vlinker
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-primary-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-colors">
              Our Communities
            </Link>
            <Link href="/apartments" className="text-gray-700 hover:text-primary-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-colors">
              Newsroom & Events
            </Link>
            <Link href="/contact" className="bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
                首页
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
                社区介绍
              </Link>
              <Link href="/apartments" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
                房型介绍
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium">
                品牌介绍
              </Link>
              <Link href="/contact" className="bg-primary-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">
                联系我们
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
