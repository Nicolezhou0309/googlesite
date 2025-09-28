/**
 * 全局类型定义
 * 统一管理所有类型定义，避免重复和类型不一致
 */

// 基础类型
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// 图片相关类型
export interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  thumbnail?: string;
  folder?: string;
}

export interface ImageConfig {
  objectPosition?: {
    x: number;
    y: number;
  };
  scale?: number;
  rotation?: number;
}

// 社区相关类型
export interface Community {
  id: string;
  name: string;
  displayName: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  images: ImageData[];
  facilities: string[];
  amenities: string[];
}

export interface CommunityLocation {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  description: string;
}

// 文件夹相关类型
export interface Folder {
  name: string;
  displayName: string;
  count: number;
  path: string;
  subfolders?: SubFolder[];
}

export interface SubFolder {
  name: string;
  displayName: string;
  count: number;
  path: string;
}

// 餐厅相关类型
export interface Restaurant {
  id: string;
  name: string;
  displayName: string;
  cuisine: string;
  description: string;
  location: string;
  facadeImage: string;
  dishes: string[];
  mustTryDishes: string[];
}

// 活动相关类型
export interface Event {
  id: string;
  name: string;
  displayName: string;
  description: string;
  images: string[];
  type: 'social' | 'cultural' | 'sports' | 'educational';
}

// 服务相关类型
export interface Service {
  id: string;
  title: string;
  icon: string;
  description?: string;
  category: 'translation' | 'registration' | 'travel' | 'maintenance' | 'other';
}

// 用户评价类型
export interface Testimonial {
  id: string;
  name: string;
  university: string;
  content: string;
  avatar: string;
  rating: number;
  date: string;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// 组件Props类型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

// 语言相关类型
export type SupportedLanguage = 'en' | 'zh';
export type LanguageContent = Record<SupportedLanguage, string>;

// 主题相关类型
export type Theme = 'light' | 'dark';
export type ColorScheme = 'primary' | 'secondary' | 'accent' | 'neutral';

// 缓存相关类型
export interface CacheConfig {
  maxAge: number;
  immutable?: boolean;
  staleWhileRevalidate?: number;
}

// 错误类型
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// 表单相关类型
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// 房型相关类型
export interface Apartment {
  id: string;
  name: string;
  displayName: string;
  displayNameEn?: string; // 英文显示名称
  description: string;
  area: number; // 面积（平方米）- 最小面积用于排序
  areaRange?: { min: number; max: number }; // 面积区间
  price: number; // 价格（元/月）- 最低价格用于排序
  priceRange?: { min: number; max: number }; // 价格区间
  currency?: string; // 货币单位，默认为 'CNY'
  images: ApartmentImage[];
  features: string[]; // 房型特色
  facilities: string[]; // 设施
  availability: 'available' | 'occupied' | 'maintenance';
  communityId: string; // 所属社区ID
  floor?: number; // 楼层
  orientation?: string; // 朝向
  layout?: string; // 户型
  layoutEn?: string; // 英文户型
  createdAt?: string;
  updatedAt?: string;
}

export interface ApartmentImage {
  id: string;
  src: string;
  alt: string;
  thumbnail?: string;
  width: number;
  height: number;
  isMain?: boolean; // 是否为主图
  order?: number; // 排序
}

export interface ApartmentCardProps extends BaseComponentProps {
  apartment: Apartment;
  onImageClick?: (image: ApartmentImage, index: number, folder?: string) => void;
  onCardClick?: (apartment: Apartment) => void;
  showPrice?: boolean;
  showArea?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  imageLayout?: 'one-drag-two' | 'grid' | 'carousel';
}

// 导出所有类型
export * from './api';
export * from './components';
