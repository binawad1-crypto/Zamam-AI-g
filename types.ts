
export type Language = 'ar' | 'en';

export interface User {
  email: string;
  name: string;
  avatar?: string;
}

export enum View {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  PROJECTS = 'PROJECTS',
  TOOLS = 'TOOLS',
  CHAT = 'CHAT',
  SAVED = 'SAVED',
  SETTINGS = 'SETTINGS',
  PLANS = 'PLANS'
}

export interface AITool {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  category: 'text' | 'image' | 'audio' | 'video' | 'analysis';
  tokens: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}
