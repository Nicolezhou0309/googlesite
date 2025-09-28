'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { useLanguage } from '@/contexts/LanguageProvider'
import { getOSSImageUrl, getIconImageUrl } from '@/lib/imageConfig'
import { getCommunityFolderStructure } from '@/lib/communityConfig'
import { lockScroll, unlockScroll } from '@/lib/scrollUtils'
import { getFolderDisplayName, getCommunityDisplayName } from '@/lib/folderTranslations'

interface Photo {
  src: string
  width: number
  height: number
  alt?: string
  thumbnail?: string
  folder?: string
}

interface Folder {
  name: string
  displayName: string
  count: number
  path: string
  subfolders?: Array<{
    name: string
    displayName: string
    count: number
    path: string
  }>
}

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  communityId: string
  initialFolder?: string // 初始文件夹路径
  folderPath?: string // 直接指定的文件夹路径（用于户型图等）
}

// 从API获取所有图片的动态函数
async function getAllGalleryImages(communityId: string, folder?: string, language: 'zh' | 'en' = 'zh'): Promise<Photo[]> {
  try {
    const params = new URLSearchParams({
      communityId,
      limit: '1000', // 获取所有图片
      language
    })
    
    if (folder) {
      params.append('folder', folder)
    }
    
    const response = await fetch(`/api/gallery-images/?${params}`)
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`)
    }
    
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('GalleryModal: 获取图片失败:', error)
    return []
  }
}

export default function GalleryModal({ isOpen, onClose, communityId, initialFolder, folderPath }: GalleryModalProps) {
  const { language } = useLanguage()
  const [allPhotos, setAllPhotos] = useState<Photo[]>([])
  const [modalLoading, setModalLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadingFolder, setLoadingFolder] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [visiblePhotos, setVisiblePhotos] = useState<Photo[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [folders, setFolders] = useState<Folder[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [showFolderIndex, setShowFolderIndex] = useState(false)
  const [totalPhotosCount, setTotalPhotosCount] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const PHOTOS_PER_PAGE = 20 // 每页显示20张图片


  // 响应式布局：在桌面端自动显示侧边栏
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFolderIndex(true)
      } else {
        setShowFolderIndex(false)
      }
    }
    
    // 初始检查
    handleResize()
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 获取文件夹结构 - 从API动态获取
  useEffect(() => {
    const loadFolderStructure = async () => {
      try {
        const response = await fetch(`/api/gallery-images/?communityId=${communityId}&limit=1&language=${language}`)
        if (response.ok) {
          const data = await response.json()
          
          // 将API返回的文件夹数据转换为组件需要的格式，过滤掉缩略图文件夹
          const dynamicFolders = data.folderCounts
            ?.filter((folderInfo: any) => 
              !folderInfo.path.includes('缩略图') && 
              !folderInfo.path.includes('thumbnail') &&
              !folderInfo.displayName.includes('缩略图') &&
              !folderInfo.displayName.includes('thumbnail')
            )
            ?.map((folderInfo: any) => ({
              name: folderInfo.displayName,
              displayName: folderInfo.displayName, // API已经返回翻译后的名称，直接使用
              count: folderInfo.count,
              path: folderInfo.path
            })) || []
          
          // 计算总图片数量
          const totalCount = dynamicFolders.reduce((sum: number, folder: any) => sum + folder.count, 0)
          
          setFolders(dynamicFolders)
          setTotalPhotosCount(totalCount)
        } else {
          // 如果API失败，回退到静态配置
          const staticFolders = getCommunityFolderStructure(communityId)
          setFolders(staticFolders)
        }
      } catch (error) {
        console.error('获取文件夹结构失败，使用静态配置:', error)
        const staticFolders = getCommunityFolderStructure(communityId)
        setFolders(staticFolders)
      }
    }
    
    if (communityId) {
      loadFolderStructure()
    }
  }, [communityId])

  // 当modal打开时，获取所有图片数据
  useEffect(() => {
    if (isOpen) {
      const loadImages = async () => {
        setModalLoading(true)
        try {
          // 如果直接指定了文件夹路径，使用该路径（但忽略缩略图文件夹）
          if (folderPath) {
            // 检查是否是缩略图文件夹
            if (folderPath.includes('缩略图') || folderPath.includes('thumbnail') || folderPath.includes('Thumbnail')) {
              console.log('忽略缩略图文件夹路径:', folderPath)
              setAllPhotos([])
              setSelectedFolder(null)
              setVisiblePhotos([])
              setHasMore(false)
            } else {
              const filteredImages = await getAllGalleryImages(communityId, folderPath, language)
              setAllPhotos(filteredImages)
              setSelectedFolder(folderPath)
              setVisiblePhotos(filteredImages.slice(0, PHOTOS_PER_PAGE))
              setHasMore(filteredImages.length > PHOTOS_PER_PAGE)
            }
          }
          // 如果有初始文件夹，直接加载该文件夹的图片（但忽略缩略图文件夹）
          else if (initialFolder) {
            // 检查是否是缩略图文件夹
            if (initialFolder.includes('缩略图') || initialFolder.includes('thumbnail') || initialFolder.includes('Thumbnail')) {
              console.log('忽略缩略图初始文件夹:', initialFolder)
              setAllPhotos([])
              setSelectedFolder(null)
              setVisiblePhotos([])
              setHasMore(false)
            } else {
              const filteredImages = await getAllGalleryImages(communityId, initialFolder, language)
              setAllPhotos(filteredImages)
              setSelectedFolder(initialFolder)
              setVisiblePhotos(filteredImages.slice(0, PHOTOS_PER_PAGE))
              setHasMore(filteredImages.length > PHOTOS_PER_PAGE)
            }
          } else {
            const allImages = await getAllGalleryImages(communityId, undefined, language)
            setAllPhotos(allImages)
            setSelectedFolder(null)
            setVisiblePhotos(allImages.slice(0, PHOTOS_PER_PAGE))
            setHasMore(allImages.length > PHOTOS_PER_PAGE)
          }
          setCurrentPage(0)
        } catch (error) {
          console.error('Error loading images:', error)
        } finally {
          setModalLoading(false)
        }
      }
      
      loadImages()
    }
  }, [isOpen, communityId, initialFolder, folderPath])

  // 处理文件夹选择
  const handleFolderSelect = useCallback(async (folderPath: string | null) => {
    // 检查是否选择了缩略图文件夹，如果是则忽略
    if (folderPath && (
      folderPath.includes('缩略图') || 
      folderPath.includes('thumbnail') ||
      folderPath.includes('Thumbnail')
    )) {
      console.log('忽略缩略图文件夹选择:', folderPath)
      return
    }
    
    setSelectedFolder(folderPath)
    setLoadingFolder(folderPath)
    setIsTransitioning(true)
    
    try {
      const filteredImages = await getAllGalleryImages(communityId, folderPath || undefined, language)
      
      if (filteredImages.length > 0) {
        const newPhotos = filteredImages.map((photo: Photo) => ({
          ...photo,
          thumbnail: photo.thumbnail || photo.src,
          src: photo.src
        }))
        
        setAllPhotos(newPhotos)
        setVisiblePhotos(newPhotos.slice(0, PHOTOS_PER_PAGE))
        setHasMore(newPhotos.length > PHOTOS_PER_PAGE)
        setCurrentPage(0)
      } else {
        setAllPhotos([])
        setVisiblePhotos([])
        setHasMore(false)
        setCurrentPage(0)
      }
    } catch (error) {
      console.error('Error filtering folder images:', error)
    } finally {
      setLoadingFolder(null)
      // 延迟重置过渡状态，确保动画完成
      setTimeout(() => setIsTransitioning(false), 150)
    }
  }, [communityId])

  // 加载更多图片 - 从已加载的图片中获取更多
  const loadMorePhotos = useCallback(() => {
    if (!hasMore || loadingMore || allPhotos.length === 0) {
      return
    }
    
    setLoadingMore(true)
    const nextPage = currentPage + 1
    
    try {
      // 从已加载的所有图片中获取下一页
      const startIndex = nextPage * PHOTOS_PER_PAGE
      const endIndex = startIndex + PHOTOS_PER_PAGE
      const newPhotos = allPhotos.slice(startIndex, endIndex)
      
      if (newPhotos.length > 0) {
        const processedPhotos = newPhotos.map((photo: Photo) => ({
          ...photo,
          thumbnail: photo.thumbnail || photo.src,
          src: photo.src
        }))
        
        setVisiblePhotos(prev => [...prev, ...processedPhotos])
        setCurrentPage(nextPage)
        setHasMore(endIndex < allPhotos.length)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error loading more photos:', error)
      setHasMore(false)
    } finally {
      setLoadingMore(false)
    }
  }, [hasMore, currentPage, allPhotos, loadingMore])

  // 使用 ref 来引用加载更多按钮
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // 使用 Intersection Observer 实现真正的懒加载
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!isOpen || !hasMore || loadingMore || !loadMoreRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && hasMore) {
          loadMorePhotos()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    observer.observe(loadMoreRef.current)

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
      observer.disconnect()
    }
  }, [isOpen, hasMore, loadingMore, loadMorePhotos])

  // 焦点管理引用
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // ESC键关闭弹窗和滚动锁定
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      // 添加键盘事件监听
      document.addEventListener('keydown', handleEsc)
      
      // 滚动锁定 - 防止背景滚动
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // 防止滚动条消失导致的布局跳动
      
      // 添加模态框打开类
      document.body.classList.add('modal-open')
      
      // 焦点管理 - 将焦点设置到模态框
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus()
        }
      }, 100)
      
      return () => {
        document.removeEventListener('keydown', handleEsc)
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
        document.body.classList.remove('modal-open')
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  // Loading组件
  const LoadingSpinner = ({ text = '加载中...' }: { text?: string }) => (
    <div className="gallery-loading-spinner">
      <div className="relative">
        <div className="gallery-spinner"></div>
      </div>
      <p className="mt-3 text-sm text-gray-600">{text}</p>
    </div>
  )

  if (!isOpen) {
    return null
  }

  const modalContent = (
    <div 
      ref={modalRef}
      className="gallery-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
      tabIndex={-1}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="gallery-modal-content"
        style={{
          position: 'relative',
          maxWidth: 'min(90vw, 1200px)',
          maxHeight: 'min(90vh, 800px)',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>

          {/* 文件夹索引侧边栏 */}
          <div className={`gallery-sidebar ${showFolderIndex ? 'gallery-sidebar-visible' : 'gallery-sidebar-hidden'}`}>
            <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-40 h-16">
              <h4 className="text-lg font-semibold text-gray-900">
                {language === 'zh' ? '文件夹' : 'Folders'}
              </h4>
              <button
                onClick={() => setShowFolderIndex(!showFolderIndex)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto h-full pb-20 scroll-smooth optimize-scrolling">
              <div className="p-2">
                {/* 全部图片 */}
                <button
                  onClick={() => handleFolderSelect(null)}
                  disabled={loadingFolder !== null}
                  className={`gallery-folder-button ${
                    selectedFolder === null 
                      ? 'gallery-folder-button-active' 
                      : loadingFolder === null
                      ? 'gallery-folder-button-inactive'
                      : 'gallery-folder-button-disabled'
                  }`}
                >
                  <span className="font-medium">
                    {language === 'zh' ? '全部图片' : 'All Photos'}
                  </span>
                  <div className="flex items-center gap-2">
                    {loadingFolder === null ? (
                      <span className="text-sm text-gray-500">{totalPhotosCount}</span>
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                </button>
                
                {/* 文件夹列表 */}
                {folders.map((folder) => (
                  <div key={folder.name} className="mb-2">
                    <button
                      onClick={() => handleFolderSelect(folder.path)}
                      disabled={loadingFolder !== null}
                      className={`gallery-folder-button ${
                        selectedFolder === folder.path 
                          ? 'gallery-folder-button-active' 
                          : loadingFolder === null
                          ? 'gallery-folder-button-inactive'
                          : 'gallery-folder-button-disabled'
                      }`}
                    >
                      <span className="font-medium">{folder.displayName}</span>
                      <div className="flex items-center gap-2">
                        {loadingFolder === null && (
                          <span className="text-sm text-gray-500">{folder.count}</span>
                        )}
                        {loadingFolder === folder.path && (
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                        )}
                      </div>
                    </button>
                    
                    {/* 子文件夹 */}
                    {folder.subfolders && folder.subfolders.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1">
                        {folder.subfolders.map((subfolder) => (
                          <button
                            key={subfolder.name}
                            onClick={() => handleFolderSelect(subfolder.path)}
                            disabled={loadingFolder !== null}
                            className={`gallery-folder-button text-sm p-2 ${
                              selectedFolder === subfolder.path 
                                ? '' 
                                : loadingFolder === null
                                ? 'hover:bg-gray-50 text-gray-600'
                                : 'opacity-50 cursor-not-allowed text-gray-400'
                            }`}
                            style={selectedFolder === subfolder.path ? {
                              backgroundColor: 'rgb(246, 250, 241)',
                              color: 'rgb(134, 167, 88)'
                            } : {}}
                          >
                            <span>{subfolder.displayName}</span>
                            <div className="flex items-center gap-2">
                              {loadingFolder === null && (
                                <span className="text-xs text-gray-400">{subfolder.count}</span>
                              )}
                              {loadingFolder === subfolder.path && (
                                <div className="w-3 h-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

           {/* 主要内容区域 */}
           <div className="flex-1 flex flex-col">
             {/* 工具栏 */}
             <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-40 h-16">
               <div className="flex items-center gap-4">
                 <h2 id="gallery-modal-title" className="sr-only">
                   {language === 'zh' ? '图片画廊' : 'Image Gallery'}
                 </h2>
                 <button
                   onClick={() => setShowFolderIndex(!showFolderIndex)}
                   className="p-2 hover:bg-gray-100 rounded transition-colors"
                   aria-label={language === 'zh' ? '切换文件夹面板' : 'Toggle folder panel'}
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                   </svg>
                 </button>
               </div>
               <button
                 ref={closeButtonRef}
                 onClick={onClose}
                 className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                 aria-label={language === 'zh' ? '关闭画廊' : 'Close gallery'}
               >
                 <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>

            {/* 弹窗内容 */}
            <div className="h-full overflow-auto p-4 scroll-smooth optimize-scrolling">
              {modalLoading ? (
                <LoadingSpinner text={language === 'zh' ? '加载图片中...' : 'Loading images...'} />
              ) : visiblePhotos.length === 0 ? (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-500 text-center">
                    <p className="text-lg mb-2">
                      {language === 'zh' ? '没有找到图片' : 'No photos found'}
                    </p>
                    <p className="text-sm mb-2">
                      {language === 'zh' ? `总图片数: ${allPhotos.length}` : `Total photos: ${allPhotos.length}`}
                    </p>
                    <p className="text-sm mb-2">
                      {language === 'zh' ? `可见图片数: ${visiblePhotos.length}` : `Visible photos: ${visiblePhotos.length}`}
                    </p>
                    {selectedFolder && (
                      <p className="text-sm">
                        {language === 'zh' ? `当前文件夹: ${selectedFolder}` : `Current folder: ${selectedFolder}`}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                  <PhotoProvider>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                      gap: '16px'
                    }}>
                      {visiblePhotos.map((photo, index) => {
                        return (
                          <PhotoView 
                            key={`${photo.src}-${index}`} 
                            src={photo.src}
                            width={photo.width || 800}
                            height={photo.height || 600}
                          >
                            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                              <Image
                                src={photo.thumbnail || photo.src}
                                alt={photo.alt || `Photo ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="150px"
                                onError={(e) => {
                                  console.error('图片加载失败:', photo.src)
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
                          </PhotoView>
                        )
                      })}
                    </div>
                  </PhotoProvider>
                  
                  {/* 加载更多触发器 - 用于Intersection Observer */}
                  {hasMore && (
                    <div 
                      ref={loadMoreRef}
                      className="flex justify-center mt-6 py-4"
                    >
                      {loadingMore ? (
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                          {language === 'zh' ? '加载中...' : 'Loading...'}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">
                          {language === 'zh' ? '滚动查看更多图片' : 'Scroll to load more photos'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
           </div>
         </div>
       </div>
     </div>
   )

  // 使用Portal渲染到document.body，避免父容器样式影响
  if (typeof window === 'undefined') {
    return null
  }

  return createPortal(modalContent, document.body)
 }
