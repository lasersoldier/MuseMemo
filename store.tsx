import React, { createContext, useContext, useState, useEffect } from 'react';
import { Prompt, AiModel, UserProfile } from './types';
import { supabase, isSupabaseEnabled } from './lib/supabase';

// Mock Data for Demo Mode (when Supabase is not connected)
const DEMO_PROMPTS: Prompt[] = [
  {
    id: '1',
    shortId: 'MJ-0042',
    title: 'Minimalist Logo Design',
    content: 'Create a minimalist vector logo for a coffee shop named "Zen Brew". Use negative space, monochrome palette, and geometric shapes.',
    model: 'Midjourney',
    tags: ['Creative', 'Design'],
    usageCount: 45,
    isFavorite: true,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    author: 'system',
    description: 'Generates clean, vector-style logos.',
    sampleResponse: 'Generated a minimalist logo featuring a coffee cup silhouette with a zen circle negative space design, using a monochrome black and white palette with clean geometric lines.'
  },
  {
    id: '2',
    shortId: 'GPT-8812',
    title: 'React Component Generator',
    content: 'Write a React functional component using TypeScript and Tailwind CSS for a [Component Name]. Ensure accessibility compliance.',
    model: 'ChatGPT',
    tags: ['Code', 'React'],
    usageCount: 120,
    isFavorite: true,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    author: 'system',
    description: 'Standard boilerplate for UI components.',
    sampleResponse: `import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = "primary" 
}) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-medium transition-colors " + (
        variant === "primary" 
          ? "bg-blue-500 text-white hover:bg-blue-600" 
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      )
      aria-label="Action button"
    >
      {children}
    </button>
  );
};`
  },
  {
    id: '3',
    shortId: 'GEM-0103',
    title: 'Blog Post Outline',
    content: 'Generate a comprehensive outline for a blog post about [Topic]. Include H2/H3 headers and key talking points for each section.',
    model: 'Gemini',
    tags: ['Writing', 'Content'],
    usageCount: 30,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    author: 'system',
    description: 'Structured outlines for SEO articles.',
    sampleResponse: `# How to Start a Successful Blog in 2024

## Introduction
- The current state of blogging in 2024
- Why now is a great time to start
- What you'll learn in this guide

## 1. Define Your Blog's Purpose and Niche
- Identifying your passion and expertise
- Researching profitable niches
- Defining your target audience

## 2. Choose the Right Blogging Platform
- WordPress vs. other platforms
- Self-hosted vs. managed solutions
- Essential features to look for

## 3. Set Up Your Blog
- Domain name selection
- Web hosting options
- Basic setup and configuration

## 4. Design Your Blog for Success
- Choosing a theme
- Essential pages to include
- Mobile optimization

## 5. Create High-Quality Content
- Content strategy development
- Writing engaging headlines
- SEO best practices

## 6. Promote Your Blog
- Social media marketing
- Email marketing basics
- Guest posting opportunities

## Conclusion
- Final tips for success
- Next steps to take action`
  },
  {
    id: '4',
    shortId: 'CLA-0078',
    title: 'Email Response Generator',
    content: 'Write a professional email response to [Recipient] regarding [Topic]. Keep it concise and polite, addressing all key points mentioned in their message.',
    model: 'Claude',
    tags: ['Writing', 'Professional'],
    usageCount: 89,
    isFavorite: true,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    author: 'system',
    description: 'Professional email templates for various scenarios.',
    sampleResponse: `Hi [Recipient],

Thank you for reaching out regarding [Topic]. I appreciate you bringing this to my attention.

I've reviewed your message and understand your concerns. Here's how we can address them:

1. [Point 1 from their message] - [Your response]
2. [Point 2 from their message] - [Your response]
3. [Point 3 from their message] - [Your response]

Please let me know if you need any further clarification or have additional questions. I'm happy to help.

Best regards,
[Your Name]`
  },
  {
    id: '5',
    shortId: 'MJ-0123',
    title: 'Product Photography Prompt',
    content: 'Create a product photography scene for [Product] with [Style] lighting and [Background]. Focus on highlighting the product features with professional composition.',
    model: 'Midjourney',
    tags: ['Creative', 'Photography'],
    usageCount: 56,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    author: 'system',
    description: 'Product photography concepts for e-commerce.',
    sampleResponse: 'Created a product photography scene for a luxury watch with soft studio lighting and a dark marble background. The composition highlights the watch\'s intricate details, with a shallow depth of field focusing on the dial and bezel, while still showing the overall design. The lighting creates subtle reflections that emphasize the watch\'s premium materials.'
  },
  {
    id: '6',
    shortId: 'GPT-9945',
    title: 'SQL Query Generator',
    content: 'Write a SQL query to [Action] from [Table] where [Conditions]. Include appropriate joins, filters, and ordering.',
    model: 'ChatGPT',
    tags: ['Code', 'Database'],
    usageCount: 156,
    isFavorite: true,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    author: 'system',
    description: 'Generate efficient SQL queries for various databases.',
    sampleResponse: `-- Example: Get all customers who purchased a product in the last 30 days
SELECT 
  c.customer_id,
  c.first_name,
  c.last_name,
  c.email,
  COUNT(o.order_id) as total_orders,
  SUM(oi.quantity * oi.unit_price) as total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
ORDER BY total_spent DESC;`
  }
];

