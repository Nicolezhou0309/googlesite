'use client'

import React, { useState, useEffect } from 'react'
import ApartmentCard from './ApartmentCard'
import { Apartment, ApartmentImage } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageProvider'
import { getCommunityFolderStructure } from '@/lib/communityConfig'
import { getCommunityImageUrl } from '@/lib/imageConfig'
import { 
  apartmentConfigs, 
  getRoomConfigByFolderName, 
  getFolderNamesByCommunityId,
  formatPriceRange,
  formatAreaRange
} from '@/lib/apartmentData'

// 获取房型图片的函数
const getRoomTypeImages = async (communityId: string, folderName: string): Promise<ApartmentImage[]> => {
  try {
    // 从API获取该房型的图片
    const response = await fetch(`/api/gallery-images?communityId=${communityId}&folder=户型图/${folderName}&limit=10`)
    if (!response.ok) {
      console.warn(`Failed to fetch images for ${folderName}: ${response.status}`)
      return []
    }
    
    const data = await response.json()
    const images = data.images || []
    
    // 转换为ApartmentImage格式，最多取3张
    return images.slice(0, 3).map((img: any, index: number) => ({
      id: `${communityId}-${folderName}-${index + 1}`,
      src: img.src,
      alt: img.alt || `${folderName} - 图片 ${index + 1}`,
      width: img.width || 800,
      height: img.height || 600,
      isMain: index === 0,
      order: index
    }))
  } catch (error) {
    console.error(`Error fetching images for ${folderName}:`, error)
    // 提供后备方案 - 使用默认图片
    return Array.from({ length: 3 }, (_, i) => ({
      id: `${communityId}-${folderName}-${i + 1}`,
      src: getCommunityImageUrl(communityId, `户型图/${folderName}/${i + 1}.webp`),
      alt: `${folderName} - 图片 ${i + 1}`,
      width: 800,
      height: 600,
      isMain: i === 0,
      order: i
    }))
  }
}

// 生成房型数据的函数
const generateApartmentData = async (communityId?: string): Promise<Apartment[]> => {
  if (!communityId) return []
  
  try {
    // 获取该社区的所有文件夹名称
    const folderNames = getFolderNamesByCommunityId(communityId)
    
    const apartments = await Promise.all(
      folderNames.map(async (folderName, index) => {
        const roomConfig = getRoomConfigByFolderName(communityId, folderName)
        
        // 如果没有找到配置，使用默认值
        if (!roomConfig) {
          console.warn(`No room config found for ${folderName} in ${communityId}`)
          return null
        }
        
        // 获取房型图片
        const images = await getRoomTypeImages(communityId, folderName)
        
        return {
          id: `${communityId}-${folderName}`,
          name: folderName,
          displayName: folderName,
          displayNameEn: roomConfig.displayNameEn,
          communityId,
          description: `舒适的${folderName}，配备现代化设施`,
          price: roomConfig.priceRange.min, // 使用最低价格
          priceRange: roomConfig.priceRange,
          currency: roomConfig.currency,
          area: roomConfig.areaRange.min, // 使用最小面积
          areaRange: roomConfig.areaRange,
          layout: roomConfig.layout,
          layoutEn: roomConfig.layoutEn,
          images,
          features: [
            '独立卫生间',
            '现代化厨房',
            '高速WiFi',
            '24小时热水',
            '空调暖气'
          ],
          facilities: [
            '空调',
            '冰箱',
            '洗衣机',
            '热水器',
            '网络'
          ],
          availability: 'available' as const,
          floor: Math.floor(Math.random() * 10) + 1,
          orientation: '南向',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      })
    )
    
    return apartments.filter(Boolean) as Apartment[] // 过滤掉null值
  } catch (error) {
    console.error('Error generating apartment data:', error)
    return []
  }
}

interface ApartmentCardGridProps {
  communityId?: string
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
  imageLayout?: 'one-drag-two' | 'grid' | 'carousel'
  maxItems?: number
  onImageClick?: (image: any, index: number, folder?: string) => void
}

const ApartmentCardGrid: React.FC<ApartmentCardGridProps> = ({
  communityId,
  className = '',
  variant = 'default',
  imageLayout = 'one-drag-two',
  maxItems,
  onImageClick
}) => {
  const { language } = useLanguage()
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 获取房型数据 - 使用API动态获取图片
  useEffect(() => {
    const loadApartments = async () => {
      try {
        setLoading(true)
        setError(null)

        // 使用API动态生成房型数据
        const apartmentsData = await generateApartmentData(communityId)
        
        // 限制显示数量
        const limitedData = maxItems 
          ? apartmentsData.slice(0, maxItems)
          : apartmentsData

        setApartments(limitedData)
      } catch (err) {
        console.error('Error loading apartments:', err)
        setError(err instanceof Error ? err.message : '获取房型数据失败')
      } finally {
        setLoading(false)
      }
    }

    loadApartments()
  }, [communityId, maxItems])

  // 处理房型卡片点击
  const handleApartmentClick = (apartment: Apartment) => {
    console.log('房型卡片被点击:', apartment)
    // 房型卡片点击事件，可以在这里添加其他逻辑
  }

  // 处理图片点击
  const handleImageClick = (image: any, index: number, folder?: string) => {
    console.log('图片被点击:', image, index, folder)
    // 如果有外部传入的回调，则调用它
    if (onImageClick) {
      onImageClick(image, index, folder)
    }
  }

  // 加载状态
  if (loading) {
    return (
      <div className={`apartment-grid-container ${className}`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="apartment-card-skeleton">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 错误状态
  if (error) {
    return (
      <div className={`apartment-grid-container ${className}`}>
        <div className="col-span-full text-center py-8">
          <div className="text-red-500 mb-2">
            {language === 'zh' ? '加载房型数据失败' : 'Failed to load apartment data'}
          </div>
          <div className="text-gray-500 text-sm">{error}</div>
        </div>
      </div>
    )
  }

  // 无数据状态
  if (apartments.length === 0) {
    return (
      <div className={`apartment-grid-container ${className}`}>
        <div className="col-span-full text-center py-8">
          <div className="text-gray-500">
            {language === 'zh' ? '暂无房型数据' : 'No apartment data available'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`apartment-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ${className}`}>
      {apartments.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          apartment={apartment}
          variant={variant}
          imageLayout={imageLayout}
          onCardClick={handleApartmentClick}
          onImageClick={handleImageClick}
          showPrice={true}
          showArea={true}
        />
      ))}

    </div>
  )
}

export default ApartmentCardGrid