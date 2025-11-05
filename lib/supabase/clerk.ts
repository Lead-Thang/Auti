import { createClient } from '@supabase/supabase-js'
import { type User as ClerkUser } from '@clerk/nextjs/server'

// Create a single supabase client for client-side operations
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Create a supabase client for server-side operations with Clerk user
export const createSupabaseServerClient = (clerkUser: ClerkUser | null) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  // If we have a Clerk user, set up the Supabase session
  if (clerkUser) {
    // This is where you would typically set up RLS policies in Supabase
    // based on the Clerk user ID
    // For now, we'll just return the client
  }

  return supabase
}