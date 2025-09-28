# 微领地青年社区网站 (Vlinker Youth Community Website)

一个现代化的青年社区展示网站，为海外学生提供在上海的住宿和生活服务信息。

## 项目描述

微领地青年社区网站是一个基于 Next.js 构建的响应式网站，旨在为海外学生展示微领地青年社区的服务和设施。网站包含社区介绍、位置地图、餐厅推荐、服务支持、活动展示和联系表单等功能。

## 技术栈

- **前端框架**: Next.js 15.5.3
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **UI 组件**: Ant Design
- **地图服务**: Google Maps API
- **图片处理**: React Image Crop
- **状态管理**: React Hooks

## 主要功能

- 🏠 社区介绍和特色展示
- 🗺️ Google 地图集成，显示社区位置
- 🍽️ 餐厅推荐和图片轮播
- 🛠️ 服务支持展示
- 🎉 活动展示
- 💬 用户评价展示
- 📝 联系表单和线索收集

## 如何运行

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发环境运行

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 生产环境构建

```bash
npm run build
# 或
yarn build
```

### 生产环境运行

```bash
npm start
# 或
yarn start
```

## 如何测试

### 代码检查

```bash
npm run lint
# 或
yarn lint
```

### 类型检查

```bash
npx tsc --noEmit
```

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── about/             # 关于页面
│   ├── apartments/        # 公寓页面
│   ├── community/         # 社区页面
│   ├── services/          # 服务页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── FigmaDesign.tsx    # 主页面组件
│   ├── Footer.tsx         # 页脚组件
│   ├── Navigation.tsx     # 导航组件
│   ├── ServiceCards.tsx   # 服务卡片组件
│   └── ui/                # UI 组件库
└── lib/                   # 工具函数
    └── utils.ts           # 通用工具函数
```

## 环境变量

在项目根目录创建 `.env.local` 文件：

```env
# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

### 其他平台

项目支持部署到任何支持 Next.js 的平台，如：
- Netlify
- AWS Amplify
- Railway
- 自建服务器

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

此项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

- 项目链接: [https://github.com/your-username/goole-web](https://github.com/your-username/goole-web)
- 问题反馈: [Issues](https://github.com/your-username/goole-web/issues)

## 更新日志

### v0.1.0
- 初始版本发布
- 基础页面结构
- Google 地图集成
- 响应式设计
- 联系表单功能