#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

// PDF压缩配置
const PDF_DIR = path.join(__dirname, '../public/PDF');
const COMPRESSED_DIR = path.join(__dirname, '../public/PDF-compressed');
const BACKUP_DIR = path.join(__dirname, '../public/PDF-backup');

// 压缩设置
const COMPRESSION_LEVELS = {
  high: {
    imageQuality: 0.3,
    removeMetadata: true,
    removeAnnotations: true
  },
  medium: {
    imageQuality: 0.6,
    removeMetadata: false,
    removeAnnotations: false
  },
  low: {
    imageQuality: 0.8,
    removeMetadata: false,
    removeAnnotations: false
  }
};

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
async function compressPDF(inputPath, outputPath, level = 'medium') {
  try {
    console.log(`🔄 压缩: ${path.basename(inputPath)} (${level}质量)`);
    
    // 读取原始PDF
    const originalPdfBytes = fs.readFileSync(inputPath);
    const originalSize = originalPdfBytes.length;
    
    // 创建新的PDF文档
    const pdfDoc = await PDFDocument.load(originalPdfBytes);
    const pages = pdfDoc.getPages();
    
    // 获取压缩设置
    const settings = COMPRESSION_LEVELS[level];
    
    // 处理每一页
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      
      // 获取页面内容
      const { width, height } = page.getSize();
      
      // 如果设置了图像质量，这里可以进一步优化
      // 注意：pdf-lib主要处理PDF结构，图像压缩有限
      console.log(`  📄 处理第${i + 1}页 (${width}x${height})`);
    }
    
    // 移除元数据（如果设置）
    if (settings.removeMetadata) {
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');
    }
    
    // 保存压缩后的PDF
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50
    });
    
    fs.writeFileSync(outputPath, compressedPdfBytes);
    
    // 检查压缩效果
    const compressedSize = compressedPdfBytes.length;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    console.log(`  ✅ 完成: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(compressedSize / 1024 / 1024).toFixed(1)}MB (减少${reduction}%)`);
    
    return { success: true, reduction: parseFloat(reduction) };
  } catch (error) {
    console.error(`  ❌ 压缩失败: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// 使用在线压缩服务（备选方案）
async function compressWithOnlineService(inputPath, outputPath) {
  try {
    console.log(`🌐 使用在线服务压缩: ${path.basename(inputPath)}`);
    
    // 这里可以集成在线PDF压缩API
    // 例如：SmallPDF API, ILovePDF API等
    console.log('  ⚠️  在线压缩服务需要API密钥，暂时跳过');
    return { success: false, error: '需要配置在线服务API' };
  } catch (error) {
    console.error(`  ❌ 在线压缩失败: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// 主压缩函数
async function compressAllPDFs(level = 'medium') {
  const pdfFiles = fs.readdirSync(PDF_DIR).filter(file => file.endsWith('.pdf'));
  
  if (pdfFiles.length === 0) {
    console.log('❌ 未找到PDF文件');
    return;
  }

  console.log(`\n🚀 开始压缩${pdfFiles.length}个PDF文件 (${level}质量)...\n`);
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let successCount = 0;

  for (const file of pdfFiles) {
    const inputPath = path.join(PDF_DIR, file);
    const outputPath = path.join(COMPRESSED_DIR, file);
    
    const originalSize = fs.statSync(inputPath).size;
    totalOriginalSize += originalSize;
    
    const result = await compressPDF(inputPath, outputPath, level);
    
    if (result.success) {
      const compressedSize = fs.statSync(outputPath).size;
      totalCompressedSize += compressedSize;
      successCount++;
    } else {
      // 如果本地压缩失败，尝试在线服务
      console.log(`  🔄 尝试在线压缩服务...`);
      const onlineResult = await compressWithOnlineService(inputPath, outputPath);
      if (onlineResult.success) {
        const compressedSize = fs.statSync(outputPath).size;
        totalCompressedSize += compressedSize;
        successCount++;
      }
    }
  }

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
async function main() {
  console.log('🔧 PDF压缩工具启动 (Node.js版本)\n');
  
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
  await compressAllPDFs(level);
  
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
  main().catch(console.error);
}

module.exports = {
  compressPDF,
  compressAllPDFs
};
