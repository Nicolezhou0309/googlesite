/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true, // 禁用Next.js图片优化，返回原图质量
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.vld.com.cn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vlinker-site.oss-cn-shanghai.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // distDir: 'out', // 注释掉，让开发模式使用默认的 .next 目录
  generateBuildId: async () => {
    const buildId = 'build-' + Date.now();
    // 设置构建时间环境变量
    process.env.BUILD_TIME = Date.now().toString();
    return buildId;
  },
  // 配置预加载策略
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Webpack 配置
  webpack: (config, { isServer }) => {
    // 优化模块解析
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    
    return config
  },
  // 开发环境热更新优化
  ...(process.env.NODE_ENV === 'development' && {
    // 启用快速刷新
    reactStrictMode: true,
    // 优化开发服务器
    experimental: {
      // 优化编译速度
      optimizeCss: false,
      // 优化热更新
      optimizePackageImports: ['@heroicons/react', '@nextui-org/react'],
    },
    // 开发服务器配置
    devIndicators: {
      position: 'bottom-right',
    },
    // 优化热更新性能
    onDemandEntries: {
      // 页面在内存中保持的时间（毫秒）
      maxInactiveAge: 25 * 1000,
      // 同时保持的页面数
      pagesBufferLength: 2,
    },
  }),
}

module.exports = nextConfig
