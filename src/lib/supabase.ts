export { createClient as createBrowserSupabaseClient } from './supabase/client'
export { createClient as createServerClient } from './supabase/server-only'

export const supabase = createBrowserSupabaseClient()
