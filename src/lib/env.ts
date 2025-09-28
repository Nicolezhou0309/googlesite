// 环境变量配置
export const env = {
  // 语言设置
  defaultLanguage: (process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as 'zh' | 'en') || 'en',
  
  // 开发环境
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  
  // API配置
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  
  // 服务配置
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  ossBaseUrl: process.env.NEXT_PUBLIC_OSS_BASE_URL || 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com',
  
  // OSS配置
  ossAccessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
  ossAccessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
}

// 验证必需的环境变量
export function validateEnv() {
  const requiredVars = [
    'NEXT_PUBLIC_DEFAULT_LANGUAGE',
  ]
  
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0 && env.isDev) {
    console.warn('Missing environment variables:', missingVars)
  }
  
  return missingVars.length === 0
}

// 获取语言设置
export function getLanguageConfig() {
  return {
    defaultLanguage: env.defaultLanguage,
    supportedLanguages: ['zh', 'en'] as const,
    isLanguageSupported: (lang: string): lang is 'zh' | 'en' => {
      return ['zh', 'en'].includes(lang)
    }
  }
}
