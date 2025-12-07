import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Admin wallet address for receiving payments
export const ADMIN_WALLET = '0x154f3654088bb55ddabba62850cbcfdea6046e3c'

// Token conversion rate
export const TOKEN_RATE_USD = 1 // 1 token = $1
