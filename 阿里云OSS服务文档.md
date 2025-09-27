# 阿里云OSS服务文档

## 概述

本文档记录了项目中阿里云OSS（Object Storage Service）的配置、使用方法和维护指南。

## 服务配置

### 基本信息
- **Bucket名称**: `vlinker-site`
- **地域**: `cn-shanghai` (华东2-上海)
- **访问域名**: `vlinker-site.oss-cn-shanghai.aliyuncs.com`
- **存储类型**: 标准存储
- **访问权限**: 公共读

### 访问凭证
- **Access Key ID**: `请设置环境变量 OSS_ACCESS_KEY_ID`
- **Access Key Secret**: `请设置环境变量 OSS_ACCESS_KEY_SECRET`
- **Endpoint**: `oss-cn-shanghai.aliyuncs.com`

## 文件结构

### 目录结构
```
public/images/
├── banner/                    # 横幅图片
├── communities/               # 社区相关图片
│   ├── jingan-center/        # 静安中心社区
│   │   ├── 公区/             # 公区设施图片
│   │   ├── 外立面/           # 外立面图片
│   │   ├── 户型图/           # 户型图
│   │   └── 缩略图/           # 缩略图 (1.webp - 7.webp)
│   ├── north-hongqiao/       # 北虹桥社区
│   │   ├── 公区/             # 公区设施图片
│   │   ├── 外立面/           # 外立面图片
│   │   ├── 户型图/           # 户型图
│   │   └── 缩略图/           # 缩略图 (1.webp - 7.webp)
│   ├── pujiang-center/       # 浦江中心社区
│   │   ├── 公区/             # 公区设施图片
│   │   ├── 外立面/           # 外立面图片
│   │   ├── 户型图/           # 户型图
│   │   └── 缩略图/           # 缩略图 (1.webp - 7.webp)
│   ├── pujiang-park/         # 浦江公园社区
│   │   ├── 公区/             # 公区设施图片
│   │   ├── 外立面/           # 外立面图片
│   │   ├── 户型图/           # 户型图
│   │   └── 缩略图/           # 缩略图 (1.webp - 7.webp)
│   └── zhonghuan-hutai/      # 中环沪太社区
│       ├── 公区/             # 公区设施图片
│       ├── 外立面/           # 外立面图片
│       ├── 户型图/           # 户型图
│       └── 缩略图/           # 缩略图 (1.webp - 7.webp)
├── events/                   # 活动图片
│   ├── Freshman Party/       # 新生派对
│   ├── FoodSharingFair/      # 美食分享会
│   └── cocktail/             # 鸡尾酒会
├── icons/                    # 图标文件
├── logos/                    # 标志文件
├── recommend/                # 推荐图片
└── restaurants/              # 餐厅图片
    ├── LiuzhouLuosifen/      # 柳州螺蛳粉
    ├── MasMuslim Restaurant/ # 穆斯林餐厅
    └── Qiantangqiuhe/        # 钱塘秋荷
```

### 文件格式
- **主要格式**: WebP (优先使用，文件更小)
- **备用格式**: JPG, PNG
- **最大尺寸**: 1920x1080
- **压缩质量**: 85% (JPEG), 90% (PNG), 85% (WebP)

## 技术实现

### 1. 图片配置工具 (`src/lib/imageConfig.ts`)

#### 核心函数
```typescript
// 基础OSS地址转换
getOSSImageUrl(localPath: string): string

// 分类图片地址获取
getCommunityImageUrl(communityId: string, imagePath: string): string
getRestaurantImageUrl(restaurantName: string, imagePath: string): string
getEventImageUrl(eventName: string, imagePath: string): string
getBannerImageUrl(imagePath: string): string
getIconImageUrl(imagePath: string): string
getRecommendImageUrl(imagePath: string): string
getLogoImageUrl(imagePath: string): string

// 批量转换
getOSSImageUrls(localPaths: string[]): string[]
```

#### 使用示例
```typescript
import { getOSSImageUrl, getCommunityImageUrl } from '@/lib/imageConfig'

// 基础转换
const ossUrl = getOSSImageUrl('/images/banner/1.jpg')
// 结果: https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/banner/1.webp

// 社区图片
const communityUrl = getCommunityImageUrl('jingan-center', '外立面/1.webp')
// 结果: https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/jingan-center/外立面/1.webp
```

### 2. Next.js配置 (`next.config.js`)

