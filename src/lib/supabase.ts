
import { createClient } from "@supabase/supabase-js";

// Get environment variables or use placeholder values
// These placeholder values will prevent the app from crashing,
// but the Supabase client won't work until proper values are provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          is_complete: boolean;
          due_date: string | null;
          user_id: string;
          created_at: string;
          priority: "low" | "medium" | "high" | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          is_complete?: boolean;
          due_date?: string | null;
          user_id?: string;
          created_at?: string;
          priority?: "low" | "medium" | "high" | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          is_complete?: boolean;
          due_date?: string | null;
          user_id?: string;
          created_at?: string;
          priority?: "low" | "medium" | "high" | null;
        };
      };
    };
  };
}

export type Task = Database["public"]["Tables"]["tasks"]["Row"];
export type NewTask = Database["public"]["Tables"]["tasks"]["Insert"];
export type UpdateTask = Database["public"]["Tables"]["tasks"]["Update"];
