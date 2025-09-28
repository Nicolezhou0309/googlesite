const OSS = require('ali-oss');
const path = require('path');
const fs = require('fs');

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

// 需要上传的缺失图片
const MISSING_IMAGES = [
  'public/images/icons/Government Certified.svg',
  'public/images/logos/logo.svg',
  'public/images/events/Freshman Party/1.jpg',
  'public/images/events/Freshman Party/2.jpg',
  'public/images/events/Freshman Party/3.jpg',
  'public/images/events/Freshman Party/4.jpg',
];

// 上传单个文件并设置缓存头
async function uploadFileWithCache(localPath, ossPath) {
  try {
    console.log(`正在上传: ${localPath} -> ${ossPath}`);
    
    // 检查本地文件是否存在
    if (!fs.existsSync(localPath)) {
      console.warn(`本地文件不存在: ${localPath}`);
      return false;
    }

    // 上传文件
    const result = await client.put(ossPath, localPath, {
      headers: CACHE_CONFIG
    });

    console.log(`✅ 上传成功: ${ossPath}`);
    console.log(`   ETag: ${result.etag}`);
    console.log(`   URL: ${result.url}`);
    
    return true;
  } catch (error) {
    console.error(`❌ 上传失败: ${localPath}`, error.message);
    return false;
  }
}

// 更新现有文件的缓存头
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
    console.error(`❌ 缓存头更新失败: ${ossPath}`, error.message);
    return false;
  }
}

// 获取所有已存在的图片文件
async function getExistingImages() {
  try {
    const result = await client.list({
      prefix: 'public/images/',
      'max-keys': 1000
    });

    return result.objects.map(obj => obj.name);
  } catch (error) {
    console.error('获取文件列表失败:', error.message);
    return [];
  }
}

// 主函数
async function main() {
  console.log('🚀 开始OSS缓存优化...\n');

  // 检查环境变量
  if (!process.env.OSS_ACCESS_KEY_ID || !process.env.OSS_ACCESS_KEY_SECRET) {
    console.error('❌ 请设置OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET环境变量');
    process.exit(1);
  }

  try {
    // 1. 上传缺失的图片
    console.log('📤 上传缺失的图片...');
    let uploadedCount = 0;
    
    for (const localPath of MISSING_IMAGES) {
      const ossPath = localPath.replace('public/', '');
      const success = await uploadFileWithCache(localPath, ossPath);
      if (success) uploadedCount++;
    }
    
    console.log(`\n📊 上传完成: ${uploadedCount}/${MISSING_IMAGES.length} 个文件\n`);

    // 2. 更新现有图片的缓存头
    console.log('🔄 更新现有图片的缓存头...');
    const existingImages = await getExistingImages();
    let updatedCount = 0;
    
    for (const ossPath of existingImages) {
      // 只处理图片文件
      if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(ossPath)) {
        const success = await updateCacheHeaders(ossPath);
        if (success) updatedCount++;
      }
    }
    
    console.log(`\n📊 缓存头更新完成: ${updatedCount} 个文件\n`);

    // 3. 验证配置
    console.log('🔍 验证缓存配置...');
    const testImages = [
      'public/images/banner/bb99baef700187de7fcda0109a4009493acabdb9.webp',
      'public/images/communities/jingan-center/外立面/9561b58386b5f261a605fde44656ff0ce9311ed9.webp',
      'public/images/icons/Government Certified.svg'
    ];

    for (const testPath of testImages) {
      try {
        const ossPath = testPath.replace('public/', '');
        const result = await client.head(ossPath);
        console.log(`✅ ${ossPath}:`);
        console.log(`   Cache-Control: ${result.res.headers['cache-control'] || '未设置'}`);
        console.log(`   Content-Disposition: ${result.res.headers['content-disposition'] || '未设置'}`);
      } catch (error) {
        console.log(`❌ ${testPath}: 文件不存在或访问失败`);
      }
    }

    console.log('\n🎉 OSS缓存优化完成！');
    console.log('\n📋 优化内容:');
    console.log('   ✅ 上传了缺失的图片文件');
    console.log('   ✅ 设置了1年缓存时间');
    console.log('   ✅ 移除了强制下载设置');
    console.log('   ✅ 配置了immutable缓存策略');

  } catch (error) {
    console.error('❌ 优化过程中出现错误:', error.message);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  uploadFileWithCache,
  updateCacheHeaders,
  getExistingImages,
  CACHE_CONFIG
};
