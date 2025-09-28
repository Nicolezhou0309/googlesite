#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🏥 Next.js 开发环境健康检查');
console.log('================================\n');

let issues = [];
let warnings = [];

function checkItem(name, checkFn) {
  try {
    const result = checkFn();
    if (result === true) {
      console.log(`✅ ${name}`);
    } else if (result === null) {
      console.log(`⚠️  ${name}`);
      warnings.push(name);
    } else {
      console.log(`❌ ${name}: ${result}`);
      issues.push({ name, issue: result });
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    issues.push({ name, issue: error.message });
  }
}

// 检查项目
console.log('📋 基础检查:');

checkItem('package.json 存在', () => {
  return fs.existsSync('package.json');
});

checkItem('node_modules 存在', () => {
  return fs.existsSync('node_modules');
});

checkItem('next.config.js 存在', () => {
  return fs.existsSync('next.config.js');
});

checkItem('tailwind.config.ts 存在', () => {
  return fs.existsSync('tailwind.config.ts');
});

checkItem('src 目录存在', () => {
  return fs.existsSync('src');
});

console.log('\n🔧 构建系统检查:');

checkItem('.next 目录状态', () => {
  if (!fs.existsSync('.next')) {
    return '需要初始构建';
  }
  const stats = fs.statSync('.next');
  const age = Date.now() - stats.mtime.getTime();
  if (age > 24 * 60 * 60 * 1000) { // 超过24小时
    return null; // 警告：构建较旧
  }
  return true;
});

checkItem('TypeScript 配置', () => {
  if (!fs.existsSync('tsconfig.json')) {
    return 'tsconfig.json 不存在';
  }
  try {
    const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    if (!tsconfig.compilerOptions) {
      return 'compilerOptions 缺失';
    }
    return true;
  } catch (error) {
    return 'tsconfig.json 格式错误';
  }
});

checkItem('PostCSS 配置', () => {
  if (!fs.existsSync('postcss.config.js')) {
    return 'postcss.config.js 不存在';
  }
  return true;
});

console.log('\n🌐 端口检查:');

checkItem('端口 3000 可用性', () => {
  try {
    const result = execSync('lsof -ti:3000', { encoding: 'utf8', stdio: 'pipe' });
    if (result.trim()) {
      return '端口被占用，可能需要清理';
    }
    return true;
  } catch (error) {
    return true; // 端口可用
  }
});

checkItem('端口 3001 可用性', () => {
  try {
    const result = execSync('lsof -ti:3001', { encoding: 'utf8', stdio: 'pipe' });
    if (result.trim()) {
      return null; // 警告：备用端口被占用
    }
    return true;
  } catch (error) {
    return true; // 端口可用
  }
});

console.log('\n📦 依赖检查:');

checkItem('Next.js 版本', () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const nextVersion = packageJson.dependencies?.next || packageJson.devDependencies?.next;
    if (!nextVersion) {
      return 'Next.js 未安装';
    }
    console.log(`    版本: ${nextVersion}`);
    return true;
  } catch (error) {
    return 'package.json 读取失败';
  }
});

checkItem('Tailwind CSS 版本', () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tailwindVersion = packageJson.dependencies?.tailwindcss || packageJson.devDependencies?.tailwindcss;
    if (!tailwindVersion) {
      return 'Tailwind CSS 未安装';
    }
    console.log(`    版本: ${tailwindVersion}`);
    return true;
  } catch (error) {
    return 'package.json 读取失败';
  }
});

console.log('\n🧹 缓存检查:');

checkItem('Node.js 缓存大小', () => {
  const cachePath = 'node_modules/.cache';
  if (!fs.existsSync(cachePath)) {
    return true; // 没有缓存是正常的
  }
  
  try {
    const result = execSync(`du -sh "${cachePath}" 2>/dev/null || echo "0 ${cachePath}"`, { encoding: 'utf8' });
    const size = result.split('\t')[0];
    console.log(`    缓存大小: ${size}`);
    return true;
  } catch (error) {
    return null; // 警告：无法检查缓存大小
  }
});

checkItem('SWC 缓存状态', () => {
  const swcPath = '.swc';
  if (!fs.existsSync(swcPath)) {
    return true; // 没有 SWC 缓存是正常的
  }
  return null; // 警告：存在 SWC 缓存
});

// 总结报告
console.log('\n📊 检查总结:');
console.log(`✅ 通过: ${warnings.length + issues.length === 0 ? '所有检查' : (20 - warnings.length - issues.length) + ' 项'}`);

if (warnings.length > 0) {
  console.log(`⚠️  警告: ${warnings.length} 项`);
}

if (issues.length > 0) {
  console.log(`❌ 问题: ${issues.length} 项`);
}

if (issues.length > 0) {
  console.log('\n🔧 建议修复:');
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.name}: ${issue.issue}`);
  });
  
  console.log('\n💡 修复建议:');
  console.log('- 运行 npm run clean 清理构建缓存');
  console.log('- 运行 npm run dev:clean 清理后启动开发服务器');
  console.log('- 如果问题持续，运行 npm run reset 重置整个环境');
}

if (warnings.length > 0 && issues.length === 0) {
  console.log('\n💡 优化建议:');
  console.log('- 考虑清理旧的构建文件以提高性能');
  console.log('- 运行 node scripts/clean-build.js --deep 进行深度清理');
}

if (issues.length === 0 && warnings.length === 0) {
  console.log('\n🎉 开发环境状态良好！可以安全启动开发服务器。');
}

console.log('\n🚀 启动命令:');
console.log('- npm run dev        # 正常启动');
console.log('- npm run dev:clean  # 清理后启动');
console.log('- npm run dev:force  # 强制重置后启动');

process.exit(issues.length > 0 ? 1 : 0);
