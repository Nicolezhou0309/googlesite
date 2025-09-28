#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 开始清理构建系统...');

// 清理目录列表
const cleanDirectories = [
  '.next',
  'node_modules/.cache',
  '.swc',
  'out'
];

// 清理文件列表
const cleanFiles = [
  'tsconfig.tsbuildinfo',
  '.next/trace'
];

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`🗑️  删除目录: ${dirPath}`);
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ 成功删除: ${dirPath}`);
    } catch (error) {
      console.error(`❌ 删除失败 ${dirPath}:`, error.message);
    }
  } else {
    console.log(`⏭️  跳过不存在的目录: ${dirPath}`);
  }
}

function removeFile(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`🗑️  删除文件: ${filePath}`);
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ 成功删除: ${filePath}`);
    } catch (error) {
      console.error(`❌ 删除失败 ${filePath}:`, error.message);
    }
  } else {
    console.log(`⏭️  跳过不存在的文件: ${filePath}`);
  }
}

function killProcessOnPort(port) {
  try {
    console.log(`🔍 检查端口 ${port}...`);
    const result = execSync(`lsof -ti:${port}`, { encoding: 'utf8', stdio: 'pipe' });
    if (result.trim()) {
      console.log(`🔪 终止端口 ${port} 上的进程...`);
      execSync(`kill -9 ${result.trim()}`);
      console.log(`✅ 成功终止端口 ${port} 上的进程`);
    }
  } catch (error) {
    console.log(`⏭️  端口 ${port} 没有运行的进程`);
  }
}

// 主清理流程
async function main() {
  console.log('🚀 开始构建系统清理流程...\n');

  // 1. 终止可能运行的开发服务器
  console.log('📡 终止开发服务器进程...');
  killProcessOnPort(3000);
  killProcessOnPort(3001);
  
  try {
    execSync('pkill -f "next dev"', { stdio: 'pipe' });
    console.log('✅ 终止了所有 Next.js 开发服务器');
  } catch (error) {
    console.log('⏭️  没有找到运行中的 Next.js 开发服务器');
  }

  // 2. 清理目录
  console.log('\n📁 清理构建目录...');
  cleanDirectories.forEach(removeDirectory);

  // 3. 清理文件
  console.log('\n📄 清理构建文件...');
  cleanFiles.forEach(removeFile);

  // 4. 清理npm缓存（可选）
  if (process.argv.includes('--deep')) {
    console.log('\n🔧 深度清理 npm 缓存...');
    try {
      execSync('npm cache clean --force', { stdio: 'inherit' });
      console.log('✅ npm 缓存清理完成');
    } catch (error) {
      console.error('❌ npm 缓存清理失败:', error.message);
    }
  }

  console.log('\n🎉 构建系统清理完成！');
  console.log('💡 提示: 使用 npm run dev:clean 来清理后启动开发服务器');
  console.log('💡 提示: 使用 node scripts/clean-build.js --deep 进行深度清理');
}

main().catch(console.error);
