
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SlidersHorizontal, Check } from "lucide-react";

export type TaskFilterOptions = {
  showCompleted: boolean;
  priority: string;
  sortBy: string;
};

interface TaskFilterProps {
  filterOptions: TaskFilterOptions;
  onFilterChange: (filters: TaskFilterOptions) => void;
}

const TaskFilter = ({ filterOptions, onFilterChange }: TaskFilterProps) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<TaskFilterOptions>(filterOptions);

  const handleFilterChange = (key: keyof TaskFilterOptions, value: any) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    setOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters = {
      showCompleted: true,
      priority: "all",
      sortBy: "dueDate",
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {(
            !filterOptions.showCompleted || 
            filterOptions.priority !== "all" || 
            filterOptions.sortBy !== "dueDate"
          ) && (
            <span className="flex h-2 w-2 rounded-full bg-primary ml-1" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Task Status</h4>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-completed" 
                checked={localFilters.showCompleted}
                onCheckedChange={(checked) => 
                  handleFilterChange("showCompleted", checked)
                }
              />
              <Label htmlFor="show-completed">Show completed tasks</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Priority</h4>
            <RadioGroup 
              value={localFilters.priority} 
              onValueChange={(value) => handleFilterChange("priority", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all-priority" />
                <Label htmlFor="all-priority">All priorities</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="filter-low" />
                <Label htmlFor="filter-low" className="text-task-low">Low priority</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="filter-medium" />
                <Label htmlFor="filter-medium" className="text-task-medium">Medium priority</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="filter-high" />
                <Label htmlFor="filter-high" className="text-task-high">High priority</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Sort by</h4>
            <Select 
              value={localFilters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due date (earliest first)</SelectItem>
                <SelectItem value="createdAt">Creation date (newest first)</SelectItem>
                <SelectItem value="priority">Priority (highest first)</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button 
              size="sm"
              onClick={applyFilters}
              className="gap-1"
            >
              <Check className="h-4 w-4" /> Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TaskFilter;
