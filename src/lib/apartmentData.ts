/**
 * 公寓数据配置
 * 储存每个社区的价格、面积、户型信息
 */

import { Apartment } from './types'
import { getOSSImageUrl, getCommunityImageUrl } from './imageConfig'

// 户型类型定义
export type RoomType = 'studio' | 'one-bedroom' | 'two-bedroom' | 'shared'
export type LayoutType = '一室一厨一卫' | '一室一厅一卫' | '两室一厅一卫' | '单间公寓' | '合租房间'

// 户型图文件夹映射
export interface RoomTypeMapping {
  folderName: string
  displayName: string
  displayNameEn: string // 英文显示名称
  type: RoomType
  layout: LayoutType
  layoutEn: string // 英文户型
  areaRange: {
    min: number
    max: number
  }
  priceRange: {
    min: number
    max: number
  }
  currency: string
  priceRangeUSD: {
    min: number
    max: number
  }
}

// 社区描述信息接口
export interface CommunityDescription {
  name: string
  nameEn?: string
  district: string
  districtEn?: string
  status: 'operational' | 'construction' | 'planned'
  description: string
  descriptionEn?: string
  fullDescription: string
  fullDescriptionEn?: string
  image: string
  address?: string
  addressEn?: string
  rooms?: number
  year?: number
  awards?: string[]
  // 服务名称列表 - 用于动态显示图标
  serviceNames?: string[]
  // 房间配套名称列表 - 用于动态显示图标
  roomAmenityNames?: string[]
  // 社区配套名称列表 - 用于动态显示图标
  communityAmenityNames?: string[]
  amenities?: {
    title: string
    description: string
    image: string
  }[]
}

// 公寓配置接口
export interface ApartmentConfig {
  communityId: string
  communityName: string
  description: CommunityDescription
  roomTypes: RoomTypeMapping[]
}

