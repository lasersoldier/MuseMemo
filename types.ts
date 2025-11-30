import * as d3 from 'd3';

export type AiModel = 'ChatGPT' | 'Midjourney' | 'Gemini' | 'Claude';

export interface Prompt {
  id: string; // UUID from Supabase
  shortId: string; // Optimization: e.g., "GPT-0024"
  title: string;
  content: string;
  model: AiModel;
  tags: string[]; 
  usageCount: number;
  isFavorite: boolean;
  createdAt: string;
  lastUsed: string;
  author: 'system' | 'user';
  creatorName?: string; // Actual creator's name
  description?: string;
  sampleResponse?: string; // Pre-written AI response example
  userId?: string; // Foreign key
}

export interface UserProfile {
  id: string; // UUID
  email: string;
  full_name?: string;
  avatar_url?: string;
  total_usage: number; // Stored in DB to avoid calculating every time
  subscription_tier: 'free' | 'pro' | 'admin';
  created_at: string;
}

export interface BubbleNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  value: number; 
  type: 'model' | 'category';
  color: string;
  data?: any;
}

export type NavLevel = 'models' | 'categories' | 'list';

export interface NavState {
  level: NavLevel;
  selectedModel: AiModel | null;
  selectedCategory: string | null;
}