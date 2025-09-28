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

// 复制单个文件
async function copyFile(sourceKey, targetKey) {
  try {
    // 检查目标文件是否已存在
    try {
      await client.head(targetKey);
      console.log(`⏭️  目标文件已存在，跳过: ${targetKey}`);
      return { success: true, skipped: true };
    } catch (error) {
      if (error.status !== 404) {
        throw error;
      }
      // 文件不存在，继续复制
    }
    
    // 复制文件
    const copyResult = await client.copy(targetKey, sourceKey);
    console.log(`✅ 复制成功: ${sourceKey} -> ${targetKey}`);
    return { success: true, skipped: false };
  } catch (error) {
    console.error(`❌ 复制失败: ${sourceKey} -> ${targetKey}`, error.message);
    return { success: false, error: error.message };
  }
}

// 删除源文件
async function deleteFile(key) {
  try {
    await client.delete(key);
    console.log(`🗑️  删除源文件: ${key}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ 删除失败: ${key}`, error.message);
    return { success: false, error: error.message };
  }
}

// 主函数
async function main() {
  console.log('🚀 开始合并OSS目录...');
  console.log(`📁 源目录: ${SOURCE_DIR}`);
  console.log(`📁 目标目录: ${TARGET_DIR}\n`);

  // 检查环境变量
  if (!process.env.OSS_ACCESS_KEY_ID || !process.env.OSS_ACCESS_KEY_SECRET) {
    console.error('❌ 请设置OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET环境变量');
    console.log('\n💡 设置方法:');
    console.log('   export OSS_ACCESS_KEY_ID="your_access_key_id"');
    console.log('   export OSS_ACCESS_KEY_SECRET="your_access_key_secret"');
    process.exit(1);
  }

  try {
    // 1. 获取源目录下的所有文件
    console.log('📋 正在获取源目录文件列表...');
    const sourceFiles = await listAllFiles(SOURCE_DIR);
    console.log(`📊 找到 ${sourceFiles.length} 个文件\n`);

    if (sourceFiles.length === 0) {
      console.log('ℹ️  源目录为空，无需合并');
      return;
    }

    // 2. 显示将要处理的文件
    console.log('📝 将要处理的文件:');
    sourceFiles.forEach((file, index) => {
      const relativePath = file.name.replace(SOURCE_DIR, '');
      const targetPath = TARGET_DIR + relativePath;
      console.log(`   ${index + 1}. ${file.name} -> ${targetPath}`);
    });
    console.log('');

    // 3. 执行复制操作
    console.log('🔄 开始复制文件...');
    let copiedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;
    const failedFiles = [];

    for (const file of sourceFiles) {
      const relativePath = file.name.replace(SOURCE_DIR, '');
      const targetPath = TARGET_DIR + relativePath;
      
      const result = await copyFile(file.name, targetPath);
      
      if (result.success) {
        if (result.skipped) {
          skippedCount++;
        } else {
          copiedCount++;
        }
      } else {
        failedCount++;
        failedFiles.push({ source: file.name, target: targetPath, error: result.error });
      }
    }

    console.log('\n📊 复制统计:');
    console.log(`   ✅ 成功复制: ${copiedCount} 个文件`);
    console.log(`   ⏭️  跳过: ${skippedCount} 个文件`);
    console.log(`   ❌ 失败: ${failedCount} 个文件`);

    if (failedFiles.length > 0) {
      console.log('\n❌ 失败的文件:');
      failedFiles.forEach(file => {
        console.log(`   ${file.source} -> ${file.target}`);
        console.log(`   错误: ${file.error}\n`);
      });
    }

    // 4. 询问是否删除源文件
    if (copiedCount > 0 && failedCount === 0) {
      console.log('\n🤔 所有文件复制成功！');
      console.log('💡 建议手动验证复制结果后，再删除源目录中的文件');
      console.log('🔗 您可以在OSS控制台中手动删除 ' + SOURCE_DIR + ' 目录');
    } else if (failedCount > 0) {
      console.log('\n⚠️  部分文件复制失败，请检查错误信息');
    }

    console.log('\n🎉 合并操作完成！');

  } catch (error) {
    console.error('❌ 合并过程中出现错误:', error.message);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, copyFile, listAllFiles };
