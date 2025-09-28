/**
 * 图标和服务库
 * 统一管理所有图标和服务的配置
 */

// 图标配置接口
export interface IconConfig {
  name: string
  nameEn: string
  icon: string
  category: 'room' | 'community' | 'service'
}

// 房间配套图标库 - 所有社区通用
export const roomAmenityIcons: IconConfig[] = [
  { name: '免费网络', nameEn: 'Free WiFi', icon: 'https://img.vld.com.cn/website/roomfacilitys/IndependentNetwork.png', category: 'room' },
  { name: '品牌冰箱', nameEn: 'Brand Refrigerator', icon: 'https://img.vld.com.cn/website/roomfacilitys/BrandRefrigerator.png', category: 'room' },
  { name: '品牌空调', nameEn: 'Brand Air Conditioner', icon: 'https://img.vld.com.cn/website/roomfacilitys/BrandAirConditioner.png', category: 'room' },
  { name: '品牌洗衣机', nameEn: 'Brand Washing Machine', icon: 'https://img.vld.com.cn/website/roomfacilitys/BrandWashingMachine.png', category: 'room' },
  { name: '品质沙发', nameEn: 'Quality Sofa', icon: 'https://img.vld.com.cn/website/roomfacilitys/LeatherSofa.png', category: 'room' },
  { name: '定制床垫', nameEn: 'Customized Mattress', icon: 'https://img.vld.com.cn/website/roomfacilitys/CustomizedMattress.png', category: 'room' },
  { name: '独立卫生间', nameEn: 'Private Bathroom', icon: 'https://img.vld.com.cn/website/roomfacilitys/IndependentToilet.png', category: 'room' },
  { name: '24H热水', nameEn: '24H Hot Water', icon: 'https://img.vld.com.cn/website/roomfacilitys/FastHeatingWaterHeater.png', category: 'room' },
  { name: '宽敞衣柜', nameEn: 'Spacious Wardrobe', icon: 'https://img.vld.com.cn/website/roomfacilitys/SpaciousWardrobe.png', category: 'room' },
  { name: '智能水电', nameEn: 'Smart Utilities', icon: 'https://img.vld.com.cn/website/roomfacilitys/IntelligentHydropower.png', category: 'room' },
  { name: '智能门锁', nameEn: 'Smart Door Lock', icon: 'https://img.vld.com.cn/website/roomfacilitys/IntelligentLocks.png', category: 'room' },
  { name: '楼道安全监控', nameEn: 'Corridor Security Monitoring', icon: 'https://img.vld.com.cn/website/roomfacilitys/CorridorSafetyMonitoring.png', category: 'room' }
]

