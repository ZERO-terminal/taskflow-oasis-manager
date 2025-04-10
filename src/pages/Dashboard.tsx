
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getTasks, subscribeToTasks } from "@/services/taskService";
import { Task } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, LogOut } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import TaskCreateDialog from "@/components/TaskCreateDialog";
import TaskFilter, { TaskFilterOptions } from "@/components/TaskFilter";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<TaskFilterOptions>({
    showCompleted: true,
    priority: "all",
    sortBy: "dueDate",
  });

  // Fetch tasks from Supabase
  const fetchTasks = useCallback(async () => {
    try {
      const taskData = await getTasks();
      setTasks(taskData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        variant: "destructive",
        title: "Failed to load tasks",
        description: "Please try refreshing the page.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTasks();
    
    // Set up real-time subscription
    const unsubscribe = subscribeToTasks((payload) => {
      fetchTasks();
      
      if (payload.eventType === "INSERT") {
        toast({
          title: "New task created",
          description: "A new task has been added to your list.",
        });
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [fetchTasks, toast]);

  // Apply filters
  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    if (!filterOptions.showCompleted && task.status === "completed") {
      return false;
    }
    
    // Filter by priority
    if (filterOptions.priority !== "all" && task.priority !== filterOptions.priority) {
      return false;
    }
    
    return true;
  });
  
  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (filterOptions.sortBy) {
      case "dueDate":
        // Handle null due dates (place them at the end)
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      
      case "createdAt":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      
      case "priority": {
        const priorityMap: Record<string, number> = { high: 3, medium: 2, low: 1, null: 0 };
        return (priorityMap[b.priority || "null"] || 0) - (priorityMap[a.priority || "null"] || 0);
      }
      
      case "title":
        return a.title.localeCompare(b.title);
      
      default:
        return 0;
    }
  });

  const incompleteTasksCount = tasks.filter(task => task.status !== "completed").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">TaskFlow</h1>
            <p className="text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={signOut}
            className="gap-1"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold">Your Tasks</h2>
            <p className="text-muted-foreground">
              You have {incompleteTasksCount} incomplete task{incompleteTasksCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <TaskFilter 
              filterOptions={filterOptions}
              onFilterChange={setFilterOptions}
            />
            <TaskCreateDialog onTaskCreated={fetchTasks} />
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : sortedTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onTaskUpdated={fetchTasks} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-6">
              {tasks.length === 0 
                ? "You haven't created any tasks yet." 
                : "No tasks match your current filters."}
            </p>
            {tasks.length === 0 && (
              <TaskCreateDialog onTaskCreated={fetchTasks} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