// 各社区公寓配置数据
export const apartmentConfigs: ApartmentConfig[] = [
  {
    communityId: 'jingan-center',
    communityName: '新静安中心微领地青年社区',
    description: {
      name: '上海新静安中心社区',
      nameEn: 'JING\'AN CENTER COMMUNITY',
      district: '静安区',
      districtEn: 'Jing\'an District',
      status: 'operational',
      description: '地处上海最繁华的静安核心地带，从窗外便可俯瞰外滩景观。下楼即享地铁1号线与潮流商圈，以PUMP活力主题，定义都市青年主场。',
      descriptionEn: 'Located in the heart of Shanghai\'s most bustling Jing\'an district, offering panoramic views of the Bund from your window. Just steps away from Metro Line 1 and trendy shopping districts, with PUMP vitality theme defining the urban youth\'s main stage.',
      fullDescription: '紧邻大宁商业广场、上海久光中心、宝山万达广场、宝山日月光广场，休闲购物好去处。',
      fullDescriptionEn: 'Close to Daning Commercial Plaza, Shanghai Jiuguang Center, Baoshan Wanda Plaza, and Baoshan Rihui Plaza, providing excellent shopping and leisure options.',
      image: getCommunityImageUrl('jingan-center', '外立面/9561b58386b5f261a605fde44656ff0ce9311ed9.png'),
      address: '上海市静安区临汾路1000弄-1018弄',
      addressEn: '1000-1018 Linfen Road, Jing\'an District, Shanghai',
      rooms: 800,
      year: 2018,
      awards: ['Best Urban Living Community 2019', 'Green Building Certification', 'Excellence in Community Management Award'],
      // 服务名称列表 - 用于动态显示图标
      serviceNames: [
        '每日班车', '专属管家', '公区保洁', '扫地机器人', '日常消毒', '24H安保',
        '专业维修', '搬家协助', '代收快递', '社区活动', '安全保障', 'APP服务自助办理'
      ],
      // 社区配套名称列表 - 用于动态显示图标
      communityAmenityNames: [
        '运营中心', '共享厨房', '共享餐厅', '快递驿站', '公共晾衣区', '洗衣烘干室',
        '健身房', '外卖柜', '电梯', '早餐店', '篮球场', '自习室', '娱乐室', '影音室', '停车场'
      ],
      amenities: [
        {
          title: '共享厨房',
          description: '宽敞的共享厨房空间，方便居民烹饪',
          image: getOSSImageUrl('/images/communities/jingan-center/公区/共享厨房/20250226-DSC02841.jpg')
        },
        {
          title: '台球室',
          description: '专业的台球娱乐空间，丰富居民生活',
          image: getOSSImageUrl('/images/communities/jingan-center/公区/台球室/1.jpg')
        },
        {
          title: '影音厅',
          description: '高端的影音娱乐空间，享受视听盛宴',
          image: getOSSImageUrl('/images/communities/jingan-center/公区/影音厅/20250226-DSC02862.jpg')
        },
        {
          title: '游戏空间',
          description: '现代化的游戏娱乐区域，放松身心',
          image: getOSSImageUrl('/images/communities/jingan-center/公区/游戏空间/20250226-DSC02834.jpg')
        },
        {
          title: '社区中心',
          description: '温馨的社区会所，居民交流的好去处',
          image: getOSSImageUrl('/images/communities/jingan-center/公区/社区中心/社区会所1.jpg')
        },
        {
          title: '自习室',
          description: '安静的学习空间，提供良好的学习环境',
          image: getOSSImageUrl('/images/communities/jingan-center/公区/自习室/2 (2).jpg')
        }
      ]
    },
    roomTypes: [
      {
        folderName: '270度全景阳台房',
        displayName: '270度全景阳台房',
        displayNameEn: '270° Panoramic Balcony',
        type: 'studio',
        layout: '一室一厨一卫',
        layoutEn: '1BR Kitchen Bath',
        areaRange: { min: 30, max: 35 },
        priceRange: { min: 4000, max: 4500 },
        currency: 'CNY',
        priceRangeUSD: { min: 550, max: 620 }
      },
      {
        folderName: '意式暖咖雅居',
        displayName: '意式暖咖雅居',
        displayNameEn: 'Italian Style Studio',
        type: 'studio',
        layout: '一室一厨一卫',
        layoutEn: '1BR Kitchen Bath',
        areaRange: { min: 25, max: 42 },
        priceRange: { min: 3500, max: 4200 },
        currency: 'CNY',
        priceRangeUSD: { min: 480, max: 580 }
      },
      {
        folderName: '法式田园逸居',
        displayName: '法式田园逸居',
        displayNameEn: 'French Country Studio',
        type: 'studio',
        layout: '一室一厨一卫',
        layoutEn: '1BR Kitchen Bath',
        areaRange: { min: 25, max: 42 },
        priceRange: { min: 3500, max: 4200 },
        currency: 'CNY',
        priceRangeUSD: { min: 480, max: 580 }
      },
      {
        folderName: '都市型男一居室',
        displayName: '都市型男一居室',
        displayNameEn: 'Urban Style Studio',
        type: 'studio',
        layout: '一室一厨一卫',
        layoutEn: '1BR Kitchen Bath',
        areaRange: { min: 25, max: 42 },
        priceRange: { min: 3500, max: 4200 },
        currency: 'CNY',
        priceRangeUSD: { min: 480, max: 580 }
      }
    ]
  },
  {
    communityId: 'north-hongqiao',
    communityName: '北虹桥国际微领地青年社区',
    description: {
      name: '北虹桥国际微领地青年社区',
      nameEn: 'NORTH HONGQIAO INTERNATIONAL COMMUNITY',
      district: '嘉定区',
      districtEn: 'Jiading District',
      status: 'operational',
      description: '社区位于华东师范大学、东华大学附近。公区布置为switch游戏主题，包含游戏厅、台球、飞镖等多种娱乐设施，将人文气息和活力社区相结合。出门假装文艺青年，回家秒变快乐宅！',
      descriptionEn: 'Located near East China Normal University and Donghua University. The public areas feature a Switch gaming theme with game rooms, billiards, darts and various entertainment facilities, combining cultural atmosphere with vibrant community life. Go out as a cultured youth, come home and instantly become a happy gamer!',
      fullDescription: '北虹桥国际微领地青年社区位于华东师范大学、东华大学附近，地理位置优越，学术氛围浓厚。社区公区采用switch游戏主题设计，配备游戏厅、台球室、飞镖等多种娱乐设施，为年轻居民提供丰富的休闲娱乐选择。这里将人文气息和活力社区完美结合，让您在学术氛围中享受现代生活的乐趣。',
      fullDescriptionEn: 'North Hongqiao International Community is located near East China Normal University and Donghua University, with excellent location and strong academic atmosphere. The community\'s public areas feature a Switch gaming theme design with game rooms, billiards, darts and various entertainment facilities, providing young residents with rich leisure and entertainment options. Here, cultural atmosphere and vibrant community life are perfectly combined, allowing you to enjoy the pleasures of modern life in an academic environment.',
      image: getOSSImageUrl('/images/communities/north-hongqiao/外立面/NORTHHONGQIAOCOMMUNITY.webp'),
      address: '上海市嘉定区金园一路1280号',
      addressEn: 'No. 1280 Jinyuan 1st Road, Jiading District, Shanghai',
      rooms: 1200,
      year: 2020,
      awards: ['International Community Excellence Award', 'Green Building Design Award'],
      // 服务名称列表 - 用于动态显示图标
      serviceNames: [
        '专属管家', '公区保洁', '扫地机器人', '日常消毒', '24H安保',
        '专业维修', '搬家协助', '代收快递', '社区活动', '安全保障', 'APP服务自助办理'
      ],
      // 社区配套名称列表 - 用于动态显示图标
      communityAmenityNames: [
        '共享厨房', '台球室', '游戏厅', '社区中心', '自习室', '公共晾衣区', '外卖柜', '电梯'
      ],
      amenities: [
        {
          title: '共享厨房',
          description: '宽敞的共享厨房空间，方便居民烹饪',
          image: getOSSImageUrl('/images/communities/north-hongqiao/公区/共享厨房/公共配套4大.webp')
        },
        {
          title: '台球室',
          description: '专业的台球娱乐空间，丰富居民生活',
          image: getOSSImageUrl('/images/communities/north-hongqiao/公区/台球室/公共配套3大.webp')
        },
        {
          title: '游戏厅',
          description: '现代化的游戏娱乐区域，放松身心',
          image: getOSSImageUrl('/images/communities/north-hongqiao/公区/游戏厅/公共配套1大.webp')
        },
        {
          title: '社区中心',
          description: '温馨的社区会所，居民交流的好去处',
          image: getOSSImageUrl('/images/communities/north-hongqiao/公区/社区中心/公共配套2大.webp')
        }
      ]
    },
    roomTypes: [
      {
        folderName: '商务高奢平层',
        displayName: '商务高奢平层',
        displayNameEn: 'Business Luxury Flat',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 30, max: 35 },
        priceRange: { min: 3088, max: 3288 },
        currency: 'CNY',
        priceRangeUSD: { min: 425, max: 453 }
      },
      {
        folderName: '英式复古平层',
        displayName: '英式复古平层',
        displayNameEn: 'British Retro Flat',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 30, max: 35 },
        priceRange: { min: 3088, max: 3288 },
        currency: 'CNY',
        priceRangeUSD: { min: 425, max: 453 }
      },
      {
        folderName: '萌趣跃层复式',
        displayName: '萌趣跃层复式',
        displayNameEn: 'Cute Duplex',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 30, max: 35 },
        priceRange: { min: 3288, max: 3488 },
        currency: 'CNY',
        priceRangeUSD: { min: 453, max: 481 }
      },
      {
        folderName: '露台花园平层',
        displayName: '露台花园平层',
        displayNameEn: 'Terrace Garden Flat',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 35, max: 45 },
        priceRange: { min: 3488, max: 3688 },
        currency: 'CNY',
        priceRangeUSD: { min: 481, max: 508 }
      }
    ]
  },
  {
    communityId: 'pujiang-center',
    communityName: '浦江中心微领地青年社区',
    description: {
      name: 'PUJIANG CENTER COMMUNITY',
      nameEn: 'PUJIANG CENTER COMMUNITY',
      district: '闵行区',
      districtEn: 'Minhang District',
      status: 'operational',
      description: '刚来上海，从这里开始稳稳的幸福。低至1800元/月的房租即可入住，8号线直达人民广场等市区核心位置。低价安心，通勤省心，给职场升级一个安心的起点。',
      descriptionEn: 'Start your stable happiness in Shanghai here. Rent from just 1800 yuan/month, with direct access to downtown core areas like People\'s Square via Line 8. Affordable and secure, with convenient commuting for a confident career start.',
      fullDescription: '刚来上海，从这里开始稳稳的幸福。低至1800元/月的房租即可入住，8号线直达人民广场等市区核心位置。低价安心，通勤省心，给职场升级一个安心的起点。浦江中心微领地青年社区于2022年开业，VLINKER在2021年收购了一组闲置的工厂宿舍，将其改造成为上海最大的租赁社区之一。浦江中心社区由6栋租赁公寓楼组成，拥有3100+房间，为应届毕业生和年轻专业人士提供标准化、美观且功能齐全的公寓。公共区域包括共享厨房、自习室、游戏区、书店和篮球场，丰富了居民的日常生活。社区提供班车服务连接地铁站，让通勤更加便捷。浦江中心社区已纳入上海保障性租赁住房体系。',
      fullDescriptionEn: 'Start your stable happiness in Shanghai here. Rent from just 1800 yuan/month, with direct access to downtown core areas like People\'s Square via Line 8. Affordable and secure, with convenient commuting for a confident career start. Pujiang Center Community opened in 2022. VLINKER acquired a set of previously vacant factory dormitories in 2021 and transformed them into one of the largest rental communities in Shanghai. Pujiang Center Community consists of 6 rental apartment buildings with 3,100+ rooms, providing standardized, esthetically pleasing and highly functional studios for fresh graduates and young professionals. Common area, including shared kitchen, study room, game zone, bookstore, and basketball court, has enriched residents\' daily life. A shuttle bus to connect the community and the subway station for a more convenient commute. Pujiang Center Community has been incorporated into Shanghai\'s affordable rental housing system.',
      image: getOSSImageUrl('/images/communities/pujiang-center/外立面/外立面大.webp'),
      address: '上海市闵行区浦江镇康华路131号',
      addressEn: 'No. 131 Kanghua Road, Pujiang Town, Minhang District, Shanghai',
      rooms: 3100,
      year: 2022,
      awards: ['LEED v4.1 EBOM Pre-certification', 'First talent station in Minhang District', 'Largest affordable rental community in Shanghai'],
      // 服务名称列表 - 用于动态显示图标
      serviceNames: [
        '每日班车', '专属管家', '公区保洁', '扫地机器人', '日常消毒', '24H安保',
        '专业维修', '搬家协助', '代收快递', '社区活动', '安全保障', 'APP服务自助办理'
      ],
      // 社区配套名称列表 - 用于动态显示图标
      communityAmenityNames: [
        '便利店', '健身房', '共享厨房', '社区中心', '篮球场', '自习室', '公共晾衣区', '洗衣烘干室', '电梯', '外卖柜'
      ],
      amenities: [
        {
          title: '便利店',
          description: '便民便利店，满足日常生活需求',
          image: getOSSImageUrl('/images/communities/pujiang-center/公区/便利店/DSC01609-编辑大.webp')
        },
        {
          title: '健身房',
          description: '现代化健身设施，配备专业器材',
          image: getOSSImageUrl('/images/communities/pujiang-center/公区/健身房/631721023552_.pic.webp')
        },
        {
          title: '共享厨房',
          description: '宽敞的共享厨房空间，方便居民烹饪',
          image: getOSSImageUrl('/images/communities/pujiang-center/公区/共享厨房/13大.webp')
        },
        {
          title: '篮球场',
          description: '专业的篮球运动场地，强身健体',
          image: getOSSImageUrl('/images/communities/pujiang-center/公区/篮球场/DSC00529-编辑大.webp')
        }
      ]
    },
    roomTypes: [
      {
        folderName: '悦享阳光平层',
        displayName: '悦享阳光平层',
        displayNameEn: 'Sunny Enjoyment Flat',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 25, max: 28 },
        priceRange: { min: 2900, max: 3300 },
        currency: 'CNY',
        priceRangeUSD: { min: 400, max: 455 }
      },
      {
        folderName: '轻盈精致平层',
        displayName: '轻盈精致平层',
        displayNameEn: 'Light & Delicate Flat',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 20, max: 25 },
        priceRange: { min: 1700, max: 1900 },
        currency: 'CNY',
        priceRangeUSD: { min: 234, max: 262 }
      },
      {
        folderName: '灵动跃层复式',
        displayName: '灵动跃层复式',
        displayNameEn: 'Dynamic Duplex',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 20, max: 25 },
        priceRange: { min: 1900, max: 2100 },
        currency: 'CNY',
        priceRangeUSD: { min: 262, max: 290 }
      },
      {
        folderName: '雅致舒适平层',
        displayName: '雅致舒适平层',
        displayNameEn: 'Elegant Comfort Flat',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 20, max: 25 },
        priceRange: { min: 1900, max: 2100 },
        currency: 'CNY',
        priceRangeUSD: { min: 262, max: 290 }
      },
    ]
  },
  {
    communityId: 'pujiang-park',
    communityName: '浦江公园微领地青年社区',
    description: {
      name: '浦江公园微领地青年社区',
      nameEn: 'PUJIANG PARK COMMUNITY',
      district: '闵行区',
      districtEn: 'Minhang District',
      status: 'operational',
      description: '浦江公园旁的文艺青年聚集地！毗邻浦江公园，环境清幽，配备乒乓室、小剧场、录音室、瑜伽室等丰富设施，是追求品质生活的年轻人的理想选择。',
      descriptionEn: 'A gathering place for artistic youth next to Pujiang Park! Adjacent to Pujiang Park with a quiet environment, equipped with ping pong room, mini theater, recording studio, yoga room and other rich facilities, making it an ideal choice for young people pursuing quality life.',
      fullDescription: '浦江公园微领地青年社区坐落在闵行区浦江镇，紧邻浦江公园，享有得天独厚的自然环境优势。社区以"文艺生活"为主题，配备乒乓室、小剧场、录音室、活动室、瑜伽室等多元化设施，为追求艺术与生活品质的年轻人打造了一个充满活力的居住空间。社区设计融合现代与自然元素，让居民在都市快节奏中也能享受宁静与文艺的生活氛围。',
      fullDescriptionEn: 'Pujiang Park Community is located in Pujiang Town, Minhang District, adjacent to Pujiang Park with unique natural environment advantages. The community features an "artistic life" theme, equipped with ping pong room, mini theater, recording studio, activity room, yoga room and other diversified facilities, creating a vibrant living space for young people pursuing art and quality of life. The community design integrates modern and natural elements, allowing residents to enjoy a peaceful and artistic living atmosphere even in the fast-paced urban life.',
      image: getOSSImageUrl('/images/communities/pujiang-park/外立面/IMG_0887大.webp'),
      address: '上海市闵行区昌林路985弄',
      addressEn: 'No. 985 Changlin Road, Minhang District, Shanghai',
      rooms: 800,
      year: 2021,
      awards: ['Green Community Award', 'Environmental Design Excellence'],
      // 服务名称列表 - 用于动态显示图标
      serviceNames: [
        '每日班车', '专属管家', '公区保洁', '扫地机器人', '日常消毒', '24H安保',
        '专业维修', '搬家协助', '代收快递', '社区活动', '安全保障', 'APP服务自助办理'
      ],
      // 社区配套名称列表 - 用于动态显示图标
      communityAmenityNames: [
        '乒乓室', '共享厨房', '小剧场', '录音室', '娱乐室', '瑜伽室', '社区中心', '篮球场', '自习室', '公共晾衣区', '洗衣烘干室', '健身房', '电梯', '外卖柜'
      ],
      amenities: [
        {
          title: '乒乓室',
          description: '专业的乒乓球运动空间，配备标准球台，是运动爱好者的理想选择',
          image: getOSSImageUrl('/images/communities/pujiang-park/公区/乒乓室/IMG_0952.webp')
        },
        {
          title: '共享厨房',
          description: '宽敞明亮的共享厨房空间，配备现代化厨具，方便居民烹饪交流',
          image: getOSSImageUrl('/images/communities/pujiang-park/公区/共享厨房/IMG_0946.webp')
        },
        {
          title: '小剧场',
          description: '多功能小剧场，配备专业音响设备，定期举办文艺演出和社区活动',
          image: getOSSImageUrl('/images/communities/pujiang-park/公区/小剧场/IMG_0948.webp')
        },
        {
          title: '录音室',
          description: '专业的录音设施，支持音乐创作和录制，为文艺青年提供创作空间',
          image: getOSSImageUrl('/images/communities/pujiang-park/公区/录音室/IMG_0944.webp')
        },
        {
          title: '娱乐室',
          description: '多功能娱乐空间，可举办各类聚会和活动，丰富居民社交生活',
          image: getOSSImageUrl('/images/communities/pujiang-park/公区/活动室/IMG_0947.webp')
        },
        {
          title: '瑜伽室',
          description: '专业的瑜伽练习空间，配备瑜伽垫和镜子，修身养性的理想场所',
          image: getOSSImageUrl('/images/communities/pujiang-park/公区/瑜伽室/IMG_0954.webp')
        },
        {
          title: '社区中心',
          description: '温馨的社区会所，提供休闲娱乐空间，是居民交流的好去处',
          image: getOSSImageUrl('/images/communities/pujiang-park/公区/社区中心/公共配套2大.webp')
        },
        {
          title: '篮球场',
          description: '专业的篮球运动场地，配备完善设施，强身健体的理想选择',
          image: getOSSImageUrl('/images/communities/pujiang-park/公区/篮球场/MGL9179.webp')
        },
        {
          title: '自习室',
          description: '安静优雅的学习空间，提供良好的学习环境，适合工作和学习',
          image: getOSSImageUrl('/images/communities/pujiang-park/公区/自习室/IMG_0956.webp')
        }
      ]
    },
    roomTypes: [
      {
        folderName: '奶油布丁一居室',
        displayName: '奶油布丁一居室',
        displayNameEn: 'Cream Pudding Studio',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 20, max: 25 },
        priceRange: { min: 2400, max: 2700 },
        currency: 'CNY',
        priceRangeUSD: { min: 331, max: 372 }
      },
      {
        folderName: '梦幻少女一居室',
        displayName: '梦幻少女一居室',
        displayNameEn: 'Dreamy Girl Studio',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 15, max: 20 },
        priceRange: { min: 2400, max: 2700 },
        currency: 'CNY',
        priceRangeUSD: { min: 331, max: 372 }
      },
      {
        folderName: '至尊大平层',
        displayName: '至尊大平层',
        displayNameEn: 'Supreme Large Flat',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 30, max: 34 },
        priceRange: { min: 3300, max: 3500 },
        currency: 'CNY',
        priceRangeUSD: { min: 455, max: 483 }
      },
      {
        folderName: '花园野趣复式',
        displayName: '花园野趣复式',
        displayNameEn: 'Garden Fun Duplex',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 25, max: 30 },
        priceRange: { min: 2600, max: 2800 },
        currency: 'CNY',
        priceRangeUSD: { min: 359, max: 386 }
      }
    ]
  },
  {
    communityId: 'zhonghuan-hutai',
    communityName: '中环沪太路微领地青年社区',
    description: {
      name: '中环沪太路微领地青年社区',
      nameEn: 'HUTAI ROAD COMMUNITY',
      district: '静安区',
      districtEn: 'Jing\'an District',
      status: 'operational',
      description: '微领地首个大型租赁社区，2014年开业至今，见证无数年轻人的成长故事。位于静安区中环核心位置，5栋公寓楼1700+房间，为白领和年轻专业人士提供温馨的家。',
      descriptionEn: 'Our first large-scale rental community, opened in 2014, witnessing countless growth stories of young people. Located in the core area of Jing\'an District\'s middle ring, with 5 apartment buildings and 1,700+ rooms, providing a warm home for white-collar workers and young professionals.',
      fullDescription: '中环沪太路微领地青年社区是中国租赁住房发展史上的里程碑项目。2014年开业，是VLINKER在上海运营的第一个租赁社区，也是中国第一个大型租赁社区。社区由5栋租赁公寓楼组成，共1700+间房间，专门面向白领群体和年轻专业人士。除了提供全装修公寓和全套设施外，VLINKER还经常为居民组织线上线下社交活动，创造强烈的归属感。社区已纳入上海市保障性租赁住房体系，是租赁住房行业的标杆项目。',
      fullDescriptionEn: 'Hutai Road Community is a milestone project in the development history of China\'s rental housing. Opened in 2014, it is VLINKER\'s first rental community operated in Shanghai and China\'s first large-scale rental community. The community consists of 5 rental apartment buildings with 1,700+ rooms, specifically targeting white-collar groups and young professionals. Apart from offering fully furnished apartments with a full suite of amenities, VLINKER also organizes frequent online and offline social activities for residents to create a strong sense of belonging. The community has been incorporated into Shanghai\'s affordable rental housing system and is a benchmark project in the rental housing industry.',
      image: getCommunityImageUrl('zhonghuan-hutai', '外立面/外立面05大.webp'),
      address: '上海市静安区沪太路1000号',
      addressEn: '1000 Hutai Road, Jing\'an District, Shanghai',
      rooms: 1700,
      year: 2014,
      awards: ['First Large-scale Rental Community in China', 'Shanghai Affordable Rental Housing System'],
      // 服务名称列表 - 用于动态显示图标
      serviceNames: [
        '专属管家', '公区保洁', '扫地机器人', '日常消毒', '24H安保',
        '专业维修', '搬家协助', '代收快递', '社区活动', '安全保障', 'APP服务自助办理'
      ],
      // 社区配套名称列表 - 用于动态显示图标
      communityAmenityNames: [
        '共享厨房', '社区中心', '篮球场', '自习室', '菜鸟驿站', '公共晾衣区', '洗衣烘干室', '健身房', '电梯', '外卖柜'
      ],
      amenities: [
        {
          title: '共享厨房',
          description: '宽敞明亮的共享厨房空间，配备现代化厨具，方便居民烹饪交流',
          image: getCommunityImageUrl('zhonghuan-hutai', '公区/共享厨房/IMG_8404大.webp')
        },
        {
          title: '社区中心',
          description: '温馨舒适的社区会所，定期举办各类活动，是居民交流的好去处',
          image: getCommunityImageUrl('zhonghuan-hutai', '公区/社区中心/IMG_8377大.webp')
        },
        {
          title: '篮球场',
          description: '专业的篮球运动场地，配备完善设施，强身健体的理想选择',
          image: getCommunityImageUrl('zhonghuan-hutai', '公区/篮球场/WechatIMG43465大.webp')
        },
        {
          title: '自习室',
          description: '安静优雅的学习空间，提供良好的学习环境，适合工作和学习',
          image: getCommunityImageUrl('zhonghuan-hutai', '公区/自习室/IMG_8391大.webp')
        },
        {
          title: '菜鸟驿站',
          description: '便捷的快递收发服务，24小时自助取件，让生活更加便利',
          image: getCommunityImageUrl('zhonghuan-hutai', '公区/菜鸟驿站/IMG_8384大.webp')
        }
      ]
    },
    roomTypes: [
      {
        folderName: '温馨奶油平层',
        displayName: '温馨奶油平层',
        displayNameEn: 'Warm Cream Flat',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 17, max: 25 },
        priceRange: { min: 2500, max: 2900 },
        currency: 'CNY',
        priceRangeUSD: { min: 345, max: 400 }
      },
      {
        folderName: '海盐蓝调平层',
        displayName: '海盐蓝调平层',
        displayNameEn: 'Sea Salt Blue Flat',
        type: 'studio',
        layout: '单间公寓',
        layoutEn: 'Studio Apartment',
        areaRange: { min: 17, max: 25 },
        priceRange: { min: 2500, max: 2900 },
        currency: 'CNY',
        priceRangeUSD: { min: 345, max: 400 }
      }
    ]
  }
]

