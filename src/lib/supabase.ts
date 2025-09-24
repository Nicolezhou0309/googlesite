import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 生成唯一的leadid - 与CRM backend保持一致的模式
export const generateLeadId = () => {
  const timestamp = Date.now()
  // 增加随机字符串长度，添加更多随机性
  const random1 = Math.random().toString(36).substring(2, 10)
  const random2 = Math.random().toString(36).substring(2, 10)
  const clientId = typeof window !== 'undefined' ? 
    (window.navigator.userAgent.slice(-8) + Math.random().toString(36).substring(2, 6)) : 
    'unknown'
  return `web_${timestamp}_${random1}_${random2}_${clientId}`
}
