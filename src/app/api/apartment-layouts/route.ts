import { NextRequest, NextResponse } from 'next/server'
import { getOSSImageUrl, getCommunityImageUrl } from '@/lib/imageConfig'
import { getCommunityFolderStructure } from '@/lib/communityConfig'

// 获取房型图片的静态函数
function getApartmentImages(communityId: string, apartmentType: string): any[] {
  // 基于房型类型生成图片列表
  const imageCount = getImageCountForApartmentType(apartmentType)
  const images = []
  
  for (let i = 1; i <= imageCount; i++) {
    images.push({
      id: `${communityId}-${apartmentType}-${i}`,
      src: getCommunityImageUrl(communityId, `户型图/${apartmentType}/${i}.webp`),
      alt: `${apartmentType} - 图片 ${i}`,
      width: 800,
      height: 600
    })
  }
  
  return images
}

// 根据房型类型获取图片数量
function getImageCountForApartmentType(apartmentType: string): number {
  const imageCounts: Record<string, number> = {
    '270度全景阳台房': 7,
    '意式暖咖雅居': 8,
    '法式田园逸居': 9,
    '都市型男一居室': 6,
    '商务高奢平层': 11,
    '英式复古平层': 8,
    '萌趣跃层复式': 11,
    '露台花园平层': 7,
    '悦享阳光平层': 11,
    '灵动跃层复式': 7,
    '轻盈精致平层': 5,
    '雅致舒适平层': 7,
    '奶油布丁一居室': 8,
    '梦幻少女一居室': 8,
    '至尊大平层': 8,
    '花园野趣复式': 7,
    '海盐蓝调平层': 9,
    '温馨奶油平层': 8
  }
  
  return imageCounts[apartmentType] || 5
}

interface ApartmentLayout {
  id: string
  name: string
  displayName: string
  communityId: string
  communityName: string
  images: Array<{
    id: string
    src: string
    alt: string
    thumbnail?: string
    width: number
    height: number
    isMain?: boolean
    order?: number
  }>
  area: number
  price: number
  currency: string
  features: string[]
  facilities: string[]
  availability: 'available' | 'occupied' | 'maintenance'
  floor?: number
  orientation?: string
  layout?: string
}

