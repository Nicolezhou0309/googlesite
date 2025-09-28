// OSS文件夹中英文翻译映射表
export interface FolderTranslation {
  chinese: string
  english: string
  category: 'community' | 'facility' | 'room' | 'apartment' | 'other'
}

export const folderTranslations: FolderTranslation[] = [
  // 社区相关
  { chinese: '公区', english: 'Common Areas', category: 'community' },
  { chinese: '外立面', english: 'Exterior', category: 'community' },
  { chinese: '户型图', english: 'Apartment Layouts', category: 'apartment' },
  { chinese: '缩略图', english: 'Thumbnails', category: 'other' },
  
  // 公区设施
  { chinese: '共享厨房', english: 'Shared Kitchen', category: 'facility' },
  { chinese: '台球室', english: 'Billiards Room', category: 'facility' },
  { chinese: '影音厅', english: 'Mini Theater', category: 'facility' },
  { chinese: '游戏空间', english: 'Game Space', category: 'facility' },
  { chinese: '游戏厅', english: 'Game Room', category: 'facility' },
  { chinese: '社区中心', english: 'Community Center', category: 'facility' },
  { chinese: '自习室', english: 'Study Room', category: 'facility' },
  { chinese: '便利店', english: 'Convenience Store', category: 'facility' },
  { chinese: '健身房', english: 'Gym', category: 'facility' },
  { chinese: '免费班车', english: 'Free Shuttle', category: 'facility' },
  { chinese: '篮球场', english: 'Basketball Court', category: 'facility' },
  { chinese: '乒乓室', english: 'Ping Pong Room', category: 'facility' },
  { chinese: '小剧场', english: 'Small Theater', category: 'facility' },
  { chinese: '录音室', english: 'Recording Studio', category: 'facility' },
  { chinese: '活动室', english: 'Activity Room', category: 'facility' },
  { chinese: '瑜伽室', english: 'Yoga Room', category: 'facility' },
  { chinese: '菜鸟驿站', english: 'Cainiao Station', category: 'facility' },
  
  // 户型名称
  { chinese: '270度全景阳台房', english: '270° Panoramic Balcony', category: 'apartment' },
  { chinese: '意式暖咖雅居', english: 'Italian Warm Coffee Suite', category: 'apartment' },
  { chinese: '法式田园逸居', english: 'French Countryside Retreat', category: 'apartment' },
  { chinese: '都市型男一居室', english: 'Urban Gentleman Studio', category: 'apartment' },
  { chinese: '商务高奢平层', english: 'Business Luxury Flat', category: 'apartment' },
  { chinese: '英式复古平层', english: 'British Retro Flat', category: 'apartment' },
  { chinese: '萌趣跃层复式', english: 'Cute Duplex Loft', category: 'apartment' },
  { chinese: '露台花园平层', english: 'Terrace Garden Flat', category: 'apartment' },
  { chinese: '悦享阳光平层', english: 'Sunny Enjoyment Flat', category: 'apartment' },
  { chinese: '灵动跃层复式', english: 'Dynamic Duplex Loft', category: 'apartment' },
  { chinese: '轻盈精致平层', english: 'Light & Refined Flat', category: 'apartment' },
  { chinese: '雅致舒适平层', english: 'Elegant & Comfortable Flat', category: 'apartment' },
  { chinese: '奶油布丁一居室', english: 'Cream Pudding Studio', category: 'apartment' },
  { chinese: '梦幻少女一居室', english: 'Dream Girl Studio', category: 'apartment' },
  { chinese: '至尊大平层', english: 'Supreme Large Flat', category: 'apartment' },
  { chinese: '花园野趣复式', english: 'Garden Wild Fun Duplex', category: 'apartment' },
  { chinese: '海盐蓝调平层', english: 'Sea Salt Blue Flat', category: 'apartment' },
  { chinese: '温馨奶油平层', english: 'Warm Cream Flat', category: 'apartment' },
]

// 社区名称翻译
export const communityTranslations: Record<string, string> = {
  'jingan-center': 'Jing\'an Center',
  'north-hongqiao': 'North Hongqiao',
  'pujiang-center': 'Pujiang Center',
  'pujiang-park': 'Pujiang Park',
  'zhonghuan-hutai': 'Zhonghuan Hutai',
}

// 获取文件夹英文名称的函数
export function getFolderEnglishName(chineseName: string): string {
  const translation = folderTranslations.find(t => t.chinese === chineseName)
  return translation ? translation.english : chineseName
}

// 获取社区英文名称的函数
export function getCommunityEnglishName(communityId: string): string {
  return communityTranslations[communityId] || communityId
}

// 根据语言获取文件夹显示名称
export function getFolderDisplayName(folderName: string, language: 'zh' | 'en'): string {
  if (language === 'en') {
    return getFolderEnglishName(folderName)
  }
  return folderName
}

// 根据语言获取社区显示名称
export function getCommunityDisplayName(communityId: string, language: 'zh' | 'en'): string {
  if (language === 'en') {
    return getCommunityEnglishName(communityId)
  }
  return communityId
}

// 获取文件夹分类
export function getFolderCategory(folderName: string): string {
  const translation = folderTranslations.find(t => t.chinese === folderName)
  return translation ? translation.category : 'other'
}
