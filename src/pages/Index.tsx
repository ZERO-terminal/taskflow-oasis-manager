
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-background flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-primary">
          Welcome to TaskFlow
        </h1>
        <p className="text-xl mb-8 text-muted-foreground">
          A simple, powerful task management application to help you stay organized and boost your productivity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="font-semibold">
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-semibold">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="bg-card shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-primary">Organize Tasks</h2>
          <p className="text-muted-foreground">
            Create, manage, and track your tasks with ease. Stay on top of your to-dos.
          </p>
        </div>
        <div className="bg-card shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-primary">Set Due Dates</h2>
          <p className="text-muted-foreground">
            Never miss a deadline again. Schedule your tasks and get reminders.
          </p>
        </div>
        <div className="bg-card shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-primary">Track Progress</h2>
          <p className="text-muted-foreground">
            Mark tasks as complete and visualize your productivity over time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
