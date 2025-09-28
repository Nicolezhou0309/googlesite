/**
 * 滚动相关的工具函数
 * 用于优化页面滚动性能和体验
 */

/**
 * 防抖函数 - 用于优化滚动事件处理
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * 节流函数 - 用于限制函数调用频率
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * 平滑滚动到指定元素
 */
export function smoothScrollToElement(
  element: HTMLElement | string,
  offset: number = 0,
  duration: number = 500
): void {
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element
    
  if (!targetElement) {
    console.warn('目标元素未找到:', element)
    return
  }
  
  const startPosition = window.pageYOffset
  const targetPosition = targetElement.offsetTop - offset
  const distance = targetPosition - startPosition
  const startTime = performance.now()
  
  function animation(currentTime: number) {
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    
    // 使用缓动函数
    const ease = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2
    
    window.scrollTo(0, startPosition + distance * ease)
    
    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }
  
  requestAnimationFrame(animation)
}

/**
 * 平滑滚动到页面顶部
 */
export function smoothScrollToTop(duration: number = 500): void {
  const startPosition = window.pageYOffset
  const startTime = performance.now()
  
  function animation(currentTime: number) {
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    
    const ease = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2
    
    window.scrollTo(0, startPosition * (1 - ease))
    
    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }
  
  requestAnimationFrame(animation)
}

/**
 * 检查元素是否在视口中
 */
export function isElementInViewport(element: HTMLElement, threshold: number = 0): boolean {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth
  
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  )
}

/**
 * 获取滚动位置
 */
export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  }
}

/**
 * 设置滚动位置
 */
export function setScrollPosition(x: number, y: number, smooth: boolean = false): void {
  if (smooth) {
    window.scrollTo({
      left: x,
      top: y,
      behavior: 'smooth'
    })
  } else {
    window.scrollTo(x, y)
  }
}

/**
 * 锁定页面滚动
 */
export function lockScroll(): void {
  const scrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.width = '100%'
  document.body.classList.add('scroll-locked')
}

/**
 * 解锁页面滚动
 */
export function unlockScroll(): void {
  const scrollY = document.body.style.top
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  document.body.classList.remove('scroll-locked')
  
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
}

/**
 * 创建优化的滚动事件监听器
 */
export function createScrollListener(
  callback: (scrollY: number) => void,
  options: {
    throttle?: number
    passive?: boolean
  } = {}
): () => void {
  const { throttle: throttleMs = 16, passive = true } = options
  
  const throttledCallback = throttle(callback, throttleMs)
  
  const handleScroll = () => {
    throttledCallback(window.scrollY)
  }
  
  window.addEventListener('scroll', handleScroll, { passive })
  
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}
