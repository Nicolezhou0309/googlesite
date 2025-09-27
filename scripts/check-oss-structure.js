#!/usr/bin/env node

/**
 * 检查OSS文件结构脚本
 * 用于验证OSS上实际存在的图片文件
 */

const OSS = require('ali-oss');

// OSS配置
const ossConfig = {
  region: 'oss-cn-shanghai',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: 'vlinker-site'
};

const client = new OSS(ossConfig);

// 检查指定路径下的文件
async function checkFiles(prefix) {
  try {
    console.log(`\n检查路径: ${prefix}`);
    const result = await client.list({
      prefix: prefix,
      'max-keys': 1000
    });
    
    if (result.objects && result.objects.length > 0) {
      console.log(`找到 ${result.objects.length} 个文件:`);
      result.objects.forEach(obj => {
        console.log(`  - ${obj.name}`);
      });
    } else {
      console.log('  未找到文件');
    }
    
    return result.objects || [];
  } catch (error) {
    console.error(`检查路径 ${prefix} 时出错:`, error.message);
    return [];
  }
}

// 检查社区图片结构
async function checkCommunityStructure() {
  console.log('=== 检查OSS社区图片结构 ===');
  
  const communities = ['jingan-center', 'north-hongqiao', 'pujiang-center', 'pujiang-park', 'zhonghuan-hutai'];
  
  for (const community of communities) {
    console.log(`\n--- 检查社区: ${community} ---`);
    
    // 检查公区文件夹
    const publicAreas = await checkFiles(`public/images/communities/${community}/公区/`);
    
    // 检查外立面文件夹
    const facade = await checkFiles(`public/images/communities/${community}/外立面/`);
    
    // 检查户型图文件夹
    const layouts = await checkFiles(`public/images/communities/${community}/户型图/`);
    
    // 检查缩略图文件夹
    const thumbnails = await checkFiles(`public/images/communities/${community}/缩略图/`);
    
    console.log(`\n${community} 统计:`);
    console.log(`  公区: ${publicAreas.length} 个文件`);
    console.log(`  外立面: ${facade.length} 个文件`);
    console.log(`  户型图: ${layouts.length} 个文件`);
    console.log(`  缩略图: ${thumbnails.length} 个文件`);
  }
}

// 检查特定的问题路径
async function checkProblemPaths() {
  console.log('\n=== 检查问题路径 ===');
  
  const problemPaths = [
    'public/images/communities/jingan-center/公区/社区中心/',
    'public/images/communities/jingan-center/公区/影音厅/',
    'public/images/communities/jingan-center/公区/自习室/',
    'public/images/communities/jingan-center/外立面/',
  ];
  
  for (const path of problemPaths) {
    await checkFiles(path);
  }
}

// 主函数
async function main() {
  try {
    await checkCommunityStructure();
    await checkProblemPaths();
    
    console.log('\n=== 检查完成 ===');
  } catch (error) {
    console.error('检查过程中出错:', error);
  }
}

// 运行检查
if (require.main === module) {
  main();
}

module.exports = { checkFiles, checkCommunityStructure };