
# TaskFlow - Task Management Application

TaskFlow is a full-stack task management application built with React and Supabase. It allows users to create, manage, and track their tasks in a clean, intuitive interface.

## Features

- **User Authentication**: Secure email/password signup and login
- **Task Management**: Create, read, update, and delete tasks
- **Task Details**: Each task has a title, description, due date, and completion status
- **Task Priorities**: Set low, medium, or high priority for tasks
- **Filtering & Sorting**: Filter tasks by completion status and priority, sort by various criteria
- **Real-time Updates**: See task changes in real-time using Supabase subscriptions
- **Data Privacy**: Tasks are scoped to the authenticated user with Row Level Security
- **Responsive Design**: Works on mobile and desktop devices

## Technology Stack

- **Frontend**: React with TypeScript, Vite, TailwindCSS, shadcn/ui components
- **Backend**: Supabase (Authentication, Database, Real-time subscriptions)
- **Routing**: React Router v6
- **Form Handling**: Native React forms
- **UI Components**: shadcn/ui component library
- **Date Handling**: date-fns

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A Supabase account and project

### Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Set up the database schema:

```sql
-- Create tasks table
CREATE TABLE public.tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  is_complete BOOLEAN DEFAULT FALSE NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Set up Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for task access
CREATE POLICY "Users can only view their own tasks"
  ON public.tasks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own tasks"
  ON public.tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only update their own tasks"
  ON public.tasks
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own tasks"
  ON public.tasks
  FOR DELETE
  USING (auth.uid() = user_id);
```

3. Get your Supabase URL and anon key from the project settings

### Environment Setup

1. Clone this repository
2. Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Install dependencies:

```bash
npm install
# or
yarn
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to http://localhost:8080

## Deployment

This application can be deployed to any static hosting service (Vercel, Netlify, etc.) that supports environment variables.

## Future Enhancements

- Task categorization/labels
- Dark mode toggle
- Task search
- Recurring tasks
- Notifications/reminders
- Mobile app version
