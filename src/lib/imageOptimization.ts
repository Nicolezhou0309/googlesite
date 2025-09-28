import { ImageProps } from 'next/image';

// 简化的图片配置接口
export interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

// 简化的图片配置函数 - 不预设任何布局属性
export const getOptimizedImageProps = (
  src: string,
  alt: string,
  priority: boolean = false,
  className?: string,
  style?: React.CSSProperties
): OptimizedImageProps => {
  return {
    src,
    alt,
    priority,
    className,
    style,
  };
};


// 懒加载配置
export const lazyLoadConfig = {
  threshold: 0.1,
  rootMargin: '50px',
};

// 图片加载错误处理
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  const parent = target.parentElement;
  
  if (parent) {
    // 创建统一的占位符
    parent.innerHTML = `
      <div class="w-full h-full bg-gray-100 flex items-center justify-center">
        <div class="text-center text-gray-400">
          <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2 mx-auto">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-xs opacity-70">图片加载失败</p>
        </div>
      </div>
    `;
  }
  
  console.warn('图片加载失败:', target.src);
};

// 图片加载成功处理
export const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.classList.remove('opacity-0');
  target.classList.add('opacity-100');
};
