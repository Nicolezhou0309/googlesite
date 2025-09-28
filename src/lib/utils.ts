import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 汇率转换函数
export function convertCNYToUSD(cnyAmount: number, exchangeRate: number = 0.14): number {
  return Math.round(cnyAmount * exchangeRate)
}

// 格式化美元价格
export function formatUSDPrice(usdAmount: number): string {
  return `$${usdAmount.toLocaleString()}`
}

// 格式化人民币价格
export function formatCNYPrice(cnyAmount: number): string {
  return `¥${cnyAmount.toLocaleString()}`
}
