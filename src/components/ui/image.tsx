/**
 * 优化的图片组件
 * 统一处理图片加载、错误处理和优化配置
 */

'use client';

import React from 'react';
import NextImage from 'next/image';
import { ImageProps } from '@/lib/types/components';
import { imageOptimization } from '@/lib/config/images';

export const OptimizedImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  loading = 'lazy',
  sizes,
  className,
  onError,
  onLoad,
  ...props
}) => {
  const optimizedProps = imageOptimization.getOptimizedProps(src, alt, {
    priority,
    className,
    sizes,
  });

  return (
    <NextImage
      {...optimizedProps}
      width={width}
      height={height}
      fill={fill}
      loading={loading}
      onError={onError || imageOptimization.handleError}
      onLoad={onLoad || imageOptimization.handleLoad}
      {...props}
    />
  );
};

export default OptimizedImage;
