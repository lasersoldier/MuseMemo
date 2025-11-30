import { createClient } from '@supabase/supabase-js';

// Debug environment variables from all possible sources
console.log('=== Supabase Initialization Debug ===');
console.log('1. Environment variables from all sources:', {
  'import.meta.env.VITE_SUPABASE_URL': import.meta.env.VITE_SUPABASE_URL,
  'import.meta.env.VITE_SUPABASE_ANON_KEY': import.meta.env.VITE_SUPABASE_ANON_KEY ? '***key present***' : 'missing',
  'process.env.VITE_SUPABASE_URL': process.env.VITE_SUPABASE_URL,
  'process.env.VITE_SUPABASE_ANON_KEY': process.env.VITE_SUPABASE_ANON_KEY ? '***key present***' : 'missing'
});

// Try to get environment variables from multiple sources
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

console.log('2. Final Supabase configuration:', {
  supabaseUrl: !!supabaseUrl,
  supabaseAnonKey: !!supabaseAnonKey,
  supabaseUrlValue: supabaseUrl,
  supabaseAnonKeyValue: supabaseAnonKey ? '***key present***' : 'missing'
});

// Fallback for development if keys aren't present so app doesn't crash in preview
// If these are missing, the app will run in "Demo Mode"
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;
console.log('3. isSupabaseConfigured:', isSupabaseConfigured);

let supabaseInstance = null;
if (isSupabaseConfigured) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('4. supabase client created successfully:', !!supabaseInstance);
  } catch (error) {
    console.error('4. Error creating supabase client:', error);
  }
} else {
  console.log('4. supabase client not created: missing configuration');
}

export const supabase = supabaseInstance;
export const isSupabaseEnabled = !!supabase;
console.log('5. Final supabase client:', !!supabase);
console.log('6. isSupabaseEnabled:', isSupabaseEnabled);
console.log('=== Supabase Initialization Complete ===');