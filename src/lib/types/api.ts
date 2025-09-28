/**
 * API相关类型定义
 */

import { ApiResponse, PaginatedResponse } from './index';

// 请求方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 请求配置类型
export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  cache?: RequestCache;
}

// API端点类型
export interface ApiEndpoint {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  timeout?: number;
}

// 图片API类型
export interface ImageApiResponse extends ApiResponse<ImageData[]> {}

export interface ImageApiRequest {
  communityId: string;
  page?: number;
  limit?: number;
  folder?: string;
}

export interface FolderStructureResponse extends ApiResponse<{
  folders: Array<{
    name: string;
    displayName: string;
    count: number;
    path: string;
    subfolders?: Array<{
      name: string;
      displayName: string;
      count: number;
      path: string;
    }>;
  }>;
}> {}

// 社区API类型
export interface CommunityApiResponse extends ApiResponse<{
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
}> {}

export interface CommunityListResponse extends PaginatedResponse<{
  id: string;
  name: string;
  displayName: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  thumbnail: string;
}> {}

// 餐厅API类型
export interface RestaurantApiResponse extends ApiResponse<{
  id: string;
  name: string;
  displayName: string;
  cuisine: string;
  description: string;
  location: string;
  facadeImage: string;
  dishes: string[];
  mustTryDishes: string[];
}> {}

// 活动API类型
export interface EventApiResponse extends ApiResponse<{
  id: string;
  name: string;
  displayName: string;
  description: string;
  images: string[];
  type: 'social' | 'cultural' | 'sports' | 'educational';
}> {}

// 服务API类型
export interface ServiceApiResponse extends ApiResponse<{
  id: string;
  title: string;
  icon: string;
  description?: string;
  category: 'translation' | 'registration' | 'travel' | 'maintenance' | 'other';
}> {}

// 用户评价API类型
export interface TestimonialApiResponse extends ApiResponse<{
  id: string;
  name: string;
  university: string;
  content: string;
  avatar: string;
  rating: number;
  date: string;
}> {}

// 表单提交API类型
export interface FormSubmissionRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
  metadata?: Record<string, any>;
}

export interface FormSubmissionResponse extends ApiResponse<{
  id: string;
  status: 'pending' | 'processed' | 'completed';
  message: string;
}> {}

// 搜索API类型
export interface SearchRequest {
  query: string;
  type?: 'community' | 'restaurant' | 'event' | 'service';
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
}

export interface SearchResponse extends PaginatedResponse<{
  id: string;
  title: string;
  description: string;
  type: 'community' | 'restaurant' | 'event' | 'service';
  thumbnail?: string;
  relevance: number;
}> {}

// 健康检查API类型
export interface HealthCheckResponse extends ApiResponse<{
  status: 'healthy' | 'unhealthy';
  version: string;
  timestamp: string;
  services: {
    database: 'connected' | 'disconnected';
    oss: 'connected' | 'disconnected';
    cache: 'connected' | 'disconnected';
  };
}> {}

// 错误响应类型
export interface ErrorResponse extends ApiResponse<null> {
  success: false;
  error: string;
  code: string;
  timestamp: string;
  details?: any;
}

// 类型已在上面定义，无需重复导出
