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

// 需要上传的缺失图片列表
const MISSING_IMAGES = [
  // SVG图标文件 - Navigate Shanghai with Ease模块需要
  {
    local: 'public/images/icons/Daily Translation Assistance.svg',
    oss: 'public/images/icons/Daily Translation Assistance.svg'
  },
  {
    local: 'public/images/icons/SIM Card Registration.svg',
    oss: 'public/images/icons/SIM Card Registration.svg'
  },
  {
    local: 'public/images/icons/Power Adapter Conversion.svg',
    oss: 'public/images/icons/Power Adapter Conversion.svg'
  },
  {
    local: 'public/images/icons/Travel and Commute Guide.svg',
    oss: 'public/images/icons/Travel and Commute Guide.svg'
  },
  {
    local: 'public/images/icons/Shared Bike Rentals.svg',
    oss: 'public/images/icons/Shared Bike Rentals.svg'
  },
  {
    local: 'public/images/icons/Local Food Recommendations.svg',
    oss: 'public/images/icons/Local Food Recommendations.svg'
  },
  {
    local: 'public/images/icons/Travel Itinerary Suggestions.svg',
    oss: 'public/images/icons/Travel Itinerary Suggestions.svg'
  },
  {
    local: 'public/images/icons/Restaurant Reservations.svg',
    oss: 'public/images/icons/Restaurant Reservations.svg'
  },
  {
    local: 'public/images/icons/Local App Installation Assistance.svg',
    oss: 'public/images/icons/Local App Installation Assistance.svg'
  },
  {
    local: 'public/images/icons/Parcel Collection Service.svg',
    oss: 'public/images/icons/Parcel Collection Service.svg'
  },
  {
    local: 'public/images/icons/Medical Appointment Assistance.svg',
    oss: 'public/images/icons/Medical Appointment Assistance.svg'
  },
  {
    local: 'public/images/icons/In-House Maintenance.svg',
    oss: 'public/images/icons/In-House Maintenance.svg'
  },
  {
    local: 'public/images/icons/Government Certified.svg',
    oss: 'public/images/icons/Government Certified.svg'
  },
  // 其他图标文件
  {
    local: 'public/images/icons/clock.svg',
    oss: 'public/images/icons/clock.svg'
  },
  {
    local: 'public/images/icons/suitcase.svg',
    oss: 'public/images/icons/suitcase.svg'
  },
  {
    local: 'public/images/icons/sign.svg',
    oss: 'public/images/icons/sign.svg'
  },
  // Logo文件
  {
    local: 'public/images/logos/logo.svg',
    oss: 'public/images/logos/logo.svg'
  },
  // 活动图片
  {
    local: 'public/images/events/ Freshman Party/1.jpg',
    oss: 'public/images/events/Freshman Party/1.jpg'
  },
  {
    local: 'public/images/events/ Freshman Party/2.jpg',
    oss: 'public/images/events/Freshman Party/2.jpg'
  },
  {
    local: 'public/images/events/ Freshman Party/3.jpg',
    oss: 'public/images/events/Freshman Party/3.jpg'
  },
  {
    local: 'public/images/events/ Freshman Party/4.jpg',
    oss: 'public/images/events/Freshman Party/4.jpg'
  }
];

// 上传单个文件
async function uploadFile(localPath, ossPath) {
  try {
    console.log(`正在上传: ${localPath} -> ${ossPath}`);
    
    // 检查本地文件是否存在
    if (!fs.existsSync(localPath)) {
      console.warn(`⚠️  本地文件不存在: ${localPath}`);
      return false;
    }

    // 设置缓存头
    const headers = {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Expires': new Date(Date.now() + 31536000 * 1000).toUTCString(),
      'Content-Disposition': 'inline'
    };

    // 上传文件
    const result = await client.put(ossPath, localPath, { headers });

    console.log(`✅ 上传成功: ${ossPath}`);
    console.log(`   ETag: ${result.etag}`);
    console.log(`   URL: ${result.url}`);
    console.log(`   大小: ${(fs.statSync(localPath).size / 1024).toFixed(2)} KB\n`);
    
    return true;
  } catch (error) {
    console.error(`❌ 上传失败: ${localPath}`, error.message);
    return false;
  }
}

// 检查文件是否已存在
async function checkFileExists(ossPath) {
  try {
    await client.head(ossPath);
    return true;
  } catch (error) {
    if (error.status === 404) {
      return false;
    }
    throw error;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始上传缺失的图片到OSS...\n');

  // 检查环境变量
  if (!process.env.OSS_ACCESS_KEY_ID || !process.env.OSS_ACCESS_KEY_SECRET) {
    console.error('❌ 请设置OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET环境变量');
    console.log('\n💡 设置方法:');
    console.log('   export OSS_ACCESS_KEY_ID="your_access_key_id"');
    console.log('   export OSS_ACCESS_KEY_SECRET="your_access_key_secret"');
    process.exit(1);
  }

  try {
    let uploadedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    for (const image of MISSING_IMAGES) {
      const { local, oss } = image;
      
      // 检查文件是否已存在
      const exists = await checkFileExists(oss);
      if (exists) {
        console.log(`⏭️  文件已存在，跳过: ${oss}`);
        skippedCount++;
        continue;
      }

      // 上传文件
      const success = await uploadFile(local, oss);
      if (success) {
        uploadedCount++;
      } else {
        failedCount++;
      }
    }

    console.log('📊 上传统计:');
    console.log(`   ✅ 成功上传: ${uploadedCount} 个文件`);
    console.log(`   ⏭️  跳过: ${skippedCount} 个文件`);
    console.log(`   ❌ 失败: ${failedCount} 个文件`);
    console.log(`   📁 总计: ${MISSING_IMAGES.length} 个文件`);

    if (uploadedCount > 0) {
      console.log('\n🎉 图片上传完成！');
      console.log('💡 建议运行缓存优化脚本以设置正确的缓存头');
    }

  } catch (error) {
    console.error('❌ 上传过程中出现错误:', error.message);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { uploadFile, checkFileExists, MISSING_IMAGES };
