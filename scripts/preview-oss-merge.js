const OSS = require('ali-oss');

// OSS配置
const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: 'vlinker-site'
});

// 源目录和目标目录配置
const SOURCE_DIR = 'images/';           // 外部的一级images目录
const TARGET_DIR = 'public/images/';    // public下的images目录

// 获取目录下的所有文件
async function listAllFiles(prefix) {
  const files = [];
  let continuationToken = null;
  
  do {
    const result = await client.listV2({
      prefix: prefix,
      'max-keys': 1000,
      'continuation-token': continuationToken
    });
    
    if (result.objects) {
      files.push(...result.objects);
    }
    
    continuationToken = result.nextContinuationToken;
  } while (continuationToken);
  
  return files;
}

// 预览合并操作
async function previewMerge() {
  console.log('🔍 预览OSS目录合并操作...');
  console.log(`📁 源目录: ${SOURCE_DIR}`);
  console.log(`📁 目标目录: ${TARGET_DIR}\n`);

  try {
    // 1. 获取源目录下的所有文件
    console.log('📋 正在获取源目录文件列表...');
    const sourceFiles = await listAllFiles(SOURCE_DIR);
    console.log(`📊 找到 ${sourceFiles.length} 个文件\n`);

    if (sourceFiles.length === 0) {
      console.log('ℹ️  源目录为空，无需合并');
      return;
    }

    // 2. 按目录分组显示文件
    const fileGroups = {};
    sourceFiles.forEach(file => {
      const relativePath = file.name.replace(SOURCE_DIR, '');
      const pathParts = relativePath.split('/');
      const dir = pathParts.length > 1 ? pathParts[0] : '根目录';
      
      if (!fileGroups[dir]) {
        fileGroups[dir] = [];
      }
      fileGroups[dir].push({
        name: relativePath,
        size: file.size,
        lastModified: file.lastModified
      });
    });

    // 3. 显示分组后的文件结构
    console.log('📂 文件结构预览:');
    Object.keys(fileGroups).sort().forEach(dir => {
      console.log(`\n📁 ${dir}/ (${fileGroups[dir].length} 个文件)`);
      fileGroups[dir].forEach(file => {
        const sizeKB = (file.size / 1024).toFixed(2);
        const date = new Date(file.lastModified).toLocaleDateString();
        console.log(`   📄 ${file.name} (${sizeKB} KB, ${date})`);
      });
    });

    // 4. 显示合并计划
    console.log('\n🔄 合并计划:');
    sourceFiles.forEach((file, index) => {
      const relativePath = file.name.replace(SOURCE_DIR, '');
      const targetPath = TARGET_DIR + relativePath;
      console.log(`   ${index + 1}. ${file.name}`);
      console.log(`      -> ${targetPath}`);
    });

    // 5. 显示统计信息
    const totalSize = sourceFiles.reduce((sum, file) => sum + file.size, 0);
    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    
    console.log('\n📊 统计信息:');
    console.log(`   📁 总目录数: ${Object.keys(fileGroups).length}`);
    console.log(`   📄 总文件数: ${sourceFiles.length}`);
    console.log(`   💾 总大小: ${totalSizeMB} MB`);

    // 6. 检查潜在冲突
    console.log('\n🔍 检查潜在冲突...');
    const conflicts = [];
    
    for (const file of sourceFiles) {
      const relativePath = file.name.replace(SOURCE_DIR, '');
      const targetPath = TARGET_DIR + relativePath;
      
      try {
        await client.head(targetPath);
        conflicts.push({
          source: file.name,
          target: targetPath
        });
      } catch (error) {
        if (error.status !== 404) {
          console.error(`⚠️  检查文件时出错: ${targetPath}`, error.message);
        }
      }
    }

    if (conflicts.length > 0) {
      console.log(`⚠️  发现 ${conflicts.length} 个潜在冲突:`);
      conflicts.forEach(conflict => {
        console.log(`   ${conflict.source} -> ${conflict.target}`);
      });
      console.log('\n💡 冲突的文件将被跳过，不会覆盖现有文件');
    } else {
      console.log('✅ 未发现冲突，所有文件都可以安全合并');
    }

    console.log('\n🎯 下一步操作:');
    console.log('   运行 node scripts/merge-oss-images.js 执行实际合并');

  } catch (error) {
    console.error('❌ 预览过程中出现错误:', error.message);
    process.exit(1);
  }
}

// 运行预览函数
if (require.main === module) {
  // 检查环境变量
  if (!process.env.OSS_ACCESS_KEY_ID || !process.env.OSS_ACCESS_KEY_SECRET) {
    console.error('❌ 请设置OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET环境变量');
    console.log('\n💡 设置方法:');
    console.log('   export OSS_ACCESS_KEY_ID="your_access_key_id"');
    console.log('   export OSS_ACCESS_KEY_SECRET="your_access_key_secret"');
    process.exit(1);
  }
  
  previewMerge().catch(console.error);
}

module.exports = { previewMerge, listAllFiles };
