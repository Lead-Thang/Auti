import { createClient } from '@supabase/supabase-js'
import { type User as ClerkUser } from '@clerk/nextjs/server'

// Create a supabase client that works with Clerk authentication
export const createClerkSupabaseClient = (
  clerkUser: ClerkUser | null,
  accessToken: string | null
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
  })

  // If we have a Clerk user and access token, set the Supabase session
  if (clerkUser && accessToken) {
    // Set the access token for Supabase
    supabase.auth.setAuth(accessToken)
  }

  return supabase
}