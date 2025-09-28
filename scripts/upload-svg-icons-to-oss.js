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

// SVG图标列表
const svgIcons = [
  'Government Certified.svg',
  'Daily Translation Assistance.svg',
  'SIM Card Registration.svg',
  'Power Adapter Conversion.svg',
  'Travel and Commute Guide.svg',
  'Shared Bike Rentals.svg',
  'Local Food Recommendations.svg',
  'Travel Itinerary Suggestions.svg',
  'Restaurant Reservations.svg',
  'Local App Installation Assistance.svg',
  'Parcel Collection Service.svg',
  'Medical Appointment Assistance.svg',
  'In-House Maintenance.svg',
  'clock.svg',
  'sign.svg',
  'suitcase.svg'
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
  console.log('开始上传SVG图标到阿里云OSS...\n');
  
  // 检查环境变量
  if (!process.env.OSS_ACCESS_KEY_ID || !process.env.OSS_ACCESS_KEY_SECRET) {
    console.error('❌ 请设置OSS环境变量:');
    console.error('   OSS_ACCESS_KEY_ID');
    console.error('   OSS_ACCESS_KEY_SECRET');
    console.error('   OSS_BUCKET_NAME (可选，默认: vlinker-site)');
    console.error('   OSS_REGION (可选，默认: oss-cn-shanghai)');
    return;
  }
  
  const results = [];
  
  for (const fileName of svgIcons) {
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
}

// 运行上传
uploadAllIcons().catch(console.error);
