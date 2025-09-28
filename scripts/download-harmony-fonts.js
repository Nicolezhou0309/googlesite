const https = require('https');
const fs = require('fs');
const path = require('path');

// 创建字体目录
const fontsDir = path.join(__dirname, '../public/fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
  console.log('✅ 创建了字体目录:', fontsDir);
}

// HarmonyOS Sans 字体文件配置
const fontFiles = [
  {
    name: 'HarmonyOS_Sans_SC_Regular.woff2',
    url: 'https://developer.huawei.com/consumer/cn/design/resource-V1/fonts/HarmonyOS_Sans_SC_Regular.woff2',
    description: 'HarmonyOS Sans SC Regular'
  },
  {
    name: 'HarmonyOS_Sans_SC_Medium.woff2',
    url: 'https://developer.huawei.com/consumer/cn/design/resource-V1/fonts/HarmonyOS_Sans_SC_Medium.woff2',
    description: 'HarmonyOS Sans SC Medium'
  },
  {
    name: 'HarmonyOS_Sans_SC_Bold.woff2',
    url: 'https://developer.huawei.com/consumer/cn/design/resource-V1/fonts/HarmonyOS_Sans_SC_Bold.woff2',
    description: 'HarmonyOS Sans SC Bold'
  }
];

// 下载文件的函数
function downloadFile(url, filePath, description) {
  return new Promise((resolve, reject) => {
    console.log(`🔄 开始下载 ${description}...`);
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log(`✅ ${description} 下载完成: ${filePath}`);
          resolve();
        });
        
        file.on('error', (err) => {
          fs.unlink(filePath, () => {}); // 删除不完整的文件
          reject(err);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // 处理重定向
        const redirectUrl = response.headers.location;
        console.log(`🔄 ${description} 重定向到: ${redirectUrl}`);
        downloadFile(redirectUrl, filePath, description).then(resolve).catch(reject);
      } else {
        reject(new Error(`下载失败，状态码: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// 主函数
async function downloadFonts() {
  console.log('🚀 开始下载 HarmonyOS Sans 字体文件...\n');
  
  try {
    for (const font of fontFiles) {
      const filePath = path.join(fontsDir, font.name);
      
      // 检查文件是否已存在
      if (fs.existsSync(filePath)) {
        console.log(`⚠️  ${font.description} 已存在，跳过下载`);
        continue;
      }
      
      try {
        await downloadFile(font.url, filePath, font.description);
      } catch (error) {
        console.error(`❌ ${font.description} 下载失败:`, error.message);
        
        // 如果官方链接失败，尝试备用方案
        console.log(`🔄 尝试备用下载方案...`);
        try {
          // 这里可以添加备用的下载链接或使用其他字体
          await downloadFromAlternative(font.name, filePath, font.description);
        } catch (altError) {
          console.error(`❌ ${font.description} 备用下载也失败:`, altError.message);
        }
      }
    }
    
    console.log('\n🎉 字体下载任务完成！');
    console.log('📁 字体文件位置:', fontsDir);
    
  } catch (error) {
    console.error('❌ 下载过程中出现错误:', error);
  }
}

// 备用下载方案 - 使用 Google Fonts 或系统字体
async function downloadFromAlternative(fontName, filePath, description) {
  console.log(`⚠️  ${description} 官方链接不可用，建议使用系统字体替代`);
  
  // 创建字体 CSS 文件作为备用方案
  const cssContent = `/* HarmonyOS Sans 字体备用方案 */
@font-face {
  font-family: 'HarmonyOS Sans SC';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: local('PingFang SC'), local('Hiragino Sans GB'), local('Microsoft YaHei'), local('Helvetica Neue'), Arial, sans-serif;
}

@font-face {
  font-family: 'HarmonyOS Sans SC';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: local('PingFang SC Medium'), local('Hiragino Sans GB'), local('Microsoft YaHei'), local('Helvetica Neue'), Arial, sans-serif;
}

@font-face {
  font-family: 'HarmonyOS Sans SC';
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: local('PingFang SC Bold'), local('Hiragino Sans GB'), local('Microsoft YaHei'), local('Helvetica Neue'), Arial, sans-serif;
}`;
  
  const cssPath = path.join(fontsDir, 'harmonyos-sans-fallback.css');
  fs.writeFileSync(cssPath, cssContent);
  console.log(`✅ 创建了备用字体 CSS 文件: ${cssPath}`);
}

// 运行下载
downloadFonts();
