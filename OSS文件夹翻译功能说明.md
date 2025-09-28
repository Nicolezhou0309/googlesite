# OSS文件夹翻译功能说明

## 概述

本功能为OSS结构文件夹名称提供了中英文翻译支持，用于画册展示。用户可以通过语言切换功能在中文和英文之间切换，文件夹名称会自动显示对应的翻译。

## 功能特性

### 1. 文件夹名称翻译
- 支持所有主要文件夹类型的中英文翻译
- 包括社区区域、设施、户型图等分类
- 自动根据用户选择的语言显示对应名称

### 2. 社区名称翻译
- 支持所有社区的中英文名称翻译
- 包括静安中心、北虹桥、浦江中心等社区

### 3. 动态语言切换
- 实时切换语言显示
- 无需刷新页面
- 所有相关组件自动更新

## 文件结构

### 核心文件

1. **`src/lib/folderTranslations.ts`** - 翻译映射表
   - 包含所有文件夹的中英文对照
   - 提供翻译函数
   - 支持分类管理

2. **`src/components/GalleryModal.tsx`** - 画册弹窗组件
   - 支持英文文件夹名称显示
   - 动态加载翻译后的文件夹列表

3. **`src/components/GalleryThumbnails.tsx`** - 缩略图组件
   - 支持语言参数传递
   - 与API交互时包含语言信息

4. **`src/app/api/gallery-images/route.ts`** - API路由
   - 支持语言参数
   - 返回翻译后的文件夹名称

### 测试文件

1. **`src/components/FolderTranslationTest.tsx`** - 翻译测试组件
2. **`src/app/test-translation/page.tsx`** - 测试页面

## 翻译映射表

### 社区区域翻译
- `公区` → `Common Areas`
- `外立面` → `Exterior`
- `户型图` → `Apartment Layouts`
- `缩略图` → `Thumbnails`

### 设施翻译
- `共享厨房` → `Shared Kitchen`
- `台球室` → `Billiards Room`
- `影音厅` → `Mini Theater`
- `游戏空间` → `Game Space`
- `社区中心` → `Community Center`
- `自习室` → `Study Room`
- `健身房` → `Gym`
- `篮球场` → `Basketball Court`
- 等等...

### 户型名称翻译
- `270度全景阳台房` → `270° Panoramic Balcony`
- `意式暖咖雅居` → `Italian Warm Coffee Suite`
- `法式田园逸居` → `French Countryside Retreat`
- `都市型男一居室` → `Urban Gentleman Studio`
- 等等...

### 社区名称翻译
- `jingan-center` → `Jing'an Center`
- `north-hongqiao` → `North Hongqiao`
- `pujiang-center` → `Pujiang Center`
- `pujiang-park` → `Pujiang Park`
- `zhonghuan-hutai` → `Zhonghuan Hutai`

## 使用方法

### 1. 基本使用

```typescript
import { getFolderDisplayName, getCommunityDisplayName } from '@/lib/folderTranslations'

// 获取文件夹英文名称
const englishName = getFolderDisplayName('公区', 'en')

// 获取社区英文名称
const communityName = getCommunityDisplayName('jingan-center', 'en')
```

### 2. 在组件中使用

```typescript
import { useLanguage } from '@/contexts/LanguageProvider'
import { getFolderDisplayName } from '@/lib/folderTranslations'

function MyComponent() {
  const { language } = useLanguage()
  const folderName = getFolderDisplayName('公区', language)
  
  return <div>{folderName}</div>
}
```

### 3. API调用

```typescript
// 在API调用中包含语言参数
const response = await fetch(`/api/gallery-images/?communityId=${communityId}&language=${language}`)
```

## 测试方法

1. 访问测试页面：`/test-translation`
2. 切换语言查看翻译效果
3. 选择不同的文件夹名称测试翻译
4. 查看完整的翻译对照表

## 扩展翻译

### 添加新的文件夹翻译

在 `src/lib/folderTranslations.ts` 中的 `folderTranslations` 数组添加新项：

```typescript
{
  chinese: '新文件夹名称',
  english: 'New Folder Name',
  category: 'facility' // 或 'community', 'apartment', 'room', 'other'
}
```

### 添加新的社区翻译

在 `communityTranslations` 对象中添加：

```typescript
export const communityTranslations: Record<string, string> = {
  // 现有翻译...
  'new-community': 'New Community Name'
}
```

## 注意事项

1. **翻译一致性**：确保所有相关组件都使用相同的翻译函数
2. **语言参数传递**：API调用时必须包含语言参数
3. **默认语言**：未指定语言时默认使用中文
4. **翻译更新**：修改翻译后需要重新部署应用

## 技术实现

- 使用TypeScript确保类型安全
- 支持服务端和客户端渲染
- 与现有的语言切换系统集成
- 响应式设计，支持移动端

## 维护建议

1. 定期检查翻译的准确性
2. 根据用户反馈优化翻译
3. 保持翻译映射表的更新
4. 测试新添加的翻译功能
