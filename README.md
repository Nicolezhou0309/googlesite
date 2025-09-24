# 微领地青年公寓官网

这是一个为微领地青年公寓设计的获客页面，基于Next.js 14构建，支持SEO优化和静态部署。

## 功能特性

- 🏠 响应式设计，完美适配各种设备
- 🔍 SEO优化，支持搜索引擎抓取
- 📱 现代化UI设计，用户体验优秀
- 🚀 静态生成，加载速度快
- 📊 联系表单，收集客户信息

## 页面结构

- `/` - 首页
- `/community` - 社区介绍
- `/apartments` - 房型介绍
- `/about` - 品牌介绍
- `/contact` - 联系我们

## 技术栈

- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **部署**: Vercel

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## SEO优化

- 自动生成sitemap.xml
- 配置robots.txt
- 结构化数据标记
- 多语言支持
- 页面性能优化

## 部署

项目已配置为静态导出，可以直接部署到Vercel或其他静态托管服务。

```bash
npm run build
```

构建完成后，`out`目录包含所有静态文件，可以直接部署。
