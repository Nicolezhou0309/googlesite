#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 环境变量设置助手');
console.log('==================');

const envPath = path.join(process.cwd(), '.env.local');

// 检查是否已存在 .env.local 文件
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local 文件已存在');
  console.log('如需更新，请手动编辑文件或删除后重新运行此脚本');
  process.exit(0);
}

// 创建 .env.local 文件内容
const envContent = `# 环境变量配置文件
# 请将以下占位符替换为实际值

# Google Maps API Key
# 获取方式：https://console.cloud.google.com/apis/credentials
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# 阿里云OSS配置
# 获取方式：阿里云控制台 -> 访问控制 -> AccessKey管理
OSS_ACCESS_KEY_ID=your_oss_access_key_id
OSS_ACCESS_KEY_SECRET=your_oss_access_key_secret

# 运行环境
NODE_ENV=development
`;

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local 文件创建成功');
  console.log('');
  console.log('📝 接下来请：');
  console.log('1. 编辑 .env.local 文件');
  console.log('2. 替换占位符为实际值');
  console.log('3. 重新启动开发服务器');
  console.log('');
  console.log('🔗 获取 Google Maps API Key:');
  console.log('   https://console.cloud.google.com/apis/credentials');
  console.log('');
  console.log('🔗 获取阿里云 AccessKey:');
  console.log('   https://ram.console.aliyun.com/manage/ak');
} catch (error) {
  console.error('❌ 创建 .env.local 文件失败:', error.message);
  process.exit(1);
}
