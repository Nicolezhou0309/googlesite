'use client'

import React, { useState } from 'react'
import GalleryThumbnails from './GalleryThumbnails'
import GalleryModal from './GalleryModal'
import { useLanguage } from '@/contexts/LanguageProvider'

interface CommunityGalleryProps {
  communityId: string
  className?: string
  initialFolder?: string // 初始文件夹路径
}

export default function CommunityGallery({ communityId, className = '', initialFolder }: CommunityGalleryProps) {
  const { language } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [modalInitialFolder, setModalInitialFolder] = useState<string | undefined>(undefined)

  const handleOpenModal = (folder?: string) => {
    setModalInitialFolder(folder)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalInitialFolder(undefined)
  }

  return (
    <div className={className}>
      <GalleryThumbnails 
        communityId={communityId}
        onOpenModal={handleOpenModal}
      />
      
      <GalleryModal
        isOpen={showModal}
        onClose={handleCloseModal}
        communityId={communityId}
        initialFolder={modalInitialFolder || initialFolder}
      />
    </div>
  )
}