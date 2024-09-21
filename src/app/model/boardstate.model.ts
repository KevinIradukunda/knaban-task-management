export interface BoardState {
  boards: any[];
  loading: boolean;
  error: string | null;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Todo' | 'Doing' | 'Done';
  subtasks: Array<{ title: string; isCompleted: boolean }>;
}

export interface Column {
  name: 'Todo' | 'Doing' | 'Done';
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[];
}
