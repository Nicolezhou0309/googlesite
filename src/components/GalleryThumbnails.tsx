'use client'

import React from 'react'
import Image from 'next/image'
import { getOSSImageUrl, getIconImageUrl } from '@/lib/imageConfig'
import { useLanguage } from '@/contexts/LanguageProvider'

interface Photo {
  src: string
  width: number
  height: number
  alt?: string
  thumbnail?: string
}

interface GalleryThumbnailsProps {
  communityId: string
  onOpenModal: (folder?: string) => void
  className?: string
}

// 获取缩略图图片的静态函数
function getThumbnailImages(communityId: string): Photo[] {
  const thumbnails: Photo[] = []
  
  // 使用OSS上的webp格式缩略图
  for (let i = 1; i <= 7; i++) {
    thumbnails.push({
      src: getOSSImageUrl(`/images/communities/${communityId}/缩略图/${i}.webp`),
      width: 800,
      height: 600,
      alt: `${communityId} thumbnail ${i}`,
      thumbnail: getOSSImageUrl(`/images/communities/${communityId}/缩略图/${i}.webp`)
    })
  }
  
  return thumbnails
}

export default function GalleryThumbnails({ communityId, onOpenModal, className = '' }: GalleryThumbnailsProps) {
  const { language } = useLanguage()
  const [photos, setPhotos] = React.useState<Photo[]>([])
  const [loading, setLoading] = React.useState(true)
  const [allPhotosCount, setAllPhotosCount] = React.useState(0)

  // 初始化缩略图 - 使用API数据
  React.useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        setLoading(true)
        
        // 从API获取缩略图数据
        const response = await fetch(`/api/gallery-images/?communityId=${communityId}&limit=50&language=${language}`)
        if (!response.ok) {
          throw new Error(`API请求失败: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('GalleryThumbnails: 从API获取到的数据:', data)
        
        // 优先使用缩略图文件夹的图片，如果没有则使用其他图片
        const thumbnailImages = data.groupedByFolder[`public/images/communities/${communityId}/缩略图`] || []
        let selectedPhotos = []
        
        if (thumbnailImages.length >= 7) {
          // 如果有足够的缩略图，使用前7张
          selectedPhotos = thumbnailImages.slice(0, 7)
        } else {
          // 否则从所有图片中选择前7张
          selectedPhotos = data.images.slice(0, 7)
        }
        
        // 转换为组件需要的格式
        const formattedPhotos = selectedPhotos.map((img: any) => ({
          src: img.src,
          width: img.width || 800,
          height: img.height || 600,
          alt: img.alt || img.fileName,
          thumbnail: img.thumbnail || img.src
        }))
        
        setPhotos(formattedPhotos)
        setAllPhotosCount(data.total || 0)
        
      } catch (error) {
        console.error('Error fetching thumbnails from API:', error)
        // 提供后备方案 - 使用硬编码的缩略图路径
        const fallbackThumbnails = getThumbnailImages(communityId)
        setPhotos(fallbackThumbnails)
        setAllPhotosCount(58) // 后备数量
      } finally {
        setLoading(false)
      }
    }

    fetchThumbnails()
  }, [communityId])

  // 取前7张图片：1张大图 + 6张小卡片
  const { mainPhoto, previewPhotos } = React.useMemo(() => {
    const mainPhoto = photos[0] // 第一张作为大图
    const previewPhotos = photos.slice(1, 7) // 接下来6张作为小卡片
    return { mainPhoto, previewPhotos }
  }, [photos])

  if (loading) {
    return (
      <div className={`gallery-container ${className}`}>
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          </div>
          <div className="gallery-skeleton-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="gallery-skeleton-item"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (photos.length === 0) {
    return null
  }

  return (
    <div className={`gallery-container ${className}`}>
      {/* 一拖六布局 - 只显示缩略图，快速加载 */}
      <div className="gallery-grid">
        {/* 主图 - 在所有屏幕尺寸下都显示 */}
        <div className="gallery-main-container">
          <div
            className="gallery-main-photo bg-gray-100 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('Main photo clicked, opening modal')
              console.log('onOpenModal function:', onOpenModal)
              onOpenModal() // 不传递文件夹参数，显示所有图片
            }}
          >
            <Image
              src={mainPhoto?.src || getIconImageUrl('placeholder.webp')}
              alt={mainPhoto?.alt || 'Main photo'}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              onError={(e) => {
                const target = e.target as HTMLImageElement
                const parent = target.parentElement
                
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div class="text-center text-gray-400">
                        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2 mx-auto">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p class="text-xs opacity-70">加载失败</p>
                      </div>
                    </div>
                  `
                }
              }}
            />
          </div>
        </div>

        {/* 预览卡片 */}
        <div className="gallery-preview-container">
          <div className="gallery-preview-grid">
            {previewPhotos.map((photo, index) => {
              const isLastPhoto = index === previewPhotos.length - 1
              return (
                <div
                  key={index}
                  className="gallery-preview-item bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Preview photo clicked, opening modal')
                    console.log('onOpenModal function:', onOpenModal)
                    onOpenModal() // 不传递文件夹参数，显示所有图片
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt || `Photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      const parent = target.parentElement
                      
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div class="text-center text-gray-400">
                              <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mb-1 mx-auto">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <p class="text-xs opacity-70">加载失败</p>
                            </div>
                          </div>
                        `
                      }
                    }}
                  />
                  
                  {/* 最后一张图片的特殊蒙版 */}
                  {isLastPhoto && (
                    <div className="gallery-preview-overlay">
                      <div className="view-all-text">
                        {language === 'zh' ? `查看所有${allPhotosCount}张照片` : `View all ${allPhotosCount} photos`}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
