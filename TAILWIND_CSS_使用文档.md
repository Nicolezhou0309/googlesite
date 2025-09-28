# Tailwind CSS 使用文档

## 版本信息

- **Tailwind CSS**: `4.1.13`
- **@tailwindcss/postcss**: `4.1.13`
- **autoprefixer**: `10.4.21`
- **Next.js**: `15.5.3`

## 当前配置状态

### ✅ 已正确配置

项目已成功配置 Tailwind CSS v4，所有样式正常工作。

### 配置文件

#### 1. `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

#### 2. `tailwind.config.ts`
```typescript
// Tailwind CSS v4 配置
// v4 使用 CSS 优先的配置方式，大部分配置移到 CSS 文件中

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

#### 3. `src/app/globals.css`
```css
@import "tailwindcss";

/* 自定义样式 */
.gallery-container {
  @apply w-full;
}

.gallery-grid {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-4;
}

/* 更多自定义样式... */
```

## 重要说明

### ⚠️ 版本兼容性

1. **Tailwind CSS v4** 使用 `@import "tailwindcss"` 而不是 `@tailwind` 指令
2. **PostCSS 插件** 必须使用 `@tailwindcss/postcss` 而不是 `tailwindcss`
3. **配置文件** 使用简化的 v4 格式

### 🔧 常见问题解决

#### 问题1: 样式不生效
**原因**: 使用了错误的 PostCSS 插件
```javascript
// ❌ 错误
plugins: {
  tailwindcss: {},
}

// ✅ 正确
plugins: {
  '@tailwindcss/postcss': {},
}
```

#### 问题2: CSS 导入错误
```css
/* ❌ 错误 - v3 语法 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ✅ 正确 - v4 语法 */
@import "tailwindcss";
```

#### 问题3: 配置文件格式错误
```typescript
// ❌ 错误 - v3 格式
const config: Config = {
  theme: {
    extend: {
      colors: { ... }
    }
  }
}

// ✅ 正确 - v4 格式
module.exports = {
  content: [...]
}
```

## 项目中的使用

### 画册组件样式

项目中的 `CommunityGallery` 组件使用了以下自定义 CSS 类：

- `.gallery-container` - 画册容器
- `.gallery-grid` - 主网格布局
- `.gallery-main-photo` - 主图样式
- `.gallery-preview-grid` - 预览网格
- `.gallery-modal` - 弹窗样式
- `.gallery-sidebar` - 侧边栏样式
- `.gallery-photo-grid` - 图片网格
- `.gallery-loading-spinner` - 加载动画

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 清理缓存后启动
npm run dev:clean

# 强制清理后启动
npm run dev:force

# 智能开发模式
npm run dev:smart
```

## 依赖管理

### 必需依赖
```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.13",
    "autoprefixer": "^10.4.21",
    "tailwindcss": "^4.1.13"
  }
}
```

### 安装命令
```bash
# 安装 Tailwind CSS v4
npm install tailwindcss@^4.1.13 @tailwindcss/postcss@^4.1.13 autoprefixer@^10.4.21
```

## 最佳实践

### 1. 样式组织
- 使用 `@layer` 组织样式层级
- 自定义组件样式放在 `@layer components`
- 基础样式放在 `@layer base`

### 2. 性能优化
- 使用 `@apply` 指令创建可复用的组件类
- 避免在组件中直接使用大量内联 Tailwind 类
- 利用 Tailwind 的 JIT 模式自动优化

### 3. 开发流程
- 修改样式后重启开发服务器
- 使用 `npm run dev:clean` 清理缓存
- 定期检查依赖版本兼容性

## 故障排除

### 样式丢失
1. 检查 PostCSS 配置
2. 确认 CSS 导入语法
3. 重启开发服务器

### 构建错误
1. 检查依赖版本
2. 清理 `.next` 目录
3. 重新安装依赖

### 热重载问题
1. 使用 `npm run dev:clean`
2. 检查文件监听配置
3. 重启开发服务器

## 更新日志

- **2024-12-19**: 从 Tailwind CSS v3 升级到 v4
- **2024-12-19**: 修复 PostCSS 配置兼容性问题
- **2024-12-19**: 重构画册组件样式系统

## 相关文件

- `postcss.config.js` - PostCSS 配置
- `tailwind.config.ts` - Tailwind 配置
- `src/app/globals.css` - 全局样式
- `src/components/CommunityGallery.tsx` - 画册组件
- `package.json` - 依赖配置

---

**注意**: 本文档基于 Tailwind CSS v4.1.13，如果升级版本请相应更新配置。
