// 图片配置接口
export interface ImageConfig {
  objectPosition?: {
    x: number;
    y: number;
  };
  scale?: number;
  rotation?: number;
}

// OSS配置
const OSS_CONFIG = {
  baseUrl: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com',
  imagesPath: 'public/images'
};

// 图片配置存储
const imageConfigs: Record<string, ImageConfig> = {};

// 从 localStorage 加载配置
export const loadImageConfigs = (): void => {
  // 确保只在客户端运行
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem('imageConfigs');
    if (stored) {
      const configs = JSON.parse(stored);
      Object.assign(imageConfigs, configs);
    }
  } catch (error) {
    console.warn('Failed to load image configs from localStorage:', error);
  }
};

// 保存配置到 localStorage
export const saveImageConfigs = (): void => {
  // 确保只在客户端运行
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('imageConfigs', JSON.stringify(imageConfigs));
  } catch (error) {
    console.warn('Failed to save image configs to localStorage:', error);
  }
};

// 获取图片配置
export const getImageConfig = (src: string): ImageConfig | null => {
  return imageConfigs[src] || null;
};

// 设置图片配置
export const setImageConfig = (src: string, config: ImageConfig): void => {
  imageConfigs[src] = config;
  saveImageConfigs();
};

// 重置图片配置
export const resetImageConfig = (src: string): void => {
  delete imageConfigs[src];
  saveImageConfigs();
};

// 重置所有配置
export const resetAllImageConfigs = (): void => {
  Object.keys(imageConfigs).forEach(key => delete imageConfigs[key]);
  saveImageConfigs();
};

// 将本地图片路径转换为OSS地址
export const getOSSImageUrl = (localPath: string): string => {
  // 移除开头的斜杠
  const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
  
  // 如果是images路径，直接拼接OSS地址
  if (cleanPath.startsWith('images/')) {
    const relativePath = cleanPath.replace('images/', '');
    // 直接拼接路径，不进行URL编码，让浏览器处理
    return `${OSS_CONFIG.baseUrl}/${OSS_CONFIG.imagesPath}/${relativePath}`;
  }
  
  // 其他情况，假设是完整的images路径
  return `${OSS_CONFIG.baseUrl}/${OSS_CONFIG.imagesPath}/${cleanPath}`;
};

// 获取OSS图片URL（无时间戳）
export const getOSSImageUrlWithCache = (localPath: string): string => {
  const baseUrl = getOSSImageUrl(localPath);
  
  // 直接返回OSS地址，不添加时间戳
  return baseUrl;
};

// 批量转换图片路径数组
export const getOSSImageUrls = (localPaths: string[]): string[] => {
  return localPaths.map(path => getOSSImageUrl(path));
};

// 获取社区图片的OSS地址
export const getCommunityImageUrl = (communityId: string, imagePath: string): string => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${OSS_CONFIG.baseUrl}/${OSS_CONFIG.imagesPath}/communities/${communityId}/${cleanPath}`;
};

// 获取餐厅图片的OSS地址
export const getRestaurantImageUrl = (restaurantName: string, imagePath: string): string => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${OSS_CONFIG.baseUrl}/${OSS_CONFIG.imagesPath}/restaurants/${restaurantName}/${cleanPath}`;
};

// 获取活动图片的OSS地址
export const getEventImageUrl = (eventName: string, imagePath: string): string => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${OSS_CONFIG.baseUrl}/${OSS_CONFIG.imagesPath}/events/${eventName}/${cleanPath}`;
};

// 获取横幅图片的OSS地址
export const getBannerImageUrl = (imagePath: string): string => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${OSS_CONFIG.baseUrl}/${OSS_CONFIG.imagesPath}/banner/${cleanPath}`;
};

// 获取图标图片的OSS地址
export const getIconImageUrl = (imagePath: string): string => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${OSS_CONFIG.baseUrl}/${OSS_CONFIG.imagesPath}/icons/${cleanPath}`;
};

// 获取推荐图片的OSS地址
export const getRecommendImageUrl = (imagePath: string): string => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${OSS_CONFIG.baseUrl}/${OSS_CONFIG.imagesPath}/recommend/${cleanPath}`;
};

// 获取Logo图片的OSS地址
export const getLogoImageUrl = (imagePath: string): string => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${OSS_CONFIG.baseUrl}/${OSS_CONFIG.imagesPath}/logos/${cleanPath}`;
};

// 导出OSS配置
export const getOSSConfig = () => OSS_CONFIG;