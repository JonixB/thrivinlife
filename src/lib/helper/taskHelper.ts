import { supabase } from "./supabase";

interface Task {
  id: string;
  user_id: string;
  task_title: string;
  task_description: string;
  due_date: string;
  priority: string;
  status: string;
}

const getStartDate = (filter: 'Last Week' | 'Last Month' | 'Last Year' | 'Custom') => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set the time to the start of the day

  switch (filter) {
    case 'Last Week':
      now.setDate(now.getDate() - now.getDay() - 7); // Subtract the number of days since last Sunday and an additional week
      break;
    case 'Last Month':
      now.setMonth(now.getMonth() - 1, 1); // Set to the first day of the last month
      break;
    case 'Last Year':
      now.setFullYear(now.getFullYear() - 1, 0, 1); // Set to the first day of the last year
      break;
    case 'Custom':
      // For 'Custom', you'll need to define how you want to allow users to pick a range
      break;
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
  return now.toISOString().split('T')[0]; // Return the date string in YYYY-MM-DD format
};

export const fetchTasks = async (
  filter: 'Last Week' | 'Last Month' | 'Last Year' | 'Custom',
  userId: string
): Promise<{ completed: number; total: number }> => {
  const startDate = getStartDate(filter);
  const endDate = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .gte('due_date', startDate)
    .lte('due_date', endDate)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching tasks:', error);
    return { completed: 0, total: 0 };
  }

  // Type assertion here if necessary
  const tasks: Task[] = data as Task[];

  const completed = tasks.filter(task => task.status === 'Complete').length;
  const total = tasks.length;

  return { completed, total };
};

export const calculateCompletionRate = (completed: number, total: number): number => {
  if (total === 0) return 0; // Avoid division by zero
  return (completed / total) * 100; // Return the percentage
};
