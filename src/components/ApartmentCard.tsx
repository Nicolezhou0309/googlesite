'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageProvider'
import { getOSSImageUrl } from '@/lib/imageConfig'
import { ApartmentCardProps, ApartmentImage } from '@/lib/types'
import CheckIcon from '@/components/ui/CheckIcon'
import { convertCNYToUSD, formatUSDPrice, formatCNYPrice } from '@/lib/utils'

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  apartment,
  onImageClick,
  onCardClick,
  showPrice = true,
  showArea = true,
  variant = 'default',
  imageLayout = 'one-drag-two',
  className = ''
}) => {
  const { language } = useLanguage()
  const [imageError, setImageError] = useState<Set<string>>(new Set())

  // 处理图片错误
  const handleImageError = (src: string) => {
    setImageError(prev => new Set(prev).add(src))
  }

  // 格式化价格区间 - 支持中英双语，英文版显示美元换算
  const formatPriceRange = (priceRange?: { min: number; max: number }, currency = 'CNY') => {
    if (!priceRange) {
      if (language === 'zh') {
        return formatCNYPrice(apartment.price)
      } else {
        // 英文版显示美元换算
        const usdPrice = convertCNYToUSD(apartment.price)
        return formatUSDPrice(usdPrice)
      }
    }
    
    if (language === 'zh') {
      if (currency === 'CNY') {
        return `¥${priceRange.min.toLocaleString()}-${priceRange.max.toLocaleString()}`
      }
      return `${currency} ${priceRange.min.toLocaleString()}-${priceRange.max.toLocaleString()}`
    } else {
      // 英文版显示美元换算
      if (currency === 'CNY') {
        const minUSD = convertCNYToUSD(priceRange.min)
        const maxUSD = convertCNYToUSD(priceRange.max)
        return `$${minUSD.toLocaleString()}-${maxUSD.toLocaleString()}`
      }
      return `${currency} ${priceRange.min.toLocaleString()}-${priceRange.max.toLocaleString()}`
    }
  }

  // 格式化面积区间 - 支持中英双语
  const formatAreaRange = (areaRange?: { min: number; max: number }) => {
    if (!areaRange) {
      if (language === 'zh') {
        return `${apartment.area}㎡`
      } else {
        return `${apartment.area}㎡`
      }
    }
    
    if (language === 'zh') {
      return `${areaRange.min}-${areaRange.max}㎡`
    } else {
      return `${areaRange.min}-${areaRange.max}㎡`
    }
  }


  // 处理图片数据，确保有主图
  const processedImages = useMemo(() => {
    if (!apartment.images || apartment.images.length === 0) {
      return []
    }

    // 按order排序，如果没有order则按isMain排序
    const sortedImages = [...apartment.images].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      if (a.isMain && !b.isMain) return -1
      if (!a.isMain && b.isMain) return 1
      return 0
    })

    return sortedImages
  }, [apartment.images])

  // 获取主图和预览图
  const { mainImage, previewImages } = useMemo(() => {
    if (processedImages.length === 0) {
      return { mainImage: null, previewImages: [] }
    }

    const mainImage = processedImages[0]
    const previewImages = processedImages.slice(1, 3) // 最多2张预览图

    return { mainImage, previewImages }
  }, [processedImages])

  // 渲染一拖二图片布局 - 使用画册同款样式
  const renderOneDragTwoLayout = () => {
    if (!mainImage) {
      return (
        <div className="apartment-image-container">
          <div className="apartment-main-image-placeholder">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )
    }

    return (
      <div className="apartment-gallery-layout-vertical">
        {/* 主图 - 使用画册样式，大卡在上方 */}
        <div className="apartment-main-photo">
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer group">
            <Image
              src={mainImage.thumbnail || mainImage.src}
              alt={mainImage.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              onError={() => handleImageError(mainImage.src)}
              onClick={() => {
                if (onImageClick) {
                  // 传递文件夹信息：户型图/房型名称
                  onImageClick(mainImage, 0, `户型图/${apartment.name}`)
                }
              }}
            />
            
            {/* 底部渐变蒙版和价格面积信息 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
              <div className="flex justify-between items-end text-white">
                <div className="flex flex-col">
                  {showPrice && (
                    <>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-xl font-bold">
                          {formatPriceRange(apartment.priceRange, apartment.currency)}
                        </span>
                        <span className="text-sm opacity-80">
                          {language === 'zh' ? '/月' : '/month'}
                        </span>
                      </div>
                      {/* 费用标签 */}
                      <div className="flex flex-wrap gap-3 text-xs">
                        <div className="flex items-center gap-1 text-green-400">
                          <CheckIcon className="text-green-400" size="sm" />
                          <span className="opacity-90">
                            {language === 'zh' ? '无中介费' : 'No Agency Fee'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                          <CheckIcon className="text-green-400" size="sm" />
                          <span className="opacity-90">
                            {language === 'zh' ? '无服务费' : 'No Service Fee'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                          <CheckIcon className="text-green-400" size="sm" />
                          <span className="opacity-90">
                            {language === 'zh' ? '已含税费' : 'Tax Included'}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  {showArea && apartment.layout && (
                    <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                      <span>{formatAreaRange(apartment.areaRange)}</span>
                      <span className="text-xs opacity-80">·</span>
                      <span className="text-xs opacity-80">
                        {language === 'zh' ? apartment.layout : apartment.layoutEn}
                      </span>
                    </div>
                  )}
                  {showArea && !apartment.layout && (
                    <div className="text-sm font-medium opacity-90">
                      {formatAreaRange(apartment.areaRange)}
                    </div>
                  )}
                  {!showArea && apartment.layout && (
                    <div className="text-sm font-medium opacity-90">
                      {language === 'zh' ? apartment.layout : apartment.layoutEn}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 预览图 - 使用画册样式，小卡在下方 */}
        {previewImages.length > 0 && (
          <div className="apartment-preview-grid-horizontal">
            {previewImages.map((image, index) => (
              <div key={image.id} className="apartment-preview-item">
                <Image
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300 ease-out"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  onError={() => handleImageError(image.src)}
                  onClick={() => {
                    if (onImageClick) {
                      // 传递文件夹信息：户型图/房型名称
                      onImageClick(image, index + 1, `户型图/${apartment.name}`)
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // 渲染网格图片布局
  const renderGridLayout = () => {
    if (processedImages.length === 0) {
      return (
        <div className="apartment-image-container">
          <div className="apartment-main-image-placeholder">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )
    }

    return (
      <div className="apartment-image-container">
        <div className="apartment-grid-images">
          {processedImages.slice(0, 4).map((image, index) => (
            <div key={image.id} className={`relative overflow-hidden cursor-pointer group ${
              index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
            }`}>
                <Image
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300 ease-out"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority={false}
                  loading="lazy"
                  placeholder="empty"
                  onError={() => handleImageError(image.src)}
                  onClick={() => {
                    if (onImageClick) {
                      // 传递文件夹信息：户型图/房型名称
                      onImageClick(image, index, `户型图/${apartment.name}`)
                    }
                  }}
                />
                
                {/* 主图上的底部渐变蒙版和价格面积信息 */}
                {index === 0 && (
                  <>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
                      <div className="flex justify-between items-end text-white">
                        <div className="flex flex-col">
                          {showPrice && (
                            <>
                              <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-xl font-bold">
                                  {formatPriceRange(apartment.priceRange, apartment.currency)}
                                </span>
                                <span className="text-sm opacity-80">
                                  {language === 'zh' ? '/月' : '/month'}
                                </span>
                              </div>
                              {/* 费用标签 */}
                              <div className="flex flex-wrap gap-3 text-xs">
                                <div className="flex items-center gap-1 text-green-400">
                                  <CheckIcon className="text-green-400" size="sm" />
                                  <span className="opacity-90">
                                    {language === 'zh' ? '无中介费' : 'No Agency Fee'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-green-400">
                                  <CheckIcon className="text-green-400" size="sm" />
                                  <span className="opacity-90">
                                    {language === 'zh' ? '无服务费' : 'No Service Fee'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-green-400">
                                  <CheckIcon className="text-green-400" size="sm" />
                                  <span className="opacity-90">
                                    {language === 'zh' ? '已含税费' : 'Tax Included'}
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {showArea && apartment.layout && (
                            <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                              <span>{formatAreaRange(apartment.areaRange)}</span>
                              <span className="text-xs opacity-80">·</span>
                              <span className="text-xs opacity-80">
                                {language === 'zh' ? apartment.layout : apartment.layoutEn}
                              </span>
                            </div>
                          )}
                          {showArea && !apartment.layout && (
                            <div className="text-sm font-medium opacity-90">
                              {formatAreaRange(apartment.areaRange)}
                            </div>
                          )}
                          {!showArea && apartment.layout && (
                            <div className="text-sm font-medium opacity-90">
                              {language === 'zh' ? apartment.layout : apartment.layoutEn}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
          ))}
        </div>
      </div>
    )
  }

  // 渲染图片布局
  const renderImageLayout = () => {
    switch (imageLayout) {
      case 'one-drag-two':
        return renderOneDragTwoLayout()
      case 'grid':
        return renderGridLayout()
      default:
        return renderOneDragTwoLayout()
    }
  }

  return (
    <div 
      className={`apartment-card ${variant} ${className}`}
      onClick={() => onCardClick?.(apartment)}
    >
      {/* 图片区域 */}
      {renderImageLayout()}

      {/* 内容区域 - 已完全移除描述性文字 */}
    </div>
  )
}

export default ApartmentCard
