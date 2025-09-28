#!/usr/bin/env node

const fs = require('fs');
const { execSync, spawn } = require('child_process');

console.log('🚀 智能开发服务器启动器');
console.log('========================\n');

// 检查是否需要清理
function needsCleaning() {
  const reasons = [];
  
  // 检查 .next 目录是否存在且健康
  if (!fs.existsSync('.next')) {
    reasons.push('首次启动，需要初始化构建');
    return { needed: true, reasons };
  }
  
  // 检查构建文件年龄
  const nextStat = fs.statSync('.next');
  const age = Date.now() - nextStat.mtime.getTime();
  const hoursOld = age / (1000 * 60 * 60);
  
  if (hoursOld > 24) {
    reasons.push(`构建文件超过 ${Math.round(hoursOld)} 小时，建议清理`);
  }
  
  // 检查关键文件是否存在
  const criticalFiles = [
    '.next/static',
    '.next/server',
    '.next/build-manifest.json'
  ];
  
  const missingFiles = criticalFiles.filter(file => !fs.existsSync(file));
  if (missingFiles.length > 0) {
    reasons.push(`关键构建文件缺失: ${missingFiles.join(', ')}`);
  }
  
  // 检查是否有编译错误的迹象
  if (fs.existsSync('.next/trace')) {
    try {
      const trace = fs.readFileSync('.next/trace', 'utf8');
      if (trace.includes('error') || trace.includes('Error')) {
        reasons.push('发现之前的编译错误痕迹');
      }
    } catch (error) {
      // 忽略读取错误
    }
  }
  
  return { needed: reasons.length > 0, reasons };
}

// 检查端口占用
function checkPorts() {
  const ports = [3000, 3001];
  const occupiedPorts = [];
  
  for (const port of ports) {
    try {
      const result = execSync(`lsof -ti:${port}`, { encoding: 'utf8', stdio: 'pipe' });
      if (result.trim()) {
        occupiedPorts.push(port);
      }
    } catch (error) {
      // 端口可用
    }
  }
  
  return occupiedPorts;
}

// 清理端口
function cleanPorts(ports) {
  console.log(`🧹 清理占用的端口: ${ports.join(', ')}`);
  
  for (const port of ports) {
    try {
      const result = execSync(`lsof -ti:${port}`, { encoding: 'utf8', stdio: 'pipe' });
      if (result.trim()) {
        execSync(`kill -9 ${result.trim()}`);
        console.log(`✅ 已清理端口 ${port}`);
      }
    } catch (error) {
      console.log(`⚠️  端口 ${port} 清理失败: ${error.message}`);
    }
  }
}

// 执行清理
function performClean() {
  console.log('🧹 执行构建清理...');
  try {
    execSync('node scripts/clean-build.js', { stdio: 'inherit' });
    console.log('✅ 清理完成\n');
  } catch (error) {
    console.error('❌ 清理失败:', error.message);
    console.log('🔄 尝试基础清理...');
    try {
      execSync('rm -rf .next', { stdio: 'inherit' });
      console.log('✅ 基础清理完成\n');
    } catch (basicError) {
      console.error('❌ 基础清理也失败了:', basicError.message);
      process.exit(1);
    }
  }
}

// 启动开发服务器
function startDevServer() {
  console.log('🚀 启动 Next.js 开发服务器...\n');
  
  const devProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });
  
  // 处理进程退出
  devProcess.on('close', (code) => {
    if (code !== 0) {
      console.log(`\n❌ 开发服务器异常退出 (代码: ${code})`);
      console.log('💡 建议运行 npm run health-check 检查环境');
    }
  });
  
  // 处理中断信号
  process.on('SIGINT', () => {
    console.log('\n🛑 正在停止开发服务器...');
    devProcess.kill('SIGINT');
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 正在终止开发服务器...');
    devProcess.kill('SIGTERM');
  });
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const forceClean = args.includes('--force') || args.includes('-f');
  const skipCheck = args.includes('--skip-check') || args.includes('-s');
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('使用方法:');
    console.log('  node scripts/smart-dev.js [选项]');
    console.log('');
    console.log('选项:');
    console.log('  -f, --force       强制清理后启动');
    console.log('  -s, --skip-check  跳过健康检查');
    console.log('  -h, --help        显示帮助信息');
    console.log('');
    console.log('示例:');
    console.log('  npm run dev:smart         # 智能启动');
    console.log('  npm run dev:smart -- -f   # 强制清理后启动');
    return;
  }
  
  // 检查端口占用
  const occupiedPorts = checkPorts();
  if (occupiedPorts.length > 0) {
    console.log(`⚠️  发现端口占用: ${occupiedPorts.join(', ')}`);
    cleanPorts(occupiedPorts);
    console.log('');
  }
  
  // 决定是否需要清理
  let shouldClean = forceClean;
  
  if (!shouldClean && !skipCheck) {
    const cleanCheck = needsCleaning();
    if (cleanCheck.needed) {
      console.log('🔍 检测到以下问题:');
      cleanCheck.reasons.forEach(reason => console.log(`  - ${reason}`));
      console.log('');
      shouldClean = true;
    }
  }
  
  if (shouldClean) {
    performClean();
  } else {
    console.log('✅ 构建环境状态良好，直接启动\n');
  }
  
  // 启动开发服务器
  startDevServer();
}

// 错误处理
process.on('unhandledRejection', (error) => {
  console.error('❌ 未处理的错误:', error);
  process.exit(1);
});

main().catch((error) => {
  console.error('❌ 启动失败:', error);
  process.exit(1);
});
