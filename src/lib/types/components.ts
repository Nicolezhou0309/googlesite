/**
 * 组件相关类型定义
 */

import { BaseComponentProps, SectionProps } from './index';

// 图片组件类型
export interface ImageProps extends BaseComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

// 轮播组件类型
export interface CarouselProps extends BaseComponentProps {
  images: string[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  effect?: 'scrollx' | 'fade';
  dots?: boolean;
  arrows?: boolean;
  infinite?: boolean;
  speed?: number;
}

// 卡片组件类型
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  hover?: boolean;
}

// 按钮组件类型
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// 模态框组件类型
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  maskClosable?: boolean;
}

// 导航组件类型
export interface NavigationProps extends BaseComponentProps {
  items: NavigationItem[];
  variant?: 'horizontal' | 'vertical';
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

// 表单组件类型
export interface FormProps extends BaseComponentProps {
  onSubmit: (data: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  validation?: Record<string, any>;
  loading?: boolean;
}

// 分页组件类型
export interface PaginationProps extends BaseComponentProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}

// 搜索组件类型
export interface SearchProps extends BaseComponentProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  loading?: boolean;
  suggestions?: string[];
}

// 标签组件类型
export interface TagProps extends BaseComponentProps {
  label: string;
  color?: string;
  variant?: 'default' | 'outline' | 'filled';
  closable?: boolean;
  onClose?: () => void;
}

// 加载组件类型
export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  overlay?: boolean;
}

// 空状态组件类型
export interface EmptyProps extends BaseComponentProps {
  title?: string;
  description?: string;
  image?: string;
  action?: React.ReactNode;
}

// 工具提示组件类型
export interface TooltipProps extends BaseComponentProps {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
}

// 下拉菜单组件类型
export interface DropdownProps extends BaseComponentProps {
  items: DropdownItem[];
  trigger?: 'hover' | 'click';
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
}

export interface DropdownItem {
  key: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

// 标签页组件类型
export interface TabsProps extends BaseComponentProps {
  items: TabItem[];
  activeKey?: string;
  onChange?: (key: string) => void;
  type?: 'line' | 'card' | 'editable-card';
}

export interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}

// 手风琴组件类型
export interface AccordionProps extends BaseComponentProps {
  items: AccordionItem[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  expandIcon?: React.ReactNode;
}

export interface AccordionItem {
  key: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}
