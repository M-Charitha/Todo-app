import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className={`group flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md ${
      todo.completed ? 'bg-gray-50' : ''
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 focus:outline-none"
      >
        {todo.completed ? (
          <CheckCircle2 className="w-6 h-6 text-blue-500" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400 hover:text-blue-500" />
        )}
      </button>

      <div className="flex-grow min-w-0">
        <h3 className={`text-sm font-medium ${
          todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
        }`}>
          {todo.title}
        </h3>
        
        <div className="mt-1 flex items-center gap-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            priorityColors[todo.priority]
          }`}>
            {todo.priority}
          </span>
          
          {todo.dueDate && (
            <span className="inline-flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 p-1 hover:bg-gray-100 rounded"
      >
        <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
      </button>
    </div>
  );
}