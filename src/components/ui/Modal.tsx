'use client'

import React, { useEffect } from 'react'
import { Modal as NextUIModal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  placement?: 'center' | 'top' | 'top-center' | 'bottom' | 'bottom-center'
  backdrop?: 'opaque' | 'blur' | 'transparent'
  scrollBehavior?: 'normal' | 'inside' | 'outside'
  hideCloseButton?: boolean
  isDismissable?: boolean
  isKeyboardDismissDisabled?: boolean
  classNames?: {
    base?: string
    backdrop?: string
    header?: string
    body?: string
    footer?: string
  }
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  placement = 'center',
  backdrop = 'opaque',
  scrollBehavior = 'normal',
  hideCloseButton = false,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  classNames,
}: ModalProps) {
  const { isOpen, onOpen, onClose: onCloseDisclosure } = useDisclosure()

  useEffect(() => {
    if (open) {
      onOpen()
    } else {
      onCloseDisclosure()
    }
  }, [open, onOpen, onCloseDisclosure])

  const handleClose = () => {
    onCloseDisclosure()
    onClose()
  }

  return (
    <NextUIModal
      isOpen={isOpen}
      onClose={handleClose}
      size={size}
      placement={placement}
      backdrop={backdrop}
      scrollBehavior={scrollBehavior}
      hideCloseButton={hideCloseButton}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      classNames={classNames}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
            )}
            <ModalBody>
              {children}
            </ModalBody>
            {footer && (
              <ModalFooter>
                {footer}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </NextUIModal>
  )
}
