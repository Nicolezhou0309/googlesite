const OSS = require('ali-oss');

// OSS配置
const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: 'vlinker-site'
});

// 缓存配置
const CACHE_CONFIG = {
  'Cache-Control': 'public, max-age=31536000, immutable',
  'Expires': new Date(Date.now() + 31536000 * 1000).toUTCString(),
  'Content-Disposition': 'inline', // 改为inline，允许浏览器直接显示
};

// 需要更新缓存头的现有图片
const EXISTING_IMAGES = [
  'public/images/banner/bb99baef700187de7fcda0109a4009493acabdb9.webp',
  'public/images/communities/jingan-center/外立面/9561b58386b5f261a605fde44656ff0ce9311ed9.webp',
  'public/images/communities/north-hongqiao/外立面/NORTHHONGQIAOCOMMUNITY.webp',
  'public/images/communities/pujiang-center/外立面/外立面大.webp',
  'public/images/communities/pujiang-park/外立面/IMG_0887大.webp',
  'public/images/communities/zhonghuan-hutai/外立面/外立面05大.webp',
  'public/images/restaurants/Qiantangqiuhe/a9ab380538d3cd574b54a77ffd0a4fda41b421f5.webp',
  'public/images/restaurants/MasMuslim Restaurant/060feceac1df77831e6ac0f2ad1201e6.webp',
  'public/images/restaurants/LiuzhouLuosifen/016f8b07a3709e154a1f4a76a3a56475d2f1d043.webp',
  'public/images/recommend/EMRYS.webp',
  'public/images/recommend/Jules .webp',
  'public/images/recommend/Williamson.webp'
];

// 更新单个文件的缓存头
async function updateCacheHeaders(ossPath) {
  try {
    console.log(`正在更新缓存头: ${ossPath}`);
    
    // 复制对象并设置新的缓存头
    const result = await client.copy(ossPath, ossPath, {
      headers: CACHE_CONFIG
    });

    console.log(`✅ 缓存头更新成功: ${ossPath}`);
    return true;
  } catch (error) {
    if (error.status === 404) {
      console.warn(`⚠️  文件不存在: ${ossPath}`);
      return false;
    }
    console.error(`❌ 缓存头更新失败: ${ossPath}`, error.message);
    return false;
  }
}

// 检查文件的当前缓存头
async function checkCurrentHeaders(ossPath) {
  try {
    const result = await client.head(ossPath);
    const headers = result.res.headers;
    
    console.log(`📋 ${ossPath}:`);
    console.log(`   Cache-Control: ${headers['cache-control'] || '未设置'}`);
    console.log(`   Content-Disposition: ${headers['content-disposition'] || '未设置'}`);
    console.log(`   Expires: ${headers['expires'] || '未设置'}`);
    console.log(`   Last-Modified: ${headers['last-modified'] || '未设置'}\n`);
    
    return headers;
  } catch (error) {
    if (error.status === 404) {
      console.log(`❌ 文件不存在: ${ossPath}\n`);
      return null;
    }
    console.error(`❌ 检查失败: ${ossPath}`, error.message);
    return null;
  }
}

// 获取所有图片文件
async function getAllImageFiles() {
  try {
    console.log('🔍 正在获取所有图片文件...');
    
    const result = await client.list({
      prefix: 'public/images/',
      'max-keys': 1000
    });

    const imageFiles = result.objects
      .filter(obj => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(obj.name))
      .map(obj => obj.name);

    console.log(`📊 找到 ${imageFiles.length} 个图片文件\n`);
    return imageFiles;
  } catch (error) {
    console.error('❌ 获取文件列表失败:', error.message);
    return [];
  }
}

// 主函数
async function main() {
  console.log('🚀 开始更新OSS图片缓存头...\n');

  // 检查环境变量
  if (!process.env.OSS_ACCESS_KEY_ID || !process.env.OSS_ACCESS_KEY_SECRET) {
    console.error('❌ 请设置OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET环境变量');
    console.log('\n💡 设置方法:');
    console.log('   export OSS_ACCESS_KEY_ID="your_access_key_id"');
    console.log('   export OSS_ACCESS_KEY_SECRET="your_access_key_secret"');
    process.exit(1);
  }

  try {
    // 1. 检查当前缓存头状态
    console.log('📋 检查当前缓存头状态...\n');
    for (const imagePath of EXISTING_IMAGES) {
      await checkCurrentHeaders(imagePath);
    }

    // 2. 更新指定文件的缓存头
    console.log('🔄 更新指定文件的缓存头...\n');
    let updatedCount = 0;
    
    for (const imagePath of EXISTING_IMAGES) {
      const success = await updateCacheHeaders(imagePath);
      if (success) updatedCount++;
    }

    console.log(`📊 缓存头更新完成: ${updatedCount}/${EXISTING_IMAGES.length} 个文件\n`);

    // 3. 验证更新结果
    console.log('🔍 验证更新结果...\n');
    for (const imagePath of EXISTING_IMAGES) {
      await checkCurrentHeaders(imagePath);
    }

    // 4. 获取所有图片文件并显示统计
    const allImages = await getAllImageFiles();
    
    console.log('🎉 缓存头更新完成！');
    console.log('\n📋 优化内容:');
    console.log('   ✅ 设置了1年缓存时间 (max-age=31536000)');
    console.log('   ✅ 配置了immutable缓存策略');
    console.log('   ✅ 移除了强制下载设置 (Content-Disposition: inline)');
    console.log('   ✅ 设置了Expires头');
    console.log(`   📊 总计处理: ${allImages.length} 个图片文件`);

  } catch (error) {
    console.error('❌ 更新过程中出现错误:', error.message);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  updateCacheHeaders,
  checkCurrentHeaders,
  getAllImageFiles,
  CACHE_CONFIG,
  EXISTING_IMAGES
};
