#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 HMR 性能优化脚本');
console.log('====================\n');

// 检查并优化组件性能
function optimizeComponents() {
  console.log('📋 检查组件优化状态...');
  
  const componentsToCheck = [
    'src/components/sections/FoodSection.tsx',
    'src/components/sections/EventsSection.tsx',
    'src/components/FigmaDesign.tsx',
    'src/components/Navigation.tsx'
  ];
  
  let optimizedCount = 0;
  
  componentsToCheck.forEach(componentPath => {
    if (fs.existsSync(componentPath)) {
      const content = fs.readFileSync(componentPath, 'utf8');
      
      // 检查是否使用了性能优化
      const hasUseMemo = content.includes('useMemo');
      const hasUseCallback = content.includes('useCallback');
      const hasReactMemo = content.includes('React.memo');
      
      if (hasUseMemo || hasUseCallback || hasReactMemo) {
        console.log(`✅ ${componentPath} - 已优化`);
        optimizedCount++;
      } else {
        console.log(`⚠️  ${componentPath} - 需要优化`);
      }
    } else {
      console.log(`❌ ${componentPath} - 文件不存在`);
    }
  });
  
  console.log(`\n📊 优化状态: ${optimizedCount}/${componentsToCheck.length} 个组件已优化\n`);
}

// 检查 Next.js 配置
function checkNextConfig() {
  console.log('🔧 检查 Next.js 配置...');
  
  if (fs.existsSync('next.config.js')) {
    const config = fs.readFileSync('next.config.js', 'utf8');
    
    const optimizations = [
      { name: 'SWC 缓存', check: config.includes('swcMinify: true') },
      { name: '包导入优化', check: config.includes('optimizePackageImports') },
      { name: '页面缓存配置', check: config.includes('onDemandEntries') },
      { name: '开发环境优化', check: config.includes('experimental') }
    ];
    
    optimizations.forEach(opt => {
      console.log(`${opt.check ? '✅' : '❌'} ${opt.name}`);
    });
  } else {
    console.log('❌ next.config.js 不存在');
  }
  
  console.log('');
}

// 生成性能优化建议
function generateRecommendations() {
  console.log('💡 性能优化建议:');
  console.log('================\n');
  
  console.log('1. 🔄 组件优化:');
  console.log('   - 使用 React.memo() 包装纯组件');
  console.log('   - 使用 useMemo() 缓存计算结果');
  console.log('   - 使用 useCallback() 缓存函数引用');
  console.log('   - 避免在渲染中创建新对象/数组\n');
  
  console.log('2. 🖼️  图片优化:');
  console.log('   - 预加载关键图片');
  console.log('   - 使用 Next.js Image 组件');
  console.log('   - 缓存图片URL生成结果\n');
  
  console.log('3. 🎯 状态管理:');
  console.log('   - 将状态提升到合适的层级');
  console.log('   - 使用 Context 时避免频繁更新');
  console.log('   - 考虑使用状态管理库（如 Zustand）\n');
  
  console.log('4. 🚀 开发环境:');
  console.log('   - 使用 npm run dev:smart 启动');
  console.log('   - 定期清理 .next 缓存');
  console.log('   - 监控 HMR 性能\n');
  
  console.log('5. 📦 依赖优化:');
  console.log('   - 检查是否有未使用的依赖');
  console.log('   - 使用动态导入减少初始包大小');
  console.log('   - 考虑使用 React.lazy() 进行代码分割\n');
}

// 检查开发环境状态
function checkDevEnvironment() {
  console.log('🏥 检查开发环境状态...');
  
  const checks = [
    { name: '.next 目录', path: '.next', type: 'directory' },
    { name: 'node_modules', path: 'node_modules', type: 'directory' },
    { name: 'package.json', path: 'package.json', type: 'file' },
    { name: 'tsconfig.json', path: 'tsconfig.json', type: 'file' }
  ];
  
  checks.forEach(check => {
    const exists = fs.existsSync(check.path);
    console.log(`${exists ? '✅' : '❌'} ${check.name}`);
  });
  
  console.log('');
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('使用方法:');
    console.log('  node scripts/optimize-hmr.js [选项]');
    console.log('');
    console.log('选项:');
    console.log('  --help, -h    显示帮助信息');
    console.log('  --check       仅检查状态，不提供建议');
    console.log('');
    return;
  }
  
  checkDevEnvironment();
  optimizeComponents();
  checkNextConfig();
  
  if (!args.includes('--check')) {
    generateRecommendations();
  }
  
  console.log('🎉 优化检查完成！');
  console.log('💡 运行 npm run dev:smart 启动优化后的开发服务器');
}

main();
