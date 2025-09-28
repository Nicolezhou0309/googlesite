# Google地图坐标卡片组件文档

## 📋 概述

本文档介绍了新开发的 `CommunityMapCard` 组件，该组件集成了Google地图和社区信息卡片，为社区列表页面提供了交互式的地图展示功能。

## 🗺️ 功能特性

### 主要功能
- **交互式地图**: 使用Google Maps API显示所有社区位置
- **社区标记**: 每个社区在地图上都有自定义标记
- **信息窗口**: 点击标记显示社区基本信息
- **社区卡片**: 右侧显示所有社区的详细信息卡片
- **双向交互**: 点击地图标记或卡片可以相互联动
- **响应式设计**: 支持桌面和移动设备

### 社区数据
组件包含以下5个社区的完整信息：
1. **浦江中心微领地青年社区** (Pujiang Center)
2. **浦江公园微领地青年社区** (Pujiang Park)
3. **北虹桥国际微领地青年社区** (North Hongqiao)
4. **新静安中心微领地青年社区** (Jing'an Center)
5. **中环沪太路微领地青年社区** (Hutai Road)

## 🏗️ 组件结构

### CommunityMapCard 主组件
```typescript
interface CommunityLocation {
  id: string
  position: { lat: number; lng: number }
  title: string
  displayName: string
  district: string
  description: string
  image: string
  priceRange: string
  priceRangeUSD: string
  availableUnits: number
  subwayInfo: string
  tags: string[]
}
```

### 子组件
1. **MapComponent**: Google地图核心组件
2. **CommunityCard**: 社区信息卡片组件

## 🚀 使用方法

### 1. 环境配置
确保在 `.env.local` 文件中配置Google Maps API Key:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 2. 基本使用
```tsx
import CommunityMapCard from '@/components/CommunityMapCard'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CommunityMapCard />
      </div>
    </div>
  )
}
```

### 3. 页面路由
~~组件已集成到路由系统，可以通过以下URL访问：~~
~~http://localhost:3000/communities/map~~

**注意**: 此组件和页面已被删除，不再可用。

## 🎨 设计特色

### 视觉设计
- **品牌色彩**: 使用 `#7da84c` 作为主要品牌色
- **字体**: 使用 HarmonyOS Sans SC 字体族
- **卡片设计**: 现代化卡片设计，支持悬停效果
- **地图样式**: 自定义地图样式，突出显示重要信息

### 交互设计
- **标记样式**: 自定义SVG标记，绿色圆圈配白色中心
- **信息窗口**: 简洁的信息窗口显示关键信息
- **卡片选择**: 选中状态使用绿色边框高亮
- **响应式**: 移动端优化布局

## 📱 响应式支持

### 桌面端 (lg+)
- 3列网格布局：地图占2列，卡片列表占1列
- 地图高度：600px
- 卡片垂直排列

### 移动端 (< lg)
- 单列布局：地图在上，卡片列表在下
- 地图高度自适应
- 卡片水平滚动或垂直堆叠

## 🔧 技术实现

### 依赖库
- `@googlemaps/react-wrapper`: Google Maps React封装
- `next/image`: Next.js图片优化
- `React Hooks`: useState, useEffect, useRef

### 地图配置
```typescript
const mapOptions = {
  center: { lat: 31.22, lng: 121.40 },
  zoom: 11,
  language: 'en',
  region: 'US',
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  gestureHandling: 'greedy',
  clickableIcons: true,
  disableDefaultUI: false
}
```

### 自定义样式
地图使用自定义样式配置，包括：
- 标签文字颜色和描边
- 水域颜色
- 其他地图元素的视觉优化

## 📊 数据统计

组件底部显示三个关键统计指标：
1. **社区数量**: 5个社区
2. **可用户型**: 所有社区的可用户型总数
3. **覆盖区域**: 覆盖的行政区域数量

## 🎯 使用场景

### 适用页面
- 社区列表页面 (`/communities`)
- ~~独立地图页面 (`/communities/map`)~~ (已删除)
- 首页展示组件
- 关于我们页面

### 用户交互流程
1. 用户访问页面看到地图和社区列表
2. 点击地图标记查看社区详细信息
3. 点击右侧卡片高亮对应地图位置
4. 通过统计信息了解整体情况

## 🔮 扩展建议

### 功能扩展
1. **搜索功能**: 添加社区搜索和筛选
2. **路线规划**: 集成Google路线规划API
3. **实时信息**: 显示实时交通和天气信息
4. **收藏功能**: 允许用户收藏感兴趣的社区

### 性能优化
1. **懒加载**: 地图标记的懒加载
2. **缓存**: 社区数据的本地缓存
3. **预加载**: 关键图片的预加载

## 🐛 故障排除

### 常见问题
1. **地图不显示**: 检查API Key配置
2. **标记不显示**: 检查网络连接和API配额
3. **图片加载失败**: 检查OSS链接和网络连接

### 调试建议
- 检查浏览器控制台错误信息
- 验证Google Maps API Key权限
- 确认网络连接正常

## 📝 更新日志

### v1.0.0 (当前版本)
- ✅ 基础地图功能实现
- ✅ 社区卡片设计完成
- ✅ 双向交互功能
- ✅ 响应式布局
- ✅ 统计信息展示

---

**注意**: 使用此组件需要有效的Google Maps API Key，请确保在Google Cloud Console中正确配置API权限和配额。