// 根据社区ID获取公寓配置
export const getApartmentConfigByCommunityId = (communityId: string): ApartmentConfig | undefined => {
  return apartmentConfigs.find(config => config.communityId === communityId)
}

// 根据社区ID获取社区描述信息
export const getCommunityDescriptionByCommunityId = (communityId: string): CommunityDescription | undefined => {
  const config = getApartmentConfigByCommunityId(communityId)
  return config?.description
}

// 获取所有社区描述信息
export const getAllCommunityDescriptions = (): CommunityDescription[] => {
  return apartmentConfigs.map(config => config.description)
}

// 测试OSS路径构建
export const testOSSPath = (communityId: string) => {
  const testPath = `images/communities/${communityId}/公区/共享厨房/20250226-DSC02841.jpg`
  const ossUrl = getOSSImageUrl(testPath)
  return ossUrl
}

// 自动生成公区设施卡片数据 - 基于实际存在的公区文件夹
export const generateCommunityAmenities = (communityId: string, count: number = 6) => {
  const communityConfig = getApartmentConfigByCommunityId(communityId)
  if (!communityConfig) return []

  // 根据社区ID定义实际存在的公区设施 - 使用实际文件夹结构，支持中英文双语
  const communityAmenities: Record<string, Array<{title: string, titleEn: string, description: string, folderName: string, imageName: string}>> = {
    'jingan-center': [
      { title: '共享厨房', titleEn: 'Shared Kitchen', description: '宽敞的共享厨房空间，方便居民烹饪', folderName: '共享厨房', imageName: '配套空间 (4).webp' },
      { title: '台球室', titleEn: 'Billiards Room', description: '专业的台球娱乐空间，丰富居民生活', folderName: '台球室', imageName: '1.webp' },
      { title: '影音厅', titleEn: 'Media Room', description: '高端的影音娱乐空间，享受视听盛宴', folderName: '影音厅', imageName: '20250226-DSC02862.webp' },
      { title: '游戏空间', titleEn: 'Game Space', description: '现代化的游戏娱乐区域，放松身心', folderName: '游戏空间', imageName: '20250226-DSC02834.webp' },
      { title: '社区中心', titleEn: 'Community Center', description: '温馨的社区会所，居民交流的好去处', folderName: '社区中心', imageName: '社区会所1.webp' },
      { title: '自习室', titleEn: 'Study Room', description: '安静的学习空间，提供良好的学习环境', folderName: '自习室', imageName: '2 (2).webp' }
    ],
    'north-hongqiao': [
      { title: '共享厨房', titleEn: 'Shared Kitchen', description: '宽敞的共享厨房空间，方便居民烹饪', folderName: '共享厨房', imageName: '公共配套4大.webp' },
      { title: '台球室', titleEn: 'Billiards Room', description: '专业的台球娱乐空间，丰富居民生活', folderName: '台球室', imageName: '公共配套3大.webp' },
      { title: '游戏厅', titleEn: 'Game Room', description: '现代化的游戏娱乐区域，放松身心', folderName: '游戏厅', imageName: '公共配套1大.webp' },
      { title: '社区中心', titleEn: 'Community Center', description: '温馨的社区会所，居民交流的好去处', folderName: '社区中心', imageName: '公共配套2大.webp' },
      { title: '自习室', titleEn: 'Study Room', description: '安静的学习空间，提供良好的学习环境', folderName: '自习室', imageName: '公共配套5大.webp' }
    ],
    'pujiang-center': [
      { title: '便利店', titleEn: 'Convenience Store', description: '便民便利店，满足日常生活需求', folderName: '便利店', imageName: 'DSC01609-编辑大.webp' },
      { title: '健身房', titleEn: 'Gym', description: '现代化健身设施，配备专业器材', folderName: '健身房', imageName: '631721023552_.pic.webp' },
      { title: '共享厨房', titleEn: 'Shared Kitchen', description: '宽敞的共享厨房空间，方便居民烹饪', folderName: '共享厨房', imageName: '13大.webp' },
      { title: '社区中心', titleEn: 'Community Center', description: '温馨的社区会所，居民交流的好去处', folderName: '社区中心', imageName: 'DSC01591-HDR-编辑大.webp' },
      { title: '篮球场', titleEn: 'Basketball Court', description: '专业的篮球运动场地，强身健体', folderName: '篮球场', imageName: 'DSC00529-编辑大.webp' },
      { title: '自习室', titleEn: 'Study Room', description: '安静的学习空间，提供良好的学习环境', folderName: '自习室', imageName: '12大.webp' }
    ],
    'pujiang-park': [
      { title: '乒乓室', titleEn: 'Ping Pong Room', description: '专业的乒乓球运动空间，锻炼身体', folderName: '乒乓室', imageName: 'IMG_0952.webp' },
      { title: '共享厨房', titleEn: 'Shared Kitchen', description: '宽敞的共享厨房空间，方便居民烹饪', folderName: '共享厨房', imageName: 'IMG_0946.webp' },
      { title: '小剧场', titleEn: 'Mini Theater', description: '多功能小剧场，举办各种文化活动', folderName: '小剧场', imageName: 'IMG_0948.webp' },
      { title: '录音室', titleEn: 'Recording Studio', description: '专业的录音设施，支持音乐创作', folderName: '录音室', imageName: 'IMG_0944.webp' },
      { title: '娱乐室', titleEn: 'Recreation Room', description: '多功能娱乐空间，丰富居民生活', folderName: '活动室', imageName: 'IMG_0947.webp' },
      { title: '瑜伽室', titleEn: 'Yoga Room', description: '专业的瑜伽练习空间，修身养性', folderName: '瑜伽室', imageName: 'IMG_0954.webp' }
    ],
    'zhonghuan-hutai': [
      { title: '共享厨房', titleEn: 'Shared Kitchen', description: '宽敞的共享厨房空间，方便居民烹饪', folderName: '共享厨房', imageName: 'IMG_8404大.webp' },
      { title: '社区中心', titleEn: 'Community Center', description: '温馨的社区会所，居民交流的好去处', folderName: '社区中心', imageName: 'IMG_8376大.webp' },
      { title: '篮球场', titleEn: 'Basketball Court', description: '专业的篮球运动场地，强身健体', folderName: '篮球场', imageName: 'WechatIMG43465大.webp' },
      { title: '自习室', titleEn: 'Study Room', description: '安静的学习空间，提供良好的学习环境', folderName: '自习室', imageName: 'IMG_8391大.webp' },
      { title: '菜鸟驿站', titleEn: 'Package Station', description: '便民快递服务，方便居民收发包裹', folderName: '菜鸟驿站', imageName: '3ada58efd7a1a7f31d425300dae98105大.webp' }
    ]
  }

  // 获取该社区的公区设施列表
  const amenities = communityAmenities[communityId] || []
  
  // 选择指定数量的设施（如果数量不足，则返回所有可用的）
  const selectedAmenities = amenities
    .slice(0, Math.min(count, amenities.length))
    .map((amenity) => {
      // 使用实际文件夹结构的OSS路径
      const imagePath = `images/communities/${communityId}/公区/${amenity.folderName}/${amenity.imageName}`
      const imageUrl = getOSSImageUrl(imagePath)
      return {
        title: amenity.title,
        titleEn: amenity.titleEn,
        description: amenity.description,
        image: imageUrl,
        folderName: amenity.folderName
      }
    })

  return selectedAmenities
}

