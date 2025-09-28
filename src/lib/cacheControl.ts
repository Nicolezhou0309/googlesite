// 生成时间戳（保留用于其他用途）
export function generateTimestamp(): string {
  return Date.now().toString();
}

// 获取图片URL（无时间戳版本）
export function getTimestampedImageUrl(imagePath: string): string {
  // 直接返回原始路径，不添加时间戳
  return imagePath;
}

// 获取缓存控制头
export function getCacheHeaders(filePath?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Cache-Control': 'public, max-age=31536000, immutable', // 1年缓存
    'Expires': new Date(Date.now() + 31536000 * 1000).toUTCString(), // 1年后过期
  };

  if (filePath) {
    const timestamp = generateTimestamp();
    headers['ETag'] = `"${timestamp}"`;
    headers['Last-Modified'] = new Date().toUTCString();
  }

  return headers;
}

// 检查文件是否需要更新缓存
export function shouldUpdateCache(filePath: string, currentETag: string): boolean {
  const newTimestamp = generateTimestamp();
  return newTimestamp !== currentETag.replace(/"/g, '');
}

// 为OSS图片生成缓存键（无时间戳版本）
export function getOSSCacheKey(imageUrl: string): string {
  // 从URL中提取文件名，不添加时间戳
  const urlParts = imageUrl.split('/');
  const fileName = urlParts[urlParts.length - 1];
  
  return fileName;
}

// 缓存配置常量
export const CACHE_CONFIG = {
  // 图片缓存时间 (1年)
  IMAGE_MAX_AGE: 31536000,
  // 静态资源缓存时间 (1年)
  STATIC_MAX_AGE: 31536000,
  // 开发环境缓存时间 (1小时)
  DEV_MAX_AGE: 3600,
} as const;
