// 社区文件夹结构静态配置
export interface FolderStructure {
  name: string
  displayName: string
  count: number
  path: string
  subfolders?: FolderStructure[]
}

export interface CommunityConfig {
  id: string
  name: string
  displayName: string
  folders: FolderStructure[]
}

// 社区配置数据
export const communityConfigs: CommunityConfig[] = [
  {
    id: 'jingan-center',
    name: 'jingan-center',
    displayName: '新静安中心微领地青年社区',
    folders: [
      {
        name: '公区',
        displayName: 'Public Areas',
        count: 12,
        path: '公区',
        subfolders: [
          {
            name: '共享厨房',
            displayName: 'Shared Kitchen',
            count: 2,
            path: '公区/共享厨房'
          },
          {
            name: '台球室',
            displayName: 'Billiards Room',
            count: 2,
            path: '公区/台球室'
          },
          {
            name: '影音厅',
            displayName: 'Media Room',
            count: 4,
            path: '公区/影音厅'
          },
          {
            name: '游戏空间',
            displayName: 'Game Space',
            count: 1,
            path: '公区/游戏空间'
          },
          {
            name: '社区中心',
            displayName: 'Community Center',
            count: 3,
            path: '公区/社区中心'
          },
          {
            name: '自习室',
            displayName: 'Study Room',
            count: 2,
            path: '公区/自习室'
          }
        ]
      },
      {
        name: '外立面',
        displayName: 'Facade',
        count: 2,
        path: '外立面'
      },
      {
        name: '户型图',
        displayName: 'Apartment Layouts',
        count: 34,
        path: '户型图',
        subfolders: [
          {
            name: '270度全景阳台房',
            displayName: '270° Panoramic Balcony',
            count: 8,
            path: '户型图/270度全景阳台房'
          },
          {
            name: '意式暖咖雅居',
            displayName: 'Italian Style',
            count: 8,
            path: '户型图/意式暖咖雅居'
          },
          {
            name: '法式田园逸居',
            displayName: 'French Country',
            count: 10,
            path: '户型图/法式田园逸居'
          },
          {
            name: '都市型男一居室',
            displayName: 'Urban Studio',
            count: 8,
            path: '户型图/都市型男一居室'
          }
        ]
      }
    ]
  },
  {
    id: 'north-hongqiao',
    name: 'north-hongqiao',
    displayName: '北虹桥国际微领地青年社区',
    folders: [
      {
        name: '公区',
        displayName: 'Public Areas',
        count: 5,
        path: '公区',
        subfolders: [
          {
            name: '共享厨房',
            displayName: 'Shared Kitchen',
            count: 1,
            path: '公区/共享厨房'
          },
          {
            name: '台球室',
            displayName: 'Billiards Room',
            count: 1,
            path: '公区/台球室'
          },
          {
            name: '游戏厅',
            displayName: 'Game Room',
            count: 1,
            path: '公区/游戏厅'
          },
          {
            name: '社区中心',
            displayName: 'Community Center',
            count: 1,
            path: '公区/社区中心'
          },
          {
            name: '自习室',
            displayName: 'Study Room',
            count: 1,
            path: '公区/自习室'
          }
        ]
      },
      {
        name: '外立面',
        displayName: 'Facade',
        count: 3,
        path: '外立面'
      },
      {
        name: '户型图',
        displayName: 'Apartment Layouts',
        count: 37,
        path: '户型图',
        subfolders: [
          {
            name: '商务高奢平层',
            displayName: 'Business Luxury Flat',
            count: 11,
            path: '户型图/商务高奢平层'
          },
          {
            name: '英式复古平层',
            displayName: 'British Retro Flat',
            count: 8,
            path: '户型图/英式复古平层'
          },
          {
            name: '萌趣跃层复式',
            displayName: 'Cute Duplex',
            count: 11,
            path: '户型图/萌趣跃层复式'
          },
          {
            name: '露台花园平层',
            displayName: 'Terrace Garden Flat',
            count: 7,
            path: '户型图/露台花园平层'
          }
        ]
      }
    ]
  },
  {
    id: 'pujiang-center',
    name: 'pujiang-center',
    displayName: '浦江中心微领地青年社区',
    folders: [
      {
        name: '公区',
        displayName: 'Public Areas',
        count: 8,
        path: '公区',
        subfolders: [
          {
            name: '便利店',
            displayName: 'Convenience Store',
            count: 1,
            path: '公区/便利店'
          },
          {
            name: '健身房',
            displayName: 'Gym',
            count: 2,
            path: '公区/健身房'
          },
          {
            name: '免费班车',
            displayName: 'Free Shuttle',
            count: 1,
            path: '公区/免费班车'
          },
          {
            name: '共享厨房',
            displayName: 'Shared Kitchen',
            count: 2,
            path: '公区/共享厨房'
          },
          {
            name: '社区中心',
            displayName: 'Community Center',
            count: 1,
            path: '公区/社区中心'
          },
          {
            name: '篮球场',
            displayName: 'Basketball Court',
            count: 3,
            path: '公区/篮球场'
          },
          {
            name: '自习室',
            displayName: 'Study Room',
            count: 1,
            path: '公区/自习室'
          }
        ]
      },
      {
        name: '外立面',
        displayName: 'Facade',
        count: 2,
        path: '外立面'
      },
      {
        name: '户型图',
        displayName: 'Apartment Layouts',
        count: 30,
        path: '户型图',
        subfolders: [
          {
            name: '悦享阳光平层',
            displayName: 'Sunny Enjoyment Flat',
            count: 11,
            path: '户型图/悦享阳光平层'
          },
          {
            name: '灵动跃层复式',
            displayName: 'Dynamic Duplex',
            count: 7,
            path: '户型图/灵动跃层复式'
          },
          {
            name: '轻盈精致平层',
            displayName: 'Light & Delicate Flat',
            count: 5,
            path: '户型图/轻盈精致平层'
          },
          {
            name: '雅致舒适平层',
            displayName: 'Elegant Comfort Flat',
            count: 7,
            path: '户型图/雅致舒适平层'
          }
        ]
      }
    ]
  },
  {
    id: 'pujiang-park',
    name: 'pujiang-park',
    displayName: '浦江公园微领地青年社区',
    folders: [
      {
        name: '公区',
        displayName: 'Public Areas',
        count: 15,
        path: '公区',
        subfolders: [
          {
            name: '乒乓室',
            displayName: 'Ping Pong Room',
            count: 1,
            path: '公区/乒乓室'
          },
          {
            name: '共享厨房',
            displayName: 'Shared Kitchen',
            count: 3,
            path: '公区/共享厨房'
          },
          {
            name: '小剧场',
            displayName: 'Small Theater',
            count: 1,
            path: '公区/小剧场'
          },
          {
            name: '录音室',
            displayName: 'Recording Studio',
            count: 2,
            path: '公区/录音室'
          },
          {
            name: '活动室',
            displayName: 'Activity Room',
            count: 3,
            path: '公区/活动室'
          },
          {
            name: '瑜伽室',
            displayName: 'Yoga Room',
            count: 1,
            path: '公区/瑜伽室'
          },
          {
            name: '社区中心',
            displayName: 'Community Center',
            count: 3,
            path: '公区/社区中心'
          },
          {
            name: '篮球场',
            displayName: 'Basketball Court',
            count: 1,
            path: '公区/篮球场'
          },
          {
            name: '自习室',
            displayName: 'Study Room',
            count: 3,
            path: '公区/自习室'
          }
        ]
      },
      {
        name: '外立面',
        displayName: 'Facade',
        count: 7,
        path: '外立面'
      },
      {
        name: '户型图',
        displayName: 'Apartment Layouts',
        count: 31,
        path: '户型图',
        subfolders: [
          {
            name: '奶油布丁一居室',
            displayName: 'Cream Pudding Studio',
            count: 8,
            path: '户型图/奶油布丁一居室'
          },
          {
            name: '梦幻少女一居室',
            displayName: 'Dreamy Girl Studio',
            count: 8,
            path: '户型图/梦幻少女一居室'
          },
          {
            name: '至尊大平层',
            displayName: 'Supreme Large Flat',
            count: 8,
            path: '户型图/至尊大平层'
          },
          {
            name: '花园野趣复式',
            displayName: 'Garden Fun Duplex',
            count: 7,
            path: '户型图/花园野趣复式'
          }
        ]
      }
    ]
  },
  {
    id: 'hutai-road',
    name: 'hutai-road',
    displayName: '中环沪太路微领地青年社区',
    folders: [
      {
        name: '公区',
        displayName: 'Public Areas',
        count: 8,
        path: '公区',
        subfolders: [
          {
            name: '共享厨房',
            displayName: 'Shared Kitchen',
            count: 3,
            path: '公区/共享厨房'
          },
          {
            name: '社区中心',
            displayName: 'Community Center',
            count: 2,
            path: '公区/社区中心'
          },
          {
            name: '篮球场',
            displayName: 'Basketball Court',
            count: 1,
            path: '公区/篮球场'
          },
          {
            name: '自习室',
            displayName: 'Study Room',
            count: 2,
            path: '公区/自习室'
          },
          {
            name: '菜鸟驿站',
            displayName: 'Cainiao Station',
            count: 2,
            path: '公区/菜鸟驿站'
          }
        ]
      },
      {
        name: '外立面',
        displayName: 'Facade',
        count: 1,
        path: '外立面'
      },
      {
        name: '户型图',
        displayName: 'Apartment Layouts',
        count: 20,
        path: '户型图',
        subfolders: [
          {
            name: '温馨奶油平层',
            displayName: 'Warm Cream Flat',
            count: 5,
            path: '户型图/温馨奶油平层'
          },
          {
            name: '海盐蓝调平层',
            displayName: 'Sea Salt Blue Flat',
            count: 5,
            path: '户型图/海盐蓝调平层'
          },
          {
            name: '缤纷悦动平层',
            displayName: 'Colorful Dynamic Flat',
            count: 5,
            path: '户型图/缤纷悦动平层'
          },
          {
            name: '绿野闲适平层',
            displayName: 'Green Field Leisure Flat',
            count: 5,
            path: '户型图/绿野闲适平层'
          }
        ]
      }
    ]
  }
]

// 根据社区ID获取文件夹结构
export function getCommunityFolderStructure(communityId: string): FolderStructure[] {
  const community = communityConfigs.find(config => config.id === communityId)
  return community ? community.folders : []
}

// 获取所有社区配置
export function getAllCommunityConfigs(): CommunityConfig[] {
  return communityConfigs
}

// 根据社区ID获取社区配置
export function getCommunityConfig(communityId: string): CommunityConfig | null {
  return communityConfigs.find(config => config.id === communityId) || null
}

// 获取社区显示名称
export function getCommunityDisplayName(communityId: string): string {
  const community = communityConfigs.find(config => config.id === communityId)
  return community ? community.displayName : communityId
}
