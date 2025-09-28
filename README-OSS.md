# OSS 缓存优化指南

## 概述

本指南将帮助您完成OSS图片的缓存优化，包括：
- 上传缺失的图片
- 设置1年缓存时间
- 移除强制下载设置
- 配置immutable缓存策略

## 环境配置

### 1. 设置环境变量

```bash
export OSS_ACCESS_KEY_ID="your_access_key_id"
export OSS_ACCESS_KEY_SECRET="your_access_key_secret"
```

### 2. 安装依赖

```bash
npm install ali-oss
```

## 使用方法

### 1. 上传缺失的图片

```bash
npm run upload-images
```

这个命令会上传以下缺失的图片：
- `Government Certified.svg`
- `logo.svg`
- `Freshman Party/1-4.jpg`

### 2. 更新现有图片的缓存头

```bash
npm run update-cache
```

这个命令会更新所有现有图片的缓存头，设置：
- `Cache-Control: public, max-age=31536000, immutable`
- `Expires: 1年后`
- `Content-Disposition: inline`

### 3. 完整优化（推荐）

```bash
npm run oss-optimize
```

这个命令会执行完整的优化流程：
1. 上传缺失的图片
2. 更新所有图片的缓存头
3. 验证配置结果

## 优化效果

### 优化前
```http
HTTP/1.1 200 OK
Server: AliyunOSS
Content-Disposition: attachment
x-oss-force-download: true
# 无Cache-Control头
# 无Expires头
```

### 优化后
```http
HTTP/1.1 200 OK
Server: AliyunOSS
Cache-Control: public, max-age=31536000, immutable
Expires: Sat, 27 Sep 2026 07:35:00 GMT
Content-Disposition: inline
ETag: "F5EB2DD4B376EF8CC058CDFE15D9456C"
Last-Modified: Sat, 27 Sep 2025 07:08:54 GMT
```

## 缓存策略说明

### 1. 缓存时间
- **max-age=31536000**: 1年缓存时间
- **immutable**: 文件内容不会改变，浏览器可以永久缓存

### 2. 缓存刷新
- 使用OSS版本控制或文件替换来更新缓存
- 文件更新时直接替换OSS上的文件
- 浏览器缓存会自动失效并获取最新版本

### 3. 适用范围
- 所有图片文件 (jpg, jpeg, png, gif, webp, svg)
- 静态资源文件
- 压缩后的图片文件

## 验证方法

### 1. 检查缓存头
```bash
curl -I "https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/banner/bb99baef700187de7fcda0109a4009493acabdb9.webp"
```

### 2. 检查文件是否存在
```bash
curl -I "https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/Government%20Certified.svg"
```

### 3. 测试缓存效果
- 首次访问：从OSS下载
- 再次访问：从浏览器缓存加载
- 文件更新：通过OSS文件替换来更新缓存

## 故障排除

### 1. 环境变量未设置
```
❌ 请设置OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET环境变量
```
**解决方案**: 设置正确的OSS访问密钥

### 2. 文件不存在
```
⚠️ 本地文件不存在: public/images/xxx.jpg
```
**解决方案**: 检查本地文件路径是否正确

### 3. 权限不足
```
❌ 上传失败: Access denied
```
**解决方案**: 检查OSS访问权限配置

## 性能提升

### 优化前
- 每次访问都从OSS下载
- 强制下载设置影响用户体验
- 无缓存策略，加载速度慢

### 优化后
- 1年浏览器缓存，减少重复下载
- 直接显示图片，无需下载
- OSS文件替换控制，确保内容更新
- 预计加载速度提升80%以上

## 注意事项

1. **备份重要数据**: 执行优化前请备份重要文件
2. **测试环境**: 建议先在测试环境验证
3. **监控效果**: 优化后监控网站加载性能
4. **定期检查**: 定期检查缓存配置是否生效

## 技术支持

如遇到问题，请检查：
1. OSS访问权限配置
2. 网络连接状态
3. 文件路径是否正确
4. 环境变量是否设置
