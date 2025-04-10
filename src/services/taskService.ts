
import { supabase } from "@/lib/supabase";
import { Task, NewTask, UpdateTask } from "@/lib/supabase";

// Get all tasks for the current user
export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("due_date", { ascending: true });

  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }

  return data as Task[];
}

// Get a specific task by ID
export async function getTaskById(id: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw error;
  }

  return data as Task;
}

// Create a new task
export async function createTask(newTask: NewTask) {
  const { data, error } = await supabase
    .from("tasks")
    .insert(newTask)
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    throw error;
  }

  return data as Task;
}

// Update an existing task
export async function updateTask(id: string, updates: UpdateTask) {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }

  return data as Task;
}

// Delete a task
export async function deleteTask(id: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }

  return true;
}

// Toggle task completion status
export async function toggleTaskCompletion(id: string, isComplete: boolean) {
  return updateTask(id, { 
    status: isComplete ? "completed" : "todo" 
  });
}

// Subscribe to real-time changes on tasks
export function subscribeToTasks(callback: (payload: any) => void) {
  const subscription = supabase
    .channel("tasks-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "tasks" },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
}
