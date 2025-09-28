'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageProvider'
import CommunityGallery from './CommunityGallery'
import ApartmentCardGrid from './ApartmentCardGrid'
import GalleryModal from './GalleryModal'
import { getOSSImageUrl, getCommunityImageUrl } from '@/lib/imageConfig'
import { getCommunityDescriptionByCommunityId, testOSSPath } from '@/lib/apartmentData'
import AmenityCardGrid from './AmenityCardGrid'
import LeafIcon from './ui/LeafIcon'
import RoomAmenities from './RoomAmenities'
import CommunityAmenities from './CommunityAmenities'
import OurServices from './OurServices'



const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'bg-green-100 text-green-800'
    case 'construction':
      return 'bg-yellow-100 text-yellow-800'
    case 'planned':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'operational':
      return '运营中'
    case 'construction':
      return '建设中'
    case 'planned':
      return '规划中'
    default:
      return '未知'
  }
}

interface CommunityDetailProps {
  communityId: string
}

export default function CommunityDetail({ communityId }: CommunityDetailProps) {
  const { language } = useLanguage()
  const community = getCommunityDescriptionByCommunityId(communityId)
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const [galleryInitialFolder, setGalleryInitialFolder] = useState<string | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // 测试OSS路径构建
  useEffect(() => {
    testOSSPath(communityId)
  }, [communityId])

  // 页面加载动画
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 处理房型图片点击
  const handleApartmentImageClick = (image: any, index: number, folder?: string) => {
    if (folder) {
      setGalleryInitialFolder(folder)
    }
    setGalleryModalOpen(true)
  }

  // 处理公区设施图片点击
  const handleAmenityImageClick = (folderName: string) => {
    // 构建公区文件夹路径
    const publicAreaFolder = `公区/${folderName}`
    setGalleryInitialFolder(publicAreaFolder)
    setGalleryModalOpen(true)
  }

  // 关闭画廊
  const handleCloseGallery = () => {
    setGalleryModalOpen(false)
    setGalleryInitialFolder(undefined)
  }

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'zh' ? '社区未找到' : 'Community Not Found'}
          </h1>
          <Link href="/communities" className="text-primary-600 hover:text-primary-700">
            {language === 'zh' ? '返回社区列表' : 'Back to Communities'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 optimize-scrolling transition-all duration-700 ease-out ${
      isLoaded 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`}>
      {/* Breadcrumb */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#7DA84C] hover:text-[#6a8f3f]">
              {language === 'zh' ? '首页' : 'Home'}
            </Link>
            <svg className="w-4 h-4 text-[#7DA84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/communities" className="text-[#7DA84C] hover:text-[#6a8f3f]">
              {language === 'zh' ? '社区列表' : 'Communities'}
            </Link>
            <svg className="w-4 h-4 text-[#7DA84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#7DA84C] font-medium">
              {language === 'zh' ? community.name : (community.nameEn || community.name)}
            </span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-white text-gray-900 py-4">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题和地理位置 */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-left">
              {language === 'zh' ? community.name : (community.nameEn || community.name)}
            </h1>
            {community.address && (
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{language === 'zh' ? community.address : (community.addressEn || community.address)}</span>
              </div>
            )}
          </div>
          
          {/* Community Gallery */}
          <div className="mb-8">
            <CommunityGallery communityId={communityId} />
          </div>
          
          {/* 描述信息 */}
          <div className="text-left">
            <p className="text-base text-gray-600">
              {language === 'zh' ? community.description : (community.descriptionEn || community.description)}
            </p>
          </div>
        </div>
      </section>

      {/* 分割线 */}
      <div className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      {/* 房型卡片展示区域 - 基于OSS户型图自动生成 */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              {/* 左侧装饰图标 - 精美叶子图案 */}
              <div className="flex items-center mr-2">
                <LeafIcon 
                  size={48} 
                  color="#86A758" 
                  className="opacity-90 drop-shadow-sm scale-x-[-1]" 
                />
              </div>
              
              {/* 标题 */}
              <h2 className="text-3xl font-bold text-gray-900 relative">
                {language === 'zh' ? '精选房型' : 'SELECTED STUDIO'}
              </h2>
              
              {/* 右侧装饰图标 - 镜像叶子图案 */}
              <div className="flex items-center ml-2">
                <LeafIcon 
                  size={48} 
                  color="#86A758" 
                  className="opacity-90 drop-shadow-sm" 
                />
              </div>
            </div>
            <p className="text-xl text-gray-600">
              {language === 'zh' ? '从功能到美学，为你呈现无需妥协的理想家' : 'From function to aesthetics, presenting your ideal home without compromise'}
            </p>
          </div>
          <ApartmentCardGrid 
            communityId={communityId}
            variant="detailed"
            imageLayout="one-drag-two"
            maxItems={8}
            onImageClick={handleApartmentImageClick}
          />
        </div>
      </section>

      {/* 优惠活动飘带 */}
      <section className="bg-gradient-to-r from-[#86A758] to-[#7DA84C] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 cursor-pointer hover:text-white/90 transition-colors">
              <a href="#contact" className="flex items-center justify-center gap-2">
                {language === 'zh' ? '咨询每日优惠活动' : 'Inquire About Daily Special Offers'}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </h3>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === 'zh' 
                ? '我们承诺官网直订即为最优惠价格，绝无中间差价，为您省心更省钱'
                : (
                    <>
                      We guarantee the best price when you book directly on our official website.<br />
                      No middleman markups, saving you money and hassle.
                    </>
                  )
              }
            </p>
          </div>
        </div>
      </section>

      {/* Room Amenities - 使用组件化实现 */}
      <RoomAmenities />

      {/* 分割线 */}
      <div className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      {/* Community Amenities - 使用组件化实现 */}
      <CommunityAmenities 
        communityId={communityId}
        amenityNames={community.communityAmenityNames}
        onImageClick={handleAmenityImageClick}
      />

      {/* 分割线 */}
      <div className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      {/* Our Services - 使用组件化实现 */}
      <OurServices serviceNames={community.serviceNames} />

      {/* 画廊模态框 */}
      <GalleryModal
        isOpen={galleryModalOpen}
        onClose={handleCloseGallery}
        communityId={communityId}
        initialFolder={galleryInitialFolder}
      />

    </div>
  )
}
