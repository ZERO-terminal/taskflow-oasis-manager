
import { createClient } from "@supabase/supabase-js";
import type { Database as SupabaseDatabase } from "@/integrations/supabase/types";

// Use the values from the Supabase integration
const supabaseUrl = "https://pzeuronovneipnpicaoc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZXVyb25vdm5laXBucGljYW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMjAzNzIsImV4cCI6MjA1OTg5NjM3Mn0.aBhyd-IEYvPpSiXJuDDKHG8Bz9TmgZkAT4Uj5NCOOp0";

export const supabase = createClient<SupabaseDatabase>(supabaseUrl, supabaseAnonKey);

// Define our task types based on the actual database schema
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string; // Instead of is_complete
  due_date: string | null;
  user_id: string;
  created_at: string;
  priority: string;
  tags: string[] | null;
}

export type NewTask = {
  title: string;
  description?: string | null;
  status?: string;
  due_date?: string | null;
  user_id?: string;
  priority?: string;
  tags?: string[] | null;
};

export type UpdateTask = {
  title?: string;
  description?: string | null;
  status?: string;
  due_date?: string | null;
  user_id?: string;
  priority?: string;
  tags?: string[] | null;
};
