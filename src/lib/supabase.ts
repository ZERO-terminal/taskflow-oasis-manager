
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Use the values from the Supabase integration
const supabaseUrl = "https://pzeuronovneipnpicaoc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZXVyb25vdm5laXBucGljYW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMjAzNzIsImV4cCI6MjA1OTg5NjM3Mn0.aBhyd-IEYvPpSiXJuDDKHG8Bz9TmgZkAT4Uj5NCOOp0";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

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