// 社区配套图标库 - 可复用的图标
export const communityAmenityIcons: IconConfig[] = [
  { name: '运营中心', nameEn: 'Operation Center', icon: 'https://img.vld.com.cn/website/storefacilitys/OperationCenter.png', category: 'community' },
  { name: '共享厨房', nameEn: 'Shared Kitchen', icon: 'https://img.vld.com.cn/website/storefacilitys/SharedKitchen.png', category: 'community' },
  { name: '共享餐厅', nameEn: 'Shared Restaurant', icon: 'https://img.vld.com.cn/website/storefacilitys/SharedRestaurant.png', category: 'community' },
  { name: '快递驿站', nameEn: 'Express Station', icon: 'https://img.vld.com.cn/website/storefacilitys/ExpressStation.png', category: 'community' },
  { name: '公共晾衣区', nameEn: 'Public Laundry Area', icon: 'https://img.vld.com.cn/website/storefacilitys/PublicLaundryArea.png', category: 'community' },
  { name: '洗衣烘干室', nameEn: 'Laundry & Drying Room', icon: 'https://img.vld.com.cn/website/storefacilitys/PublicDryingRoom.png', category: 'community' },
  { name: '健身房', nameEn: 'Gym', icon: 'https://img.vld.com.cn/website/storefacilitys/Gym.png', category: 'community' },
  { name: '外卖柜', nameEn: 'Takeout Cabinet', icon: 'https://img.vld.com.cn/website/storefacilitys/TakeoutCabinet.png', category: 'community' },
  { name: '电梯', nameEn: 'Elevator', icon: 'https://img.vld.com.cn/website/storefacilitys/Lift.png', category: 'community' },
  { name: '早餐店', nameEn: 'Breakfast Shop', icon: 'https://img.vld.com.cn/website/storefacilitys/BreakfastShop.png', category: 'community' },
  { name: '篮球场', nameEn: 'Basketball Court', icon: 'https://img.vld.com.cn/website/storefacilitys/BasketballCourt.png', category: 'community' },
  { name: '自习室', nameEn: 'Study Room', icon: 'https://img.vld.com.cn/website/storefacilitys/SelfStudyRoom.png', category: 'community' },
  { name: '娱乐室', nameEn: 'Recreation Room', icon: 'https://img.vld.com.cn/website/storefacilitys/RecreationRoom.png', category: 'community' },
  { name: '影音室', nameEn: 'Media Room', icon: 'https://img.vld.com.cn/website/storefacilitys/VideoRoom.png', category: 'community' },
  { name: '停车场', nameEn: 'Parking Lot', icon: 'https://img.vld.com.cn/website/storefacilitys/ParkingLot.png', category: 'community' },
  { name: '台球室', nameEn: 'Billiards Room', icon: 'BilliardsIcon', category: 'community' },
  { name: '游戏厅', nameEn: 'Game Room', icon: 'GameRoomIcon', category: 'community' },
  { name: '便利店', nameEn: 'Convenience Store', icon: 'ConvenienceStoreIcon', category: 'community' },
  { name: '乒乓室', nameEn: 'Ping Pong Room', icon: 'PingPongRoomIcon', category: 'community' },
  { name: '小剧场', nameEn: 'Mini Theater', icon: 'MiniTheaterIcon', category: 'community' },
  { name: '录音室', nameEn: 'Recording Studio', icon: 'RecordingStudioIcon', category: 'community' },
  { name: '瑜伽室', nameEn: 'Yoga Room', icon: 'YogaRoomIcon', category: 'community' },
  { name: '菜鸟驿站', nameEn: 'Package Station', icon: 'PackageStationIcon', category: 'community' },
  { name: '全家Family', nameEn: 'Family', icon: 'https://img.vld.com.cn/website/storefacilitys/Family.png', category: 'community' }
]

// 我们的服务图标库
export const serviceIcons: IconConfig[] = [
  { name: '每日班车', nameEn: 'Daily Shuttle Bus', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/每日班车.png', category: 'service' },
  { name: '专属管家', nameEn: 'Exclusive Butler', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/专属管家.png', category: 'service' },
  { name: '公区保洁', nameEn: 'Public Area Cleaning', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/公区保洁.png', category: 'service' },
  { name: '扫地机器人', nameEn: 'Sweeping Robot', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/扫地机器人.png', category: 'service' },
  { name: '日常消毒', nameEn: 'Daily Disinfection', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/日常消毒.png', category: 'service' },
  { name: '24H安保', nameEn: '24H Security', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/24H安保.png', category: 'service' },
  { name: '专业维修', nameEn: 'Professional Maintenance', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/专业维修.png', category: 'service' },
  { name: '搬家协助', nameEn: 'Moving Assistance', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/搬家协助.png', category: 'service' },
  { name: '代收快递', nameEn: 'Courier Service', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/代收快递.png', category: 'service' },
  { name: '社区活动', nameEn: 'Community Activities', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/社区活动.png', category: 'service' },
  { name: '安全保障', nameEn: 'Security Assurance', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/安全保障.png', category: 'service' },
  { name: 'APP服务自助办理', nameEn: 'APP Self-Service', icon: 'https://vlinker-site.oss-cn-shanghai.aliyuncs.com/public/images/icons/APP服务自助办理.png', category: 'service' }
]

// 根据名称获取图标配置
export const getIconByName = (name: string, category: 'room' | 'community' | 'service'): IconConfig | undefined => {
  const iconMap = {
    room: roomAmenityIcons,
    community: communityAmenityIcons,
    service: serviceIcons
  }
  
  return iconMap[category].find(icon => icon.name === name || icon.nameEn === name)
}

// 根据名称列表获取图标配置
export const getIconsByNames = (names: string[], category: 'room' | 'community' | 'service'): IconConfig[] => {
  return names.map(name => getIconByName(name, category)).filter(Boolean) as IconConfig[]
}

// 获取所有图标
export const getAllIcons = (category: 'room' | 'community' | 'service'): IconConfig[] => {
  const iconMap = {
    room: roomAmenityIcons,
    community: communityAmenityIcons,
    service: serviceIcons
  }
  
  return iconMap[category]
}
