/**
 * 统一配置管理
 * 集中管理所有应用配置，避免硬编码
 */

export const config = {
  // 环境配置
  env: {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  },

  // API配置
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    timeout: 10000,
  },

  // 外部服务配置
  services: {
    googleMaps: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      libraries: ['places', 'marker'] as const,
      version: 'weekly' as const,
      language: 'en' as const,
      region: 'US' as const,
    },
    oss: {
      baseUrl: process.env.NEXT_PUBLIC_OSS_BASE_URL || 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com',
      imagesPath: 'public/images',
    },
  },

  // 应用配置
  app: {
    name: 'Vlinker Youth Community',
    description: 'A modern youth community website for international students in Shanghai',
    defaultLanguage: 'en' as const,
    supportedLanguages: ['en', 'zh'] as const,
  },

  // 图片配置
  images: {
    formats: ['image/webp', 'image/avif'] as const,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840] as const,
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384] as const,
    minimumCacheTTL: 60,
    quality: 85,
  },

  // 缓存配置
  cache: {
    images: {
      maxAge: 31536000, // 1年
      immutable: true,
    },
    api: {
      maxAge: 300, // 5分钟
    },
    static: {
      maxAge: 31536000, // 1年
    },
  },

  // 分页配置
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
} as const;

// 类型导出
export type Config = typeof config;
export type GoogleMapsConfig = typeof config.services.googleMaps;
export type OSSConfig = typeof config.services.oss;
export type ImageConfig = typeof config.images;
export type CacheConfig = typeof config.cache;