#### 远程图片配置
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'vlinker-site.oss-cn-shanghai.aliyuncs.com',
      port: '',
      pathname: '/**',
    },
  ],
}
```

### 3. API路由 (`src/app/api/full-gallery-images/route.ts`)

#### 功能
- 动态读取社区图片目录
- 返回OSS地址而非本地路径
- 支持分页和文件夹分类
- 优先返回WebP格式

#### 请求示例
```javascript
// 获取静安中心社区图片
GET /api/full-gallery-images?communityId=jingan-center&page=0&limit=10

// 响应
{
  "images": [
    {
      "src": "https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/communities/jingan-center/外立面/9561b58386b5f261a605fde44656ff0ce9311ed9.webp",
      "width": 800,
      "height": 600,
      "alt": "Community Facade - 9561b58386b5f261a605fde44656ff0ce9311ed9",
      "folder": "外立面"
    }
  ],
  "hasMore": true,
  "total": 25
}
```

## 上传工具

### 压缩脚本 (`compress-images.js`)

#### 功能
- 批量压缩图片到指定尺寸
- 转换为WebP格式
- 保持目录结构
- 生成压缩统计

#### 使用方法
```bash
# 安装依赖
npm install sharp --save-dev

# 运行压缩脚本
node compress-images.js
```

#### 配置参数
```javascript
const CONFIG = {
  maxWidth: 1920,
  maxHeight: 1080,
  jpegQuality: 85,
  pngQuality: 90,
  webpQuality: 85,
  generateWebP: true,
  webpOnly: true,  // 只生成WebP格式
  keepOriginal: true,
  outputDir: 'public/images-compressed'
};
```

### 上传脚本 (`upload-to-oss.js`)

#### 功能
- 批量上传到阿里云OSS
- 支持并发上传
- 显示上传进度
- 错误处理和重试

#### 使用方法
```bash
# 安装依赖
npm install ali-oss --save-dev

# 运行上传脚本
node upload-to-oss.js
```

#### 配置参数
```javascript
const ossConfig = {
  region: 'oss-cn-shanghai',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: 'vlinker-site'
};

const uploadConfig = {
  localDir: 'public/images-compressed',
  ossDir: 'public/images',
  concurrency: 5,
  showProgress: true
};
```

## 性能优化

### 1. 图片优化
- **格式选择**: 优先使用WebP，比JPEG小30-50%
- **尺寸控制**: 最大1920x1080，避免过大文件
- **质量设置**: 平衡文件大小和图片质量

### 2. CDN加速
- 阿里云OSS自动提供CDN加速
- 全球节点分布，提升访问速度
- 支持HTTP/2和Gzip压缩

### 3. 缓存策略
- 浏览器缓存: 设置合适的Cache-Control头
- CDN缓存: 利用阿里云CDN缓存
- 应用缓存: Next.js图片优化缓存

## 监控和维护

### 1. 存储监控
- 定期检查存储使用量
- 监控访问频率和流量
- 设置存储告警

### 2. 性能监控
- 监控图片加载时间
- 检查CDN命中率
- 分析用户访问模式

### 3. 成本控制
- 定期清理无用文件
- 优化存储类型
- 监控流量费用

## 安全配置

### 1. 访问控制
- 使用RAM子账号管理
- 设置最小权限原则
- 定期轮换访问密钥

### 2. 防盗链
- 配置Referer白名单
- 设置签名URL
- 监控异常访问

### 3. 数据备份
- 定期备份重要文件
- 设置跨区域复制
- 建立灾难恢复计划

## 故障排除

### 常见问题

#### 1. 图片无法加载
- 检查OSS配置是否正确
- 确认文件路径是否存在
- 验证访问权限设置

#### 2. 上传失败
- 检查网络连接
- 验证访问凭证
- 确认存储空间是否充足

#### 3. 性能问题
- 检查图片大小和格式
- 优化CDN配置
- 分析网络延迟

### 调试工具
- 阿里云OSS控制台
- 浏览器开发者工具
- 网络监控工具

## 更新日志

### 2024-01-XX
- 初始配置阿里云OSS服务
- 实现图片压缩和上传工具
- 集成到Next.js项目
- 完成所有图片迁移

### 未来计划
- 实现自动备份机制
- 添加图片水印功能
- 优化CDN配置
- 实现智能压缩

## 联系信息

- **项目负责人**: [您的姓名]
- **技术支持**: [技术支持邮箱]
- **文档维护**: [文档维护者]

---

*最后更新: 2024年1月*
*文档版本: v1.0*
