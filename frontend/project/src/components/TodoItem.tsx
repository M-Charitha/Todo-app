import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: (id: string, updatedTodo: Partial<Todo>) => void; // New onSave function to handle updates
}

export function TodoItem({ todo, onToggle, onDelete, onSave }: TodoItemProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPriority(e.target.value);
  };

  const handleTextSave = () => {
    if (editedText !== todo.text) {
      onSave(todo._id, { text: editedText }); // Use _id to refer to the correct todo
    }
    setIsEditingText(false);
  };

  const handlePrioritySave = () => {
    if (editedPriority !== todo.priority) {
      onSave(todo._id, { priority: editedPriority }); // Use _id to refer to the correct todo
    }
    setIsEditingPriority(false);
  };

  return (
    <div className={`group flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md ${
      todo.completed ? 'bg-gray-50' : ''
    }`}>
      <button
        onClick={() => onToggle(todo._id)} // Use _id here to toggle
        className="flex-shrink-0 focus:outline-none"
      >
        {todo.completed ? (
          <CheckCircle2 className="w-6 h-6 text-blue-500" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400 hover:text-blue-500" />
        )}
      </button>

      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between">
          {isEditingText ? (
            <input
              type="text"
              value={editedText}
              onChange={handleTextChange}
              onBlur={handleTextSave}
              className="text-sm font-medium text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none"
            />
          ) : (
            <h3
              className={`text-sm font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}
              onClick={() => setIsEditingText(true)}
            >
              {todo.text}
            </h3>
          )}

          <button
            onClick={() => onDelete(todo._id)} // Use _id here to delete
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
        
        <div className="mt-1 flex items-center gap-2">
          {isEditingPriority ? (
            <input
              type="text"
              value={editedPriority}
              onChange={handlePriorityChange}
              onBlur={handlePrioritySave}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none"
            />
          ) : (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[editedPriority]}`}
              onClick={() => setIsEditingPriority(true)}
            >
              {editedPriority}
            </span>
          )}

          {todo.dueDate && (
            <span className="inline-flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
