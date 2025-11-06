import { createClient } from '@supabase/supabase-js'
import { type User as ClerkUser } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'

// Create a supabase client that works with Clerk authentication
export const createClerkSupabaseClient = (
  clerkUser: ClerkUser | null
) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: async (url, options = {}) => {
        const { getToken } = await auth()
        const clerkToken = await getToken()
        
        const headers = new Headers(options?.headers)
        if (clerkToken) {
          headers.set('Authorization', `Bearer ${clerkToken}`)
        }
        
        return fetch(url, {
          ...options,
          headers,
        })
      },
    },
  })

  return supabase
}