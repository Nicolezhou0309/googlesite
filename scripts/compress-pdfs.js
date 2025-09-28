#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// PDF压缩配置
const PDF_DIR = path.join(__dirname, '../public/PDF');
const COMPRESSED_DIR = path.join(__dirname, '../public/PDF-compressed');
const BACKUP_DIR = path.join(__dirname, '../public/PDF-backup');

// 压缩设置
const COMPRESSION_LEVELS = {
  high: '/screen',    // 最低质量，最小文件
  medium: '/ebook',   // 中等质量，平衡大小
  low: '/printer'     // 高质量，较大文件
};

// 检查Ghostscript是否安装
function checkGhostscript() {
  try {
    execSync('gs --version', { stdio: 'pipe' });
    console.log('✅ Ghostscript已安装');
    return true;
  } catch (error) {
    console.log('❌ Ghostscript未安装');
    console.log('请安装Ghostscript:');
    console.log('  macOS: brew install ghostscript');
    console.log('  Ubuntu: sudo apt-get install ghostscript');
    console.log('  Windows: 下载并安装 https://www.ghostscript.com/download/gsdnld.html');
    return false;
  }
}

// 创建必要的目录
function createDirectories() {
  [COMPRESSED_DIR, BACKUP_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 创建目录: ${dir}`);
    }
  });
}

// 备份原始文件
function backupOriginalFiles() {
  const pdfFiles = fs.readdirSync(PDF_DIR).filter(file => file.endsWith('.pdf'));
  
  console.log('📦 备份原始PDF文件...');
  pdfFiles.forEach(file => {
    const sourcePath = path.join(PDF_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(sourcePath, backupPath);
      console.log(`  ✅ 备份: ${file}`);
    } else {
      console.log(`  ⏭️  已存在: ${file}`);
    }
  });
}

// 压缩单个PDF文件
function compressPDF(inputPath, outputPath, level = 'medium') {
  try {
    const gsCommand = [
      'gs',
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      `-dPDFSETTINGS=${COMPRESSION_LEVELS[level]}`,
      '-dNOPAUSE',
      '-dQUIET',
      '-dBATCH',
      '-dColorImageDownsampleType=/Bicubic',
      '-dColorImageResolution=150',
      '-dGrayImageDownsampleType=/Bicubic',
      '-dGrayImageResolution=150',
      '-dMonoImageDownsampleType=/Bicubic',
      '-dMonoImageResolution=150',
      `-sOutputFile=${outputPath}`,
      inputPath
    ].join(' ');

    console.log(`🔄 压缩: ${path.basename(inputPath)} (${level}质量)`);
    execSync(gsCommand, { stdio: 'pipe' });
    
    // 检查压缩效果
    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    console.log(`  ✅ 完成: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(compressedSize / 1024 / 1024).toFixed(1)}MB (减少${reduction}%)`);
    
    return { success: true, reduction: parseFloat(reduction) };
  } catch (error) {
    console.error(`  ❌ 压缩失败: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// 主压缩函数
function compressAllPDFs(level = 'medium') {
  const pdfFiles = fs.readdirSync(PDF_DIR).filter(file => file.endsWith('.pdf'));
  
  if (pdfFiles.length === 0) {
    console.log('❌ 未找到PDF文件');
    return;
  }

  console.log(`\n🚀 开始压缩${pdfFiles.length}个PDF文件 (${level}质量)...\n`);
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let successCount = 0;

  pdfFiles.forEach(file => {
    const inputPath = path.join(PDF_DIR, file);
    const outputPath = path.join(COMPRESSED_DIR, file);
    
    const originalSize = fs.statSync(inputPath).size;
    totalOriginalSize += originalSize;
    
    const result = compressPDF(inputPath, outputPath, level);
    
    if (result.success) {
      const compressedSize = fs.statSync(outputPath).size;
      totalCompressedSize += compressedSize;
      successCount++;
    }
  });

  // 显示总体结果
  console.log('\n📊 压缩完成统计:');
  console.log(`  ✅ 成功: ${successCount}/${pdfFiles.length} 个文件`);
  console.log(`  📦 原始总大小: ${(totalOriginalSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`  📦 压缩后总大小: ${(totalCompressedSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`  💾 节省空间: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(1)}MB`);
  console.log(`  📈 压缩率: ${(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100).toFixed(1)}%`);
}

// 替换原始文件
function replaceOriginalFiles() {
  const compressedFiles = fs.readdirSync(COMPRESSED_DIR).filter(file => file.endsWith('.pdf'));
  
  console.log('\n🔄 替换原始文件...');
  compressedFiles.forEach(file => {
    const sourcePath = path.join(COMPRESSED_DIR, file);
    const targetPath = path.join(PDF_DIR, file);
    
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`  ✅ 替换: ${file}`);
  });
  
  // 清理临时目录
  fs.rmSync(COMPRESSED_DIR, { recursive: true, force: true });
  console.log('  🗑️  清理临时文件');
}

// 主函数
function main() {
  console.log('🔧 PDF压缩工具启动\n');
  
  // 检查Ghostscript
  if (!checkGhostscript()) {
    process.exit(1);
  }
  
  // 创建目录
  createDirectories();
  
  // 备份原始文件
  backupOriginalFiles();
  
  // 获取压缩级别参数
  const level = process.argv[2] || 'medium';
  if (!COMPRESSION_LEVELS[level]) {
    console.log('❌ 无效的压缩级别。使用: high, medium, low');
    process.exit(1);
  }
  
  // 执行压缩
  compressAllPDFs(level);
  
  // 询问是否替换原始文件
  console.log('\n❓ 是否替换原始文件？(y/N)');
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (data) => {
    const answer = data.toString().trim().toLowerCase();
    if (answer === 'y' || answer === 'yes') {
      replaceOriginalFiles();
      console.log('\n✅ PDF压缩完成！');
    } else {
      console.log('\n📁 压缩后的文件保存在:', COMPRESSED_DIR);
    }
    process.exit(0);
  });
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = {
  compressPDF,
  compressAllPDFs,
  checkGhostscript
};
