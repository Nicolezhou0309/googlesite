/**
 * 使用高德地图API搜索上海大学精确坐标
 */

const https = require('https');

// 高德地图API密钥
const AMAP_API_KEY = '3c78c8ef441a52f0ce1d15cbd18d3e5a';

// 要搜索的大学列表
const universities = [
  {
    name: '同济大学杨浦校区',
    address: '上海市杨浦区四平路1239号'
  },
  {
    name: '复旦大学杨浦校区',
    address: '上海市杨浦区邯郸路220号'
  },
  {
    name: '上海财经大学',
    address: '上海市杨浦区国定路777号'
  },
  {
    name: '华东师范大学',
    address: '上海市普陀区中山北路3663号'
  }
];

// 高德地图地理编码API
async function searchUniversityCoordinates(university) {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(university.address);
    const url = `https://restapi.amap.com/v3/geocode/geo?key=${AMAP_API_KEY}&address=${encodedAddress}&city=上海`;
    
    console.log(`🔍 搜索: ${university.name}`);
    console.log(`📍 地址: ${university.address}`);
    console.log(`🌐 API URL: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log(`📊 API响应:`, JSON.stringify(result, null, 2));
          
          if (result.status === '1' && result.geocodes && result.geocodes.length > 0) {
            const geocode = result.geocodes[0];
            const location = geocode.location.split(',');
            
            resolve({
              name: university.name,
              address: university.address,
              coordinates: {
                lng: parseFloat(location[0]),
                lat: parseFloat(location[1])
              },
              formattedAddress: geocode.formatted_address,
              level: geocode.level,
              city: geocode.city,
              district: geocode.district
            });
          } else {
            console.log(`❌ 搜索失败: ${result.info || '未知错误'}`);
            resolve({
              name: university.name,
              address: university.address,
              error: result.info || '搜索失败'
            });
          }
        } catch (error) {
          console.log(`❌ 解析响应失败:`, error.message);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.log(`❌ 网络请求失败:`, error.message);
      reject(error);
    });
  });
}

// 主函数
async function main() {
  console.log('🎓 开始搜索上海大学精确坐标...\n');
  
  const results = [];
  
  for (const university of universities) {
    try {
      const result = await searchUniversityCoordinates(university);
      results.push(result);
      
      if (result.coordinates) {
        console.log(`✅ ${result.name}`);
        console.log(`   坐标: ${result.coordinates.lng}, ${result.coordinates.lat}`);
        console.log(`   格式化地址: ${result.formattedAddress}`);
        console.log(`   级别: ${result.level}`);
        console.log(`   城市: ${result.city}`);
        console.log(`   区域: ${result.district}\n`);
      } else {
        console.log(`❌ ${result.name}: ${result.error}\n`);
      }
      
      // 添加延迟避免API限制
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`❌ ${university.name}: ${error.message}\n`);
      results.push({
        name: university.name,
        address: university.address,
        error: error.message
      });
    }
  }
  
  // 输出结果总结
  console.log('📋 搜索结果总结:');
  console.log('=' .repeat(50));
  
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.name}`);
    if (result.coordinates) {
      console.log(`   坐标: ${result.coordinates.lng}, ${result.coordinates.lat}`);
      console.log(`   区域: ${result.district}`);
    } else {
      console.log(`   错误: ${result.error}`);
    }
    console.log('');
  });
  
  // 生成更新代码
  console.log('💻 更新地图组件的代码:');
  console.log('=' .repeat(50));
  
  results.forEach((result, index) => {
    if (result.coordinates) {
      const id = result.name.toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '')
        .replace(/大学/g, '')
        .replace(/校区/g, '')
        .replace(/上海/g, '')
        .replace(/杨浦区/g, 'yangpu')
        .replace(/普陀区/g, 'putuo');
      
      console.log(`{
  id: '${id}',
  position: { lat: ${result.coordinates.lat}, lng: ${result.coordinates.lng} },
  name: '${result.name}',
  englishName: '${result.name}',
  district: '${result.district}',
  address: '${result.address}'
},`);
    }
  });
  
  console.log('\n✅ 搜索完成！');
}

// 运行主函数
main().catch(console.error);
