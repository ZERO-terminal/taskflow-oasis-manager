
import { useState } from "react";
import { Task } from "@/lib/supabase";
import { toggleTaskCompletion, deleteTask } from "@/services/taskService";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import TaskEditDialog from "./TaskEditDialog";

interface TaskCardProps {
  task: Task;
  onTaskUpdated: () => void;
}

const TaskCard = ({ task, onTaskUpdated }: TaskCardProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const isComplete = task.status === "completed";
  
  const handleCheckboxChange = async () => {
    try {
      await toggleTaskCompletion(task.id, !isComplete);
      onTaskUpdated();
      toast({
        title: isComplete ? "Task marked as incomplete" : "Task completed",
        description: task.title,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update task status",
        description: "Please try again later.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onTaskUpdated();
      toast({
        title: "Task deleted",
        description: task.title,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete task",
        description: "Please try again later.",
      });
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "low":
        return "bg-task-low text-background";
      case "medium":
        return "bg-task-medium text-background";
      case "high":
        return "bg-task-high text-background";
      default:
        return "bg-muted text-foreground";
    }
  };

  const isOverdue = task.due_date 
    ? new Date(task.due_date) < new Date() && !isComplete 
    : false;

  return (
    <>
      <Card 
        className={cn(
          "transition-all duration-200", 
          isComplete ? "opacity-70" : "",
          isOverdue ? "border-destructive/50" : ""
        )}
      >
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Checkbox 
              checked={isComplete} 
              onCheckedChange={handleCheckboxChange} 
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 
                  className={cn(
                    "font-medium text-base line-clamp-2",
                    isComplete ? "line-through text-muted-foreground" : ""
                  )}
                >
                  {task.title}
                </h3>
                {task.priority && (
                  <Badge className={cn("ml-2", getPriorityColor())}>
                    {task.priority}
                  </Badge>
                )}
              </div>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              {task.due_date && (
                <div className="mt-2 text-xs font-medium">
                  <span className={cn(
                    "inline-block",
                    isOverdue ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {isOverdue ? "Overdue: " : "Due: "}
                    {format(new Date(task.due_date), "PPP")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-0 pb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:text-destructive/90"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </CardFooter>
      </Card>
      
      {isEditing && (
        <TaskEditDialog
          task={task}
          open={isEditing}
          onOpenChange={setIsEditing}
          onTaskUpdated={onTaskUpdated}
        />
      )}
    </>
  );
};

export default TaskCard;