// 根据社区ID获取所有房型
export const getRoomTypesByCommunityId = (communityId: string) => {
  const config = getApartmentConfigByCommunityId(communityId)
  return config?.roomTypes || []
}

// 根据社区ID和房型获取具体配置
export const getRoomTypeConfig = (communityId: string, roomType: RoomType) => {
  const config = getApartmentConfigByCommunityId(communityId)
  return config?.roomTypes.find(room => room.type === roomType)
}

// 根据社区ID和文件夹名称获取具体配置
export const getRoomConfigByFolderName = (communityId: string, folderName: string) => {
  const config = getApartmentConfigByCommunityId(communityId)
  return config?.roomTypes.find(room => room.folderName === folderName)
}

// 根据社区ID获取所有户型图文件夹名称
export const getFolderNamesByCommunityId = (communityId: string): string[] => {
  const config = getApartmentConfigByCommunityId(communityId)
  return config?.roomTypes.map(room => room.folderName) || []
}

// 获取所有社区列表
export const getAllCommunities = () => {
  return apartmentConfigs.map(config => ({
    id: config.communityId,
    name: config.communityName,
    roomTypesCount: config.roomTypes.length
  }))
}

// 获取价格范围统计
export const getPriceRangeStats = () => {
  const allPrices = apartmentConfigs.flatMap(config => 
    config.roomTypes.flatMap(room => [room.priceRange.min, room.priceRange.max])
  )
  
  return {
    min: Math.min(...allPrices),
    max: Math.max(...allPrices),
    average: allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length
  }
}

// 获取面积范围统计
export const getAreaRangeStats = () => {
  const allAreas = apartmentConfigs.flatMap(config => 
    config.roomTypes.flatMap(room => [room.areaRange.min, room.areaRange.max])
  )
  
  return {
    min: Math.min(...allAreas),
    max: Math.max(...allAreas),
    average: allAreas.reduce((sum, area) => sum + area, 0) / allAreas.length
  }
}

// 格式化价格显示
export const formatPriceRange = (min: number, max: number, currency = 'CNY') => {
  if (currency === 'CNY') {
    return `¥${min.toLocaleString()}-${max.toLocaleString()}/月`
  } else if (currency === 'USD') {
    return `$${min.toLocaleString()}-${max.toLocaleString()}/月`
  }
  return `${currency} ${min.toLocaleString()}-${max.toLocaleString()}/月`
}

// 格式化美元价格显示
export const formatPriceRangeUSD = (min: number, max: number) => {
  return `$${min.toLocaleString()}-${max.toLocaleString()}/月`
}

// 格式化面积显示
export const formatAreaRange = (min: number, max: number) => {
  return `${min}-${max}㎡`
}

// 导出默认配置
export default apartmentConfigs
