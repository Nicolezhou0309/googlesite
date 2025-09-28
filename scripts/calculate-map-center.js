/**
 * 计算包含所有大学和社区的地图中心点
 */

// 所有大学坐标（高德地图API获取）
const universities = [
  { name: '同济大学', lat: 31.283465, lng: 121.501622 },
  { name: '复旦大学', lat: 31.297025, lng: 121.502871 },
  { name: '上海财经大学', lat: 31.305858, lng: 121.499032 },
  { name: '华东师范大学', lat: 31.227663, lng: 121.406829 },
  { name: '上海纽约大学', lat: 31.225610, lng: 121.533960 },
  { name: '上海理工大学', lat: 31.292707, lng: 121.554992 },
  { name: '上海交通大学', lat: 31.023988, lng: 121.436248 }
];

// 所有社区坐标
const communities = [
  { name: '浦江中心社区', lat: 31.067197, lng: 121.523561 },
  { name: '浦江公园社区', lat: 31.061538, lng: 121.506352 },
  { name: '北虹桥社区', lat: 31.243580, lng: 121.315428 },
  { name: '静安中心社区', lat: 31.311276, lng: 121.446857 },
  { name: '沪太路社区', lat: 31.291858, lng: 121.419637 }
];

// 合并所有坐标
const allLocations = [...universities, ...communities];

console.log('🎓 大学坐标：');
universities.forEach((uni, index) => {
  console.log(`${index + 1}. ${uni.name}: ${uni.lat}, ${uni.lng}`);
});

console.log('\n🏢 社区坐标：');
communities.forEach((community, index) => {
  console.log(`${index + 1}. ${community.name}: ${community.lat}, ${community.lng}`);
});

// 计算中心点
const centerLat = allLocations.reduce((sum, loc) => sum + loc.lat, 0) / allLocations.length;
const centerLng = allLocations.reduce((sum, loc) => sum + loc.lng, 0) / allLocations.length;

console.log('\n📊 坐标统计：');
console.log(`总位置数: ${allLocations.length}`);
console.log(`纬度范围: ${Math.min(...allLocations.map(l => l.lat))} - ${Math.max(...allLocations.map(l => l.lat))}`);
console.log(`经度范围: ${Math.min(...allLocations.map(l => l.lng))} - ${Math.max(...allLocations.map(l => l.lng))}`);

// 计算覆盖范围
const latRange = Math.max(...allLocations.map(l => l.lat)) - Math.min(...allLocations.map(l => l.lat));
const lngRange = Math.max(...allLocations.map(l => l.lng)) - Math.min(...allLocations.map(l => l.lng));

console.log(`纬度跨度: ${latRange.toFixed(6)}`);
console.log(`经度跨度: ${lngRange.toFixed(6)}`);

console.log('\n🗺️ 建议地图配置：');
console.log(`中心点: ${centerLat.toFixed(6)}, ${centerLng.toFixed(6)}`);

// 根据覆盖范围建议缩放级别
let suggestedZoom;
if (latRange > 0.3 || lngRange > 0.3) {
  suggestedZoom = 10; // 较大范围
} else if (latRange > 0.2 || lngRange > 0.2) {
  suggestedZoom = 11; // 中等范围
} else {
  suggestedZoom = 12; // 较小范围
}

console.log(`建议缩放级别: ${suggestedZoom}`);

console.log('\n💻 更新代码：');
console.log(`center={{ lat: ${centerLat.toFixed(6)}, lng: ${centerLng.toFixed(6)} }}`);
console.log(`zoom={${suggestedZoom}}`);

// 验证所有位置是否在合理范围内
console.log('\n🔍 位置验证：');
allLocations.forEach(location => {
  const latValid = location.lat >= 30.7 && location.lat <= 31.9;
  const lngValid = location.lng >= 120.8 && location.lng <= 122.0;
  console.log(`${location.name}: 纬度${latValid ? '✅' : '❌'} 经度${lngValid ? '✅' : '❌'}`);
});

console.log('\n✅ 计算完成！');
