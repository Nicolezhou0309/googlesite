#!/bin/bash

# OSS缓存优化脚本
# 使用方法: ./scripts/run-optimization.sh

echo "🚀 开始OSS缓存优化..."

# 检查环境变量
if [ -z "$OSS_ACCESS_KEY_ID" ] || [ -z "$OSS_ACCESS_KEY_SECRET" ]; then
    echo "❌ 请设置OSS环境变量:"
    echo "   export OSS_ACCESS_KEY_ID=\"your_access_key_id\""
    echo "   export OSS_ACCESS_KEY_SECRET=\"your_access_key_secret\""
    exit 1
fi

# 检查Node.js和npm
if ! command -v node &> /dev/null; then
    echo "❌ Node.js未安装"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm未安装"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install ali-oss

# 1. 上传缺失的图片
echo "📤 上传缺失的图片..."
npm run upload-images

# 2. 更新缓存头
echo "🔄 更新缓存头..."
npm run update-cache

# 3. 验证结果
echo "🔍 验证优化结果..."
echo "测试图片缓存头:"
curl -I "https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/banner/bb99baef700187de7fcda0109a4009493acabdb9.webp" 2>/dev/null | grep -E "(Cache-Control|Content-Disposition|Expires)"

echo "测试缺失图片:"
curl -I "https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/Government%20Certified.svg" 2>/dev/null | head -1

echo "🎉 OSS缓存优化完成！"
echo ""
echo "📋 优化内容:"
echo "   ✅ 上传了缺失的图片文件"
echo "   ✅ 设置了1年缓存时间"
echo "   ✅ 移除了强制下载设置"
echo "   ✅ 配置了immutable缓存策略"
echo ""
echo "💡 建议:"
echo "   - 定期检查缓存配置是否生效"
echo "   - 监控网站加载性能"
echo "   - 根据需要调整缓存策略"
