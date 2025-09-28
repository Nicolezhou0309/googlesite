const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// OSS配置
const client = new OSS({
  region: process.env.OSS_REGION || 'oss-cn-shanghai',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET_NAME || 'vlinker-site'
});

// 服务图标列表
const serviceIcons = [
  '每日班车.png',
  '专属管家.png',
  '公区保洁.png',
  '扫地机器人.png',
  '日常消毒.png',
  '24H安保.png',
  '专业维修.png',
  '搬家协助.png',
  '代收快递.png',
  '社区活动.png',
  '安全保障.png',
  'APP服务自助办理.png'
];

// 上传函数
async function uploadIcon(fileName) {
  try {
    const localPath = path.join(__dirname, '../public/images/icons', fileName);
    const ossPath = `public/images/icons/${fileName}`;
    
    console.log(`正在上传: ${fileName}...`);
    
    const result = await client.put(ossPath, localPath);
    
    console.log(`✅ 上传成功: ${fileName}`);
    console.log(`   OSS URL: ${result.url}`);
    
    return {
      fileName,
      success: true,
      url: result.url,
      ossPath
    };
  } catch (error) {
    console.error(`❌ 上传失败: ${fileName}`, error.message);
    return {
      fileName,
      success: false,
      error: error.message
    };
  }
}

// 批量上传
async function uploadAllIcons() {
  console.log('开始上传服务图标到阿里云OSS...\n');
  
  // 检查环境变量
  if (!process.env.OSS_ACCESS_KEY_ID || !process.env.OSS_ACCESS_KEY_SECRET) {
    console.error('❌ 请设置OSS环境变量:');
    console.error('   OSS_ACCESS_KEY_ID');
    console.error('   OSS_ACCESS_KEY_SECRET');
    console.error('   OSS_BUCKET_NAME (可选，默认: vlinker-website)');
    console.error('   OSS_REGION (可选，默认: oss-cn-shanghai)');
    return;
  }
  
  const results = [];
  
  for (const fileName of serviceIcons) {
    const result = await uploadIcon(fileName);
    results.push(result);
    
    // 添加延迟避免请求过于频繁
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n上传结果汇总:');
  console.log('================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ 成功: ${successful.length} 个`);
  successful.forEach(r => {
    console.log(`   - ${r.fileName}`);
    console.log(`     OSS路径: ${r.ossPath}`);
    console.log(`     URL: ${r.url}`);
  });
  
  if (failed.length > 0) {
    console.log(`❌ 失败: ${failed.length} 个`);
    failed.forEach(r => console.log(`   - ${r.fileName}: ${r.error}`));
  }
  
  console.log('\n上传完成！');
  
  // 生成iconLibrary.ts的更新内容
  if (successful.length > 0) {
    console.log('\n请将以下内容更新到 iconLibrary.ts 的 serviceIcons 数组中:');
    console.log('==========================================');
    successful.forEach(r => {
      const iconName = r.fileName.replace('.png', '');
      console.log(`  { name: '${iconName}', nameEn: '${iconName}', icon: '${r.url}', category: 'service' },`);
    });
  }
}

// 运行上传
uploadAllIcons().catch(console.error);
