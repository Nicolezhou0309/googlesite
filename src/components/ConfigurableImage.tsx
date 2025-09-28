'use client';

import React, { useEffect } from 'react';
import { getImageConfig, loadImageConfigs } from '@/lib/imageConfig';

interface ConfigurableImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const ConfigurableImage: React.FC<ConfigurableImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  ...props
}) => {
  // 在开发模式下加载配置
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      loadImageConfigs();
    }
  }, []);

  // 获取图片配置
  const config = getImageConfig(src);
  
  // 构建样式
  const imageStyle: React.CSSProperties = {
    ...style,
  };

  // 应用裁剪位置
  if (config?.objectPosition) {
    imageStyle.objectPosition = `${config.objectPosition.x}% ${config.objectPosition.y}%`;
  }

  // 应用缩放和旋转
  if (config?.scale || config?.rotation) {
    const scale = config.scale || 1;
    const rotation = config.rotation || 0;
    imageStyle.transform = `scale(${scale}) rotate(${rotation}deg)`;
    imageStyle.transformOrigin = 'center center';
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={imageStyle}
      {...props}
    />
  );
};

export default ConfigurableImage;
