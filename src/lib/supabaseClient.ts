import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../database/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key in environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
