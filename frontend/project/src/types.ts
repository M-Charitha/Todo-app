export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
}

export const sampleTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    completed: false,
    priority: 'high',
    dueDate: '2024-03-20',
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    title: 'Schedule team meeting',
    completed: true,
    priority: 'medium',
    dueDate: '2024-03-18',
    createdAt: '2024-03-15'
  },
  {
    id: '3',
    title: 'Review documentation',
    completed: false,
    priority: 'low',
    createdAt: '2024-03-15'
  }
];