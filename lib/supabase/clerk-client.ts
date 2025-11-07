import { createClient } from '@supabase/supabase-js'
import { type User as ClerkUser } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'

/**
 * Server-side only - Do not call from Client Components
 * Creates a Supabase client configured with Clerk authentication.
 * This function must only be used on the server side as it relies on Clerk's server-side auth().
 *
 * @param clerkUser - Legacy parameter, not used (can be removed in future)
 * @param token - Optional pre-fetched Clerk token to avoid repeated auth() calls
 * @returns Configured Supabase client
 * @throws Error if called from client-side or if token retrieval fails
 */
export const createClerkSupabaseClient = async (
  clerkUser: ClerkUser | null,
  token?: string
) => {
  // Guard against client-side usage
  if (typeof window !== 'undefined') {
    throw new Error('createClerkSupabaseClient is server-side only and cannot be called from Client Components')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  // Get token once to avoid repeated auth() calls per fetch
  let clerkToken: string | null = token || null

  if (!clerkToken) {
    try {
      const authObj = await auth()
      const getToken = authObj.getToken
      clerkToken = getToken ? await getToken() : null
    } catch (error) {
      console.error('Failed to retrieve Clerk token:', error)
      throw new Error('Authentication failed: Unable to retrieve Clerk token')
    }
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: async (url, options = {}) => {
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