/**
 * 图片配置管理
 * 统一管理图片URL生成和优化配置
 */

import { config } from './index';

// 图片URL生成函数
export const imageUrls = {
  // OSS基础图片URL
  oss: (localPath: string): string => {
    const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    
    if (cleanPath.startsWith('images/')) {
      return `${config.services.oss.baseUrl}/${config.services.oss.imagesPath}/${cleanPath.replace('images/', '')}`;
    }
    
    return `${config.services.oss.baseUrl}/${config.services.oss.imagesPath}/${cleanPath}`;
  },

  // 社区图片URL
  community: (communityId: string, imagePath: string): string => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${config.services.oss.baseUrl}/${config.services.oss.imagesPath}/communities/${communityId}/${cleanPath}`;
  },

  // 餐厅图片URL
  restaurant: (restaurantName: string, imagePath: string): string => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${config.services.oss.baseUrl}/${config.services.oss.imagesPath}/restaurants/${restaurantName}/${cleanPath}`;
  },

  // 活动图片URL
  event: (eventName: string, imagePath: string): string => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${config.services.oss.baseUrl}/${config.services.oss.imagesPath}/events/${eventName}/${cleanPath}`;
  },

  // 横幅图片URL
  banner: (imagePath: string): string => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${config.services.oss.baseUrl}/${config.services.oss.imagesPath}/banner/${cleanPath}`;
  },

  // 图标图片URL
  icon: (imagePath: string): string => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${config.services.oss.baseUrl}/${config.services.oss.imagesPath}/icons/${cleanPath}`;
  },

  // 推荐图片URL
  recommend: (imagePath: string): string => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${config.services.oss.baseUrl}/${config.services.oss.imagesPath}/recommend/${cleanPath}`;
  },

  // Logo图片URL
  logo: (imagePath: string): string => {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${config.services.oss.baseUrl}/${config.services.oss.imagesPath}/logos/${cleanPath}`;
  },
};

// 图片优化配置
export const imageOptimization = {
  // 获取优化的图片属性
  getOptimizedProps: (
    src: string,
    alt: string,
    options?: {
      priority?: boolean;
      className?: string;
      style?: React.CSSProperties;
      sizes?: string;
    }
  ) => {
    const { priority = false, className, style, sizes } = options || {};
    
    return {
      src,
      alt,
      priority,
      className,
      style,
      sizes,
      quality: config.images.quality,
      placeholder: 'blur' as const,
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEAQAAAAAAAAAAAAAAAAAAAAD/9oADAMBAAIRAxEAPwCdABmX/9k=',
    };
  },

  // 图片错误处理
  handleError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    console.warn('图片加载失败:', target.src);
  },

  // 图片加载成功处理
  handleLoad: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.classList.remove('opacity-0');
    target.classList.add('opacity-100');
  },
};

// 导出类型
export type ImageOptimizationProps = ReturnType<typeof imageOptimization.getOptimizedProps>;
