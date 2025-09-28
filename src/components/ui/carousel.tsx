/**
 * 统一的轮播组件
 * 基于Ant Design Carousel的封装，提供一致的API
 */

'use client';

import React, { useState, useEffect } from 'react';
import { CarouselProps } from '@/lib/types/components';
import OptimizedImage from './image';

export const Carousel: React.FC<CarouselProps> = ({
  images,
  autoplay = true,
  autoplaySpeed = 4000,
  effect = 'fade',
  dots = true,
  arrows = false,
  infinite = true,
  speed = 500,
  className,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!autoplay || !images || images.length === 0) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (infinite) {
          return (prev + 1) % images.length
        } else {
          return prev < images.length - 1 ? prev + 1 : 0
        }
      })
    }, autoplaySpeed)

    return () => clearInterval(timer)
  }, [autoplay, autoplaySpeed, infinite, images])

  const nextSlide = () => {
    if (!images || images.length === 0) return
    if (infinite) {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    } else {
      setCurrentSlide((prev) => prev < images.length - 1 ? prev + 1 : 0)
    }
  }

  const prevSlide = () => {
    if (!images || images.length === 0) return
    if (infinite) {
      setCurrentSlide((prev) => prev === 0 ? images.length - 1 : prev - 1)
    } else {
      setCurrentSlide((prev) => prev > 0 ? prev - 1 : images.length - 1)
    }
  }

  if (!images || images.length === 0) {
    return <div className={`relative overflow-hidden h-64 ${className}`}>No images to display</div>
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        className="flex transition-transform duration-500 ease-in-out h-64"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-64 flex-shrink-0">
            <OptimizedImage
              src={image}
              alt={`Carousel image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
        ))}
      </div>
      
      {/* 箭头导航 */}
      {arrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* 指示器 */}
      {dots && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
