const https = require('https');
const fs = require('fs');
const path = require('path');

// 服务图标列表
const serviceIcons = [
  { name: '每日班车', url: 'https://img.vld.com.cn/website/ourservice/DailyBus.png' },
  { name: '专属管家', url: 'https://img.vld.com.cn/website/ourservice/ExclusiveButler.png' },
  { name: '公区保洁', url: 'https://img.vld.com.cn/website/ourservice/PublicAreaCleaning.png' },
  { name: '扫地机器人', url: 'https://img.vld.com.cn/website/ourservice/SweepingRobot.png' },
  { name: '日常消毒', url: 'https://img.vld.com.cn/website/ourservice/DailyDisinfection.png' },
  { name: '24H安保', url: 'https://img.vld.com.cn/website/ourservice/24HSecurity.png' },
  { name: '专业维修', url: 'https://img.vld.com.cn/website/ourservice/ProfessionalMaintenance.png' },
  { name: '搬家协助', url: 'https://img.vld.com.cn/website/ourservice/move.png' },
  { name: '代收快递', url: 'https://img.vld.com.cn/website/ourservice/Courier.png' },
  { name: '社区活动', url: 'https://img.vld.com.cn/website/ourservice/StoreActivity.png' },
  { name: '安全保障', url: 'https://img.vld.com.cn/website/ourservice/Security.png' },
  { name: 'APP服务自助办理', url: 'https://img.vld.com.cn/website/ourservice/APP.png' }
];

// 创建目标目录
const targetDir = path.join(__dirname, '../public/images/icons');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 下载函数
function downloadIcon(icon) {
  return new Promise((resolve, reject) => {
    const fileName = `${icon.name}.png`;
    const filePath = path.join(targetDir, fileName);
    
    console.log(`正在下载: ${icon.name}...`);
    
    const file = fs.createWriteStream(filePath);
    
    https.get(icon.url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ 下载完成: ${fileName}`);
          resolve(fileName);
        });
      } else {
        console.error(`❌ 下载失败: ${icon.name} (状态码: ${response.statusCode})`);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`❌ 下载错误: ${icon.name}`, err.message);
      reject(err);
    });
  });
}

// 批量下载
async function downloadAllIcons() {
  console.log('开始下载服务图标...\n');
  
  const results = [];
  
  for (const icon of serviceIcons) {
    try {
      const fileName = await downloadIcon(icon);
      results.push({ name: icon.name, fileName, success: true });
    } catch (error) {
      results.push({ name: icon.name, fileName: null, success: false, error: error.message });
    }
  }
  
  console.log('\n下载结果汇总:');
  console.log('================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ 成功: ${successful.length} 个`);
  successful.forEach(r => console.log(`   - ${r.name} → ${r.fileName}`));
  
  if (failed.length > 0) {
    console.log(`❌ 失败: ${failed.length} 个`);
    failed.forEach(r => console.log(`   - ${r.name}: ${r.error}`));
  }
  
  console.log('\n下载完成！');
  console.log(`图标已保存到: ${targetDir}`);
}

// 运行下载
downloadAllIcons().catch(console.error);