// 房型配置数据 - 基于实际OSS结构
const apartmentConfigs = {
  'jingan-center': {
    name: '新静安中心微领地青年社区',
    layouts: [
      {
        id: 'jingan-270-degree-balcony',
        name: '270度全景阳台房',
        displayName: '270度全景阳台房',
        area: 35,
        price: 4500,
        features: ['270度全景阳台', '独立卫浴', '小厨房', '空调', 'WiFi'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 8,
        orientation: '南向',
        layout: '一室一厅'
      },
      {
        id: 'jingan-italian-warm-coffee',
        name: '意式暖咖雅居',
        displayName: '意式暖咖雅居',
        area: 42,
        price: 5200,
        features: ['意式装修风格', '暖色调设计', '独立卫浴', '厨房', '阳台'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 6,
        orientation: '东南向',
        layout: '一室一厅'
      },
      {
        id: 'jingan-french-countryside',
        name: '法式田园逸居',
        displayName: '法式田园逸居',
        area: 48,
        price: 5800,
        features: ['法式田园风格', '温馨舒适', '独立卫浴', '大厨房', '双阳台'],
        facilities: ['双阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 10,
        orientation: '南向',
        layout: '一室一厅'
      },
      {
        id: 'jingan-urban-male-studio',
        name: '都市型男一居室',
        displayName: '都市型男一居室',
        area: 38,
        price: 4800,
        features: ['现代简约风格', '都市时尚', '独立卫浴', '厨房', '阳台'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 7,
        orientation: '西向',
        layout: '一室一厅'
      }
    ]
  },
  'north-hongqiao': {
    name: '北虹桥国际微领地青年社区',
    layouts: [
      {
        id: 'north-business-luxury-flat',
        name: '商务高奢平层',
        displayName: '商务高奢平层',
        area: 65,
        price: 7500,
        features: ['商务风格', '高端装修', '独立卫浴', '大厨房', '双阳台'],
        facilities: ['双阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 12,
        orientation: '南向',
        layout: '两室一厅'
      },
      {
        id: 'north-british-retro-flat',
        name: '英式复古平层',
        displayName: '英式复古平层',
        area: 58,
        price: 6800,
        features: ['英式复古风格', '经典设计', '独立卫浴', '厨房', '阳台'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 9,
        orientation: '东向',
        layout: '两室一厅'
      },
      {
        id: 'north-cute-duplex',
        name: '萌趣跃层复式',
        displayName: '萌趣跃层复式',
        area: 72,
        price: 8500,
        features: ['跃层设计', '萌趣风格', '独立卫浴', '大厨房', '露台'],
        facilities: ['露台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 15,
        orientation: '南向',
        layout: '复式'
      },
      {
        id: 'north-terrace-garden-flat',
        name: '露台花园平层',
        displayName: '露台花园平层',
        area: 55,
        price: 7200,
        features: ['露台花园', '自然风格', '独立卫浴', '厨房', '花园'],
        facilities: ['花园', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 8,
        orientation: '南向',
        layout: '一室一厅'
      }
    ]
  },
  'pujiang-center': {
    name: '浦江中心微领地青年社区',
    layouts: [
      {
        id: 'pujiang-sunny-flat',
        name: '悦享阳光平层',
        displayName: '悦享阳光平层',
        area: 45,
        price: 5500,
        features: ['阳光充足', '现代装修', '独立卫浴', '厨房', '阳台'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 6,
        orientation: '南向',
        layout: '一室一厅'
      },
      {
        id: 'pujiang-flexible-duplex',
        name: '灵动跃层复式',
        displayName: '灵动跃层复式',
        area: 68,
        price: 7800,
        features: ['跃层设计', '灵动空间', '独立卫浴', '大厨房', '露台'],
        facilities: ['露台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 11,
        orientation: '东南向',
        layout: '复式'
      },
      {
        id: 'pujiang-light-elegant-flat',
        name: '轻盈精致平层',
        displayName: '轻盈精致平层',
        area: 38,
        price: 4800,
        features: ['轻盈设计', '精致装修', '独立卫浴', '厨房', '阳台'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 5,
        orientation: '西向',
        layout: '一室一厅'
      },
      {
        id: 'pujiang-elegant-comfortable-flat',
        name: '雅致舒适平层',
        displayName: '雅致舒适平层',
        area: 52,
        price: 6200,
        features: ['雅致风格', '舒适居住', '独立卫浴', '大厨房', '双阳台'],
        facilities: ['双阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 8,
        orientation: '南向',
        layout: '两室一厅'
      }
    ]
  },
  'pujiang-park': {
    name: '浦江公园微领地青年社区',
    layouts: [
      {
        id: 'pujiang-park-cream-pudding-studio',
        name: '奶油布丁一居室',
        displayName: '奶油布丁一居室',
        area: 32,
        price: 4200,
        features: ['奶油色调', '温馨舒适', '独立卫浴', '小厨房', '阳台'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 4,
        orientation: '南向',
        layout: '一室一厅'
      },
      {
        id: 'pujiang-park-dreamy-girl-studio',
        name: '梦幻少女一居室',
        displayName: '梦幻少女一居室',
        area: 35,
        price: 4500,
        features: ['梦幻风格', '少女心设计', '独立卫浴', '厨房', '阳台'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 6,
        orientation: '东向',
        layout: '一室一厅'
      },
      {
        id: 'pujiang-park-supreme-flat',
        name: '至尊大平层',
        displayName: '至尊大平层',
        area: 78,
        price: 9200,
        features: ['至尊享受', '大平层设计', '独立卫浴', '大厨房', '双阳台'],
        facilities: ['双阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 14,
        orientation: '南向',
        layout: '两室一厅'
      },
      {
        id: 'pujiang-park-garden-wild-duplex',
        name: '花园野趣复式',
        displayName: '花园野趣复式',
        area: 85,
        price: 9800,
        features: ['花园设计', '野趣风格', '独立卫浴', '大厨房', '花园露台'],
        facilities: ['花园露台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 16,
        orientation: '南向',
        layout: '复式'
      }
    ]
  },
  'zhonghuan-hutai': {
    name: '中环沪太路微领地青年社区',
    layouts: [
      {
        id: 'zhonghuan-modern-studio',
        name: '现代简约一居室',
        displayName: '现代简约一居室',
        area: 28,
        price: 3800,
        features: ['现代简约', '空间利用', '独立卫浴', '小厨房', '阳台'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 3,
        orientation: '北向',
        layout: '一室一厅'
      },
      {
        id: 'zhonghuan-cozy-studio',
        name: '温馨舒适一居室',
        displayName: '温馨舒适一居室',
        area: 32,
        price: 4200,
        features: ['温馨舒适', '居家风格', '独立卫浴', '厨房', '阳台'],
        facilities: ['阳台', '卫浴', '厨房', '空调', '网络'],
        availability: 'available' as const,
        floor: 5,
        orientation: '南向',
        layout: '一室一厅'
      }
    ]
  }
}

// 生成图片数据 - 使用固定的文件名规则
function generateApartmentImages(communityId: string, layoutName: string): Array<{
  id: string
  src: string
  alt: string
  thumbnail: string
  width: number
  height: number
  isMain: boolean
  order: number
}> {
  const images: Array<{
    id: string
    src: string
    alt: string
    thumbnail: string
    width: number
    height: number
    isMain: boolean
    order: number
  }> = []
  
  // 固定使用 1.webp 作为主图，2.webp 和 3.webp 作为预览图
  const imageFiles = ['1.webp', '2.webp', '3.webp']
  
  imageFiles.forEach((filename, index) => {
    const imageId = `${communityId}-${layoutName}-${index + 1}`
    const imagePath = `户型图/${layoutName}/${filename}`
    
    images.push({
      id: imageId,
      src: `/images/communities/${communityId}/${imagePath}`,
      alt: `${layoutName} - 图片 ${index + 1}`,
      thumbnail: `/images/communities/${communityId}/${imagePath}`,
      width: 800,
      height: 600,
      isMain: index === 0, // 第一张图片作为主图
      order: index + 1
    })
  })
  
  return images
}

// 生成房型数据 - 基于文件夹结构
async function generateApartmentLayoutsFromFolders(communityId: string): Promise<ApartmentLayout[]> {
  try {
    // 获取文件夹结构
    const folders = getCommunityFolderStructure(communityId)
    
    // 查找户型图文件夹
    const layoutFolder = folders.find(folder => folder.name === '户型图')
    if (!layoutFolder || !layoutFolder.subfolders) {
      console.warn(`社区 ${communityId} 没有找到户型图文件夹`)
      return []
    }

    const apartments: ApartmentLayout[] = []

    // 遍历每个房型子文件夹
    for (const subfolder of layoutFolder.subfolders) {
      // 获取该房型的图片 - 使用静态配置
      const images = getApartmentImages(communityId, subfolder.name)
      
      if (images.length > 0) {
        // 生成房型数据
        const apartment: ApartmentLayout = {
          id: `${communityId}-${subfolder.name}`,
          name: subfolder.name,
          displayName: subfolder.name,
          communityId,
          communityName: getCommunityName(communityId),
          images: images.map((image, index) => ({
            id: `${communityId}-${subfolder.name}-${index + 1}`,
            src: image.src,
            alt: image.alt,
            thumbnail: image.thumbnail,
            width: image.width,
            height: image.height,
            isMain: index === 0,
            order: index + 1
          })),
          area: getDefaultArea(subfolder.name),
          price: getDefaultPrice(subfolder.name),
          currency: 'CNY',
          features: getDefaultFeatures(subfolder.name),
          facilities: getDefaultFacilities(subfolder.name),
          availability: 'available',
          floor: getDefaultFloor(subfolder.name),
          orientation: getDefaultOrientation(subfolder.name),
          layout: getDefaultLayout(subfolder.name)
        }

        apartments.push(apartment)
      }
    }

    return apartments
  } catch (error) {
    console.error('生成房型数据失败:', error)
    return []
  }
}

// 获取社区名称
function getCommunityName(communityId: string): string {
  const nameMap: Record<string, string> = {
    'jingan-center': '上海新静安中心社区',
    'north-hongqiao': '北虹桥国际微领地青年社区',
    'pujiang-center': '浦江中心微领地青年社区',
    'pujiang-park': '浦江公园微领地青年社区',
    'zhonghuan-hutai': '中环沪太路微领地青年社区'
  }
  return nameMap[communityId] || communityId
}

// 获取默认面积
function getDefaultArea(layoutName: string): number {
  const areaMap: Record<string, number> = {
    '270度全景阳台房': 35,
    '意式暖咖雅居': 42,
    '法式田园逸居': 48,
    '都市型男一居室': 38,
    '商务高奢平层': 65,
    '英式复古平层': 58,
    '萌趣跃层复式': 72,
    '露台花园平层': 55,
    '悦享阳光平层': 45,
    '灵动跃层复式': 68,
    '轻盈精致平层': 38,
    '雅致舒适平层': 52,
    '奶油布丁一居室': 32,
    '梦幻少女一居室': 35,
    '至尊大平层': 78,
    '花园野趣复式': 85,
    '现代简约一居室': 28,
    '温馨舒适一居室': 32
  }
  return areaMap[layoutName] || 35
}

// 获取默认价格
function getDefaultPrice(layoutName: string): number {
  const priceMap: Record<string, number> = {
    '270度全景阳台房': 4500,
    '意式暖咖雅居': 5200,
    '法式田园逸居': 5800,
    '都市型男一居室': 4800,
    '商务高奢平层': 7500,
    '英式复古平层': 6800,
    '萌趣跃层复式': 8500,
    '露台花园平层': 7200,
    '悦享阳光平层': 5500,
    '灵动跃层复式': 7800,
    '轻盈精致平层': 4800,
    '雅致舒适平层': 6200,
    '奶油布丁一居室': 4200,
    '梦幻少女一居室': 4500,
    '至尊大平层': 9200,
    '花园野趣复式': 9800,
    '现代简约一居室': 3800,
    '温馨舒适一居室': 4200
  }
  return priceMap[layoutName] || 4500
}

// 获取默认特色
function getDefaultFeatures(layoutName: string): string[] {
  const featuresMap: Record<string, string[]> = {
    '270度全景阳台房': ['270度全景阳台', '独立卫浴', '小厨房', '空调', 'WiFi'],
    '意式暖咖雅居': ['意式装修风格', '暖色调设计', '独立卫浴', '厨房', '阳台'],
    '法式田园逸居': ['法式田园风格', '温馨舒适', '独立卫浴', '大厨房', '双阳台'],
    '都市型男一居室': ['现代简约风格', '都市时尚', '独立卫浴', '厨房', '阳台'],
    '商务高奢平层': ['商务风格', '高端装修', '独立卫浴', '大厨房', '双阳台'],
    '英式复古平层': ['英式复古风格', '经典设计', '独立卫浴', '厨房', '阳台'],
    '萌趣跃层复式': ['跃层设计', '萌趣风格', '独立卫浴', '大厨房', '露台'],
    '露台花园平层': ['露台花园', '自然风格', '独立卫浴', '厨房', '花园'],
    '悦享阳光平层': ['阳光充足', '现代装修', '独立卫浴', '厨房', '阳台'],
    '灵动跃层复式': ['跃层设计', '灵动空间', '独立卫浴', '大厨房', '露台'],
    '轻盈精致平层': ['轻盈设计', '精致装修', '独立卫浴', '厨房', '阳台'],
    '雅致舒适平层': ['雅致风格', '舒适居住', '独立卫浴', '大厨房', '双阳台'],
    '奶油布丁一居室': ['奶油色调', '温馨舒适', '独立卫浴', '小厨房', '阳台'],
    '梦幻少女一居室': ['梦幻风格', '少女心设计', '独立卫浴', '厨房', '阳台'],
    '至尊大平层': ['至尊享受', '大平层设计', '独立卫浴', '大厨房', '双阳台'],
    '花园野趣复式': ['花园设计', '野趣风格', '独立卫浴', '大厨房', '花园露台'],
    '现代简约一居室': ['现代简约', '空间利用', '独立卫浴', '小厨房', '阳台'],
    '温馨舒适一居室': ['温馨舒适', '居家风格', '独立卫浴', '厨房', '阳台']
  }
  return featuresMap[layoutName] || ['独立卫浴', '厨房', '阳台', '空调', '网络']
}

// 获取默认设施
function getDefaultFacilities(layoutName: string): string[] {
  const facilitiesMap: Record<string, string[]> = {
    '270度全景阳台房': ['阳台', '卫浴', '厨房', '空调', '网络'],
    '意式暖咖雅居': ['阳台', '卫浴', '厨房', '空调', '网络'],
    '法式田园逸居': ['双阳台', '卫浴', '厨房', '空调', '网络'],
    '都市型男一居室': ['阳台', '卫浴', '厨房', '空调', '网络'],
    '商务高奢平层': ['双阳台', '卫浴', '厨房', '空调', '网络'],
    '英式复古平层': ['阳台', '卫浴', '厨房', '空调', '网络'],
    '萌趣跃层复式': ['露台', '卫浴', '厨房', '空调', '网络'],
    '露台花园平层': ['花园', '卫浴', '厨房', '空调', '网络'],
    '悦享阳光平层': ['阳台', '卫浴', '厨房', '空调', '网络'],
    '灵动跃层复式': ['露台', '卫浴', '厨房', '空调', '网络'],
    '轻盈精致平层': ['阳台', '卫浴', '厨房', '空调', '网络'],
    '雅致舒适平层': ['双阳台', '卫浴', '厨房', '空调', '网络'],
    '奶油布丁一居室': ['阳台', '卫浴', '厨房', '空调', '网络'],
    '梦幻少女一居室': ['阳台', '卫浴', '厨房', '空调', '网络'],
    '至尊大平层': ['双阳台', '卫浴', '厨房', '空调', '网络'],
    '花园野趣复式': ['花园露台', '卫浴', '厨房', '空调', '网络'],
    '现代简约一居室': ['阳台', '卫浴', '厨房', '空调', '网络'],
    '温馨舒适一居室': ['阳台', '卫浴', '厨房', '空调', '网络']
  }
  return facilitiesMap[layoutName] || ['阳台', '卫浴', '厨房', '空调', '网络']
}

// 获取默认楼层
function getDefaultFloor(layoutName: string): number {
  const floorMap: Record<string, number> = {
    '270度全景阳台房': 8,
    '意式暖咖雅居': 6,
    '法式田园逸居': 10,
    '都市型男一居室': 7,
    '商务高奢平层': 12,
    '英式复古平层': 9,
    '萌趣跃层复式': 15,
    '露台花园平层': 8,
    '悦享阳光平层': 6,
    '灵动跃层复式': 11,
    '轻盈精致平层': 5,
    '雅致舒适平层': 8,
    '奶油布丁一居室': 4,
    '梦幻少女一居室': 6,
    '至尊大平层': 14,
    '花园野趣复式': 16,
    '现代简约一居室': 3,
    '温馨舒适一居室': 5
  }
  return floorMap[layoutName] || 6
}

// 获取默认朝向
function getDefaultOrientation(layoutName: string): string {
  const orientationMap: Record<string, string> = {
    '270度全景阳台房': '南向',
    '意式暖咖雅居': '东南向',
    '法式田园逸居': '南向',
    '都市型男一居室': '西向',
    '商务高奢平层': '南向',
    '英式复古平层': '东向',
    '萌趣跃层复式': '南向',
    '露台花园平层': '南向',
    '悦享阳光平层': '南向',
    '灵动跃层复式': '东南向',
    '轻盈精致平层': '西向',
    '雅致舒适平层': '南向',
    '奶油布丁一居室': '南向',
    '梦幻少女一居室': '东向',
    '至尊大平层': '南向',
    '花园野趣复式': '南向',
    '现代简约一居室': '北向',
    '温馨舒适一居室': '南向'
  }
  return orientationMap[layoutName] || '南向'
}

// 获取默认户型
function getDefaultLayout(layoutName: string): string {
  const layoutMap: Record<string, string> = {
    '270度全景阳台房': '一室一厅',
    '意式暖咖雅居': '一室一厅',
    '法式田园逸居': '一室一厅',
    '都市型男一居室': '一室一厅',
    '商务高奢平层': '两室一厅',
    '英式复古平层': '两室一厅',
    '萌趣跃层复式': '复式',
    '露台花园平层': '一室一厅',
    '悦享阳光平层': '一室一厅',
    '灵动跃层复式': '复式',
    '轻盈精致平层': '一室一厅',
    '雅致舒适平层': '两室一厅',
    '奶油布丁一居室': '一室一厅',
    '梦幻少女一居室': '一室一厅',
    '至尊大平层': '两室一厅',
    '花园野趣复式': '复式',
    '现代简约一居室': '一室一厅',
    '温馨舒适一居室': '一室一厅'
  }
  return layoutMap[layoutName] || '一室一厅'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const communityId = searchParams.get('communityId')
    const layoutId = searchParams.get('layoutId')
    
    // 添加缓存控制头，防止缓存问题
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }

    // 如果指定了社区ID，只返回该社区的房型
    if (communityId) {
      // 基于文件夹结构生成房型数据
      const apartments = await generateApartmentLayoutsFromFolders(communityId)
      
      if (apartments.length === 0) {
        return NextResponse.json({ 
          success: false, 
          error: 'No apartment layouts found' 
        }, { status: 404, headers })
      }

      // 如果指定了具体房型ID，只返回该房型
      if (layoutId) {
        const apartment = apartments.find(apt => apt.id === layoutId)
        if (!apartment) {
          return NextResponse.json({ 
            success: false, 
            error: 'Layout not found' 
          }, { status: 404, headers })
        }

        return NextResponse.json({
          success: true,
          data: apartment
        }, { headers })
      }

      // 返回该社区的所有房型
      return NextResponse.json({
        success: true,
        data: apartments
      }, { headers })
    }

    // 返回所有社区的房型
    const allApartments: ApartmentLayout[] = []
    const communityIds = ['jingan-center', 'north-hongqiao', 'pujiang-center', 'pujiang-park', 'zhonghuan-hutai']
    
    for (const id of communityIds) {
      const apartments = await generateApartmentLayoutsFromFolders(id)
      allApartments.push(...apartments)
    }

    return NextResponse.json({
      success: true,
      data: allApartments
    }, { headers })

  } catch (error) {
    console.error('Error fetching apartment layouts:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