interface StoreContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>; // Simplified for demo
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  prompts: Prompt[];
  savedPrompts: Prompt[];
  addPrompt: (prompt: Omit<Prompt, 'id' | 'shortId' | 'usageCount' | 'createdAt' | 'lastUsed' | 'author' | 'userId'>) => Promise<void>;
  savePublicPrompt: (id: string) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;
  updatePrompt: (id: string, updates: Partial<Prompt>) => Promise<void>;
  incrementUsage: (id: string) => Promise<void>;
  clearUsageCounts: () => Promise<void>;
  resetUserData: () => Promise<void>;
  unsubscribePrompt: (id: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>(DEMO_PROMPTS);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    const initSession = async () => {
      // Debug info for initialization
      console.log('Initializing session...');
      console.log('Supabase URL exists:', !!import.meta.env.VITE_SUPABASE_URL);
      console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      console.log('isSupabaseEnabled:', isSupabaseEnabled);
      console.log('supabase client:', !!supabase);
      
      // Try to create Supabase client if not already available
      let supabaseClient = supabase;
      if (!supabaseClient && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.log('Creating Supabase client for session initialization');
        const { createClient } = await import('@supabase/supabase-js');
        supabaseClient = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );
      }

      if (supabaseClient) {
        try {
          const { data: { session } } = await supabaseClient.auth.getSession();
          console.log('Session data:', session);
          if (session) {
            // Create a basic user profile from auth data
            const basicProfile: UserProfile = {
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name || '',
              avatar_url: session.user.user_metadata?.avatar_url || '',
              created_at: new Date().toISOString(),
              total_usage: 0,
              subscription_tier: 'free'
            };
            
            // Try to fetch Profile from database, but don't fail if it doesn't exist
            try {
              const { data: profile, error: profileError } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (profileError) {
                console.error('Profile fetch error:', profileError);
                console.log('Using basic profile from auth data');
                setUser(basicProfile);
                // Fetch User Prompts even when using basic profile
                fetchPrompts(session.user.id, supabaseClient);
              } else if (profile) {
                setUser(profile as UserProfile);
                // Fetch User Prompts
                fetchPrompts(session.user.id, supabaseClient);
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
              console.log('Using basic profile from auth data');
              setUser(basicProfile);
              // Fetch User Prompts even when using basic profile
              fetchPrompts(session.user.id, supabaseClient);
            }
          }
        } catch (error) {
          console.error('Session initialization error:', error);
        }
      }
      setIsLoading(false);
    };
    initSession();
  }, []);

  const fetchPrompts = async (userId: string, supabaseClient = supabase) => {
    if (!supabaseClient) return;
    try {
      console.log('Fetching all prompts from database');
      // Fetch all prompts, not just for the current user
      const { data, error } = await supabaseClient.from('prompts').select('*');
      if (error) {
        console.error('Fetch prompts error:', error);
        console.log('Using demo prompts only');
        return;
      }
      if (data) {
        // Fetch current user profile to get their name for prompts
        let currentUserProfile: UserProfile | null = null;
        try {
          const { data: profileData } = await supabaseClient.from('profiles').select('*').eq('id', userId).single();
          currentUserProfile = profileData;
        } catch (profileError) {
          console.error('Error fetching user profile:', profileError);
        }
        
        // Merge with system prompts if needed, and ensure creatorName is set
        // First, create a map of existing prompts by id to avoid duplicates
        const promptMap = new Map<string, Prompt>();
        
        // Add system prompts first
        DEMO_PROMPTS.filter(p => p.author === 'system').forEach(p => {
          promptMap.set(p.id, p);
        });
        
        // Add database prompts, overriding system prompts if they have the same id
        data.forEach(prompt => {
          // Ensure all required fields are present
          const fullPrompt: Prompt = {
            ...prompt,
            creatorName: prompt.creatorName || 'User',
            // For the current user's prompts, ensure creatorName matches their current full_name
            ...(prompt.userId === userId && currentUserProfile?.full_name ? { creatorName: currentUserProfile.full_name } : {})
          };
          promptMap.set(fullPrompt.id, fullPrompt);
        });
        
        // Convert map back to array
        const updatedPrompts = Array.from(promptMap.values());
        
        setPrompts(updatedPrompts);
        console.log('Prompts fetched successfully:', updatedPrompts.length);
      } else {
        // If no data from database, use all demo prompts
        setPrompts(DEMO_PROMPTS);
        console.log('No database prompts found, using demo prompts');
      }
    } catch (error) {
      console.error('Exception in fetchPrompts:', error);
      console.log('Using demo prompts only');
    }
  };

  const savedPrompts = prompts.filter(p => p.author === 'user' || p.isFavorite);

  // Generate a "Short ID" like GPT-001 based on model
  const generateShortId = (model: string) => {
     const prefix = model.substring(0, 3).toUpperCase(); // e.g., CHA, MID
     const randomNum = Math.floor(1000 + Math.random() * 9000);
     return `${prefix}-${randomNum}`;
  };

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    
    try {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Debug information for Supabase initialization
      console.log('Supabase URL exists:', !!import.meta.env.VITE_SUPABASE_URL);
      console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      console.log('isSupabaseEnabled:', isSupabaseEnabled);
      console.log('supabase client:', !!supabase);

      // Try direct Supabase client creation as fallback
      let supabaseClient = supabase;
      if (!supabaseClient && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.log('Creating direct Supabase client from environment variables');
        const { createClient } = await import('@supabase/supabase-js');
        supabaseClient = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );
      }

      // Ensure Supabase is enabled
      if (!supabaseClient) {
        throw new Error('Authentication service is not available. Please contact support.');
      }

      // Real authentication with Supabase
      if (!password) {
        // Email OTP authentication
        const { error } = await supabaseClient.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: window.location.origin,
            shouldCreateUser: true
          }
        });
        
        if (error) {
          console.error('OTP signin error:', error);
          throw new Error(error.message);
        }
        
        alert('Verification email sent! Please check your inbox.');
        setIsLoading(false);
      } else {
        // Email/password authentication
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) {
          console.error('Password signin error:', error);
          throw new Error(error.message);
        }
        
        if (data.user) {
          // Create a basic user profile from auth data
          const basicProfile: UserProfile = {
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata?.full_name || '',
            avatar_url: data.user.user_metadata?.avatar_url || '',
            created_at: new Date().toISOString(),
            total_usage: 0,
            subscription_tier: 'free'
          };
          
          // Try to fetch Profile from database, but don't fail if it doesn't exist
          try {
              const { data: profile, error: profileError } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();
                
              if (profileError) {
                console.error('Profile fetch error:', profileError);
                console.log('Using basic profile from auth data');
                setUser(basicProfile);
                // Fetch user's existing prompts
                fetchPrompts(data.user.id, supabaseClient);
              } else if (profile) {
                setUser(profile as UserProfile);
                // Fetch user's existing prompts
                fetchPrompts(data.user.id, supabaseClient);
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
              console.log('Using basic profile from auth data');
              setUser(basicProfile);
              // Fetch user's existing prompts
              fetchPrompts(data.user.id, supabaseClient);
            }
        }
        
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      alert(error?.message || 'Authentication failed');
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Try direct Supabase client creation as fallback
      let supabaseClient = supabase;
      if (!supabaseClient && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        supabaseClient = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );
      }

      if (!supabaseClient) {
        throw new Error('Registration service is not available. Please contact support.');
      }

      // User registration
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });
      
      if (error) {
        console.error('Registration error:', error);
        throw new Error(error.message);
      }
      
      if (data.user) {
        // Create a basic user profile from auth data
        const basicProfile: UserProfile = {
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || email.split('@')[0] || '',
          avatar_url: data.user.user_metadata?.avatar_url || '',
          created_at: new Date().toISOString(),
          total_usage: 0,
          subscription_tier: 'free'
        };
        
        // Create user profile in database
        try {
          await supabaseClient.from('profiles').insert({
            id: data.user.id,
            email: data.user.email,
            full_name: basicProfile.full_name,
            avatar_url: basicProfile.avatar_url,
            created_at: basicProfile.created_at,
            total_usage: 0,
            subscription_tier: 'free'
          });
          
          // Reset user data
          await resetUserData();
          
          setUser(basicProfile);
          alert('Registration successful! Welcome to the platform!');
        } catch (profileError) {
          console.error('Error creating user profile:', profileError);
          throw new Error('Registration successful but profile creation failed');
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Try to get supabase client with fallback
      let supabaseClient = supabase;
      if (!supabaseClient && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        supabaseClient = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );
      }
      
      if (supabaseClient) {
        console.log('Signing out from Supabase');
        await supabaseClient.auth.signOut();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      // Update local state first for immediate feedback
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // If full_name is being updated, also update creatorName for all user's prompts
      if (updates.full_name) {
        setPrompts(prev => prev.map(prompt => {
          if (prompt.userId === user.id) {
            return { ...prompt, creatorName: updates.full_name };
          }
          return prompt;
        }));
      }
      
      // Update in database if Supabase is enabled
      if (isSupabaseEnabled && supabase) {
        // Update profiles table
        await supabase.from('profiles').update(updates).eq('id', user.id);
        
        // Update auth user_metadata to persist the name change
        if (updates.full_name) {
          await supabase.auth.updateUser({
            data: { full_name: updates.full_name }
          });
          
          // Update creatorName for all user's prompts in database
          await supabase.from('prompts').update({ creatorName: updates.full_name }).eq('userId', user.id);
        }
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Revert to original user state if there's an error
      setUser(user);
      throw error;
    }
  };

  const addPrompt = async (newPromptData: any) => {
    const shortId = generateShortId(newPromptData.model);
    const newPrompt: Prompt = {
      ...newPromptData,
      id: Math.random().toString(36).substr(2, 9),
      shortId,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      author: 'user',
      creatorName: user?.full_name || user?.email?.split('@')[0] || 'User',
      isFavorite: true,
      sampleResponse: newPromptData.sampleResponse || '',
      userId: user?.id
    };

    setPrompts(prev => [newPrompt, ...prev]);

    if (isSupabaseEnabled && supabase && user) {
        await supabase.from('prompts').insert({
            ...newPrompt,
            user_id: user.id 
        });
    }
  };

  const savePublicPrompt = async (id: string) => {
    // Update local state first for immediate feedback
    setPrompts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isFavorite: true, lastUsed: new Date().toISOString() };
      }
      return p;
    }));
    
    // Sync to DB if enabled
    if (isSupabaseEnabled && supabase && user) {
      try {
        // Update the prompt in the database with the user's id and isFavorite status
        await supabase.from('prompts').update({
          isFavorite: true, 
          lastUsed: new Date().toISOString(),
          // Ensure userId is set for the prompt when it's saved as favorite
          ...(user.id ? { userId: user.id } : {})
        }).eq('id', id);
        console.log('Prompt saved to favorites in database');
      } catch (error) {
        console.error('Error saving prompt to favorites:', error);
      }
    }
  };

  const unsubscribePrompt = async (id: string) => {
    // Ensure we're only unsubscribing from prompts that are favorites (not user-created)
    setPrompts(prev => prev.map(prompt => {
      if (prompt.id === id && prompt.isFavorite) {
        return { ...prompt, isFavorite: false, lastUsed: new Date().toISOString() };
      }
      return prompt;
    }));
    
    // Sync to DB if enabled
    if (isSupabaseEnabled && supabase) {
      try {
        await supabase.from('prompts').update({ isFavorite: false, lastUsed: new Date().toISOString() }).eq('id', id);
        console.log('Prompt unsubscribed from favorites in database');
      } catch (error) {
        console.error('Error unsubscribing prompt from favorites:', error);
      }
    }
  };

  const deletePrompt = async (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
    if (isSupabaseEnabled && supabase) {
        await supabase.from('prompts').delete().eq('id', id);
    }
  };

  const updatePrompt = async (id: string, updates: Partial<Prompt>) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    if (isSupabaseEnabled && supabase) {
        await supabase.from('prompts').update(updates).eq('id', id);
    }
  };

  const incrementUsage = async (id: string) => {
    setPrompts(prev => prev.map(p => 
      p.id === id ? { ...p, usageCount: p.usageCount + 1, lastUsed: new Date().toISOString() } : p
    ));
    // Update DB
  };

  const clearUsageCounts = async () => {
    setPrompts(prev => prev.map(p => {
      // Clear usage count for all prompts
      return { ...p, usageCount: 0 };
    }));
    
    if (isSupabaseEnabled && supabase && user) {
      await supabase.from('prompts').update({ usageCount: 0 });
    }
  };

  const resetUserData = async () => {
    // Clear all user prompts except system prompts, and reset usage counts
    setPrompts(prev => prev.map(p => {
      // Only keep system prompts, and reset their usage count and isFavorite status
      if (p.author === 'system') {
        return { ...p, usageCount: 0, isFavorite: false };
      }
      return p;
    }).filter(p => p.author === 'system'));
    
    // Reset user's total usage count
    if (user) {
      setUser(prev => prev ? { ...prev, total_usage: 0 } : null);
    }
    
    if (isSupabaseEnabled && supabase && user) {
      await supabase.from('prompts').delete().eq('user_id', user.id);
      await supabase.from('prompts').update({ usageCount: 0, isFavorite: false });
      // Update user profile to reset total_usage
      await supabase.from('profiles').update({ total_usage: 0 }).eq('id', user.id);
    }
  };

  return (
    <StoreContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateUserProfile,
      prompts,
      savedPrompts,
      addPrompt,
      savePublicPrompt,
      deletePrompt,
      updatePrompt,
      incrementUsage,
      clearUsageCounts,
      resetUserData,
      unsubscribePrompt
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};