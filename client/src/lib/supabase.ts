import { createClient } from '@supabase/supabase-js';

// Supabase configuration - matches Python backend setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zadluwuwmvlylfnxdmvf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// TypeScript types matching your database schema
export interface Event {
  event_id: string;
  name: string;
  date: string;
  venue: string;
  start_time?: string;
  end_time?: string;
  dress_code?: string;
  location_map?: string;
  special_notes?: string;
  invitation_message?: string;
  created_date?: string;
  user_id?: string; // For RLS - will be added in Step 7
}

export interface Guest {
  guest_id: string;
  event_id: string;
  name: string;
  phone_number: string;
  rsvp_status: 'pending' | 'confirmed' | 'declined' | 'maybe' | 'attending';
  messaging_preference: 'whatsapp' | 'sms'; // Matches your database.py
  invitation_sent?: boolean;
  invitation_received?: boolean; // Alternative naming
  invitation_sent_date?: string;
  updated_date?: string;
  created_date?: string;
}

export interface EventStatus {
  status_id: string;
  event_id: string;
  total_guests: number;
  total_confirmed: number;
  total_pending: number;
  total_declined: number;
  invitations_sent: number;
  invitations_sent_out?: boolean; // Legacy field
  rsvp_reminder_stage?: number;
  rsvp_reminder_date?: string;
  last_updated?: string;
}

export interface Message {
  message_id: string;
  guest_id: string;
  message: string;
  response?: string;
  needs_human_followup: boolean;
  followup_status?: 'pending' | 'resolved';
  created_at?: string;
}

// Auth helper functions
export const authHelpers = {
  async signInWithGoogle() {
    // Use VITE_APP_URL if available, otherwise construct from window.location
    const appUrl = import.meta.env.VITE_APP_URL || `${window.location.origin}${import.meta.env.BASE_URL}`;
    const redirectUrl = `${appUrl}/events`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });
    
    if (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
    
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }
    return user;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    return session;
  }
};

export default supabase;
