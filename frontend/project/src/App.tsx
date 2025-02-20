import React, { useState, useEffect } from 'react';
import { PlusCircle, ListTodo } from 'lucide-react';
import { Todo } from './types';
import { TodoItem } from './components/TodoItem';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const BASE_URL = 'http://localhost:5000'; // Assuming your backend runs on port 5000

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      toast.error('Error fetching todos. Check backend!', { position: 'top-right' });
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) {
      toast.warning('Todo cannot be empty!', { position: 'top-right' });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodo }),
      });

      if (!response.ok) throw new Error('Failed to add todo');

      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
      setNewTodo('');
      toast.success('Todo added successfully!', { position: 'top-right' });
    } catch (error) {
      toast.error('Error adding todo!', { position: 'top-right' });
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    console.log("Deleting todo with ID:", id); // Debugging log
  
    if (!id) {
      toast.error("Invalid Todo ID!", { position: "top-right" });
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) throw new Error("Failed to delete todo");
  
      setTodos(todos.filter((todo) => todo._id !== id)); // Changed from todo.id to todo._id
      toast.success("Todo deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Error deleting todo!", { position: "top-right" });
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id: string) => {
    try {
      const todoToUpdate = todos.find((todo) => todo._id === id); // Changed from todo.id to todo._id
      if (!todoToUpdate) throw new Error('Todo not found');

      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) throw new Error('Failed to update todo');

      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo))); // Changed from todo.id to todo._id
      toast.success('Todo updated successfully!', { position: 'top-right' });
    } catch (error) {
      toast.error('Error updating todo!', { position: 'top-right' });
    }
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-100 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="w-6 h-6 text-blue-500" />
                <h1 className="text-xl font-semibold text-gray-900">My Tasks</h1>
              </div>
              <div className="flex gap-2">
                {(['all', 'active', 'completed'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-md text-sm font-medium capitalize ${
                      filter === f
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add Todo Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTodo();
            }}
            className="p-6 border-b border-gray-100"
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Task
              </button>
            </div>
          </form>

          {/* Todo List */}
          <div className="divide-y divide-gray-100">
            {filteredTodos.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">No tasks found</p>
              </div>
            ) : (
              <div className="space-y-1 p-4">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo._id} // Changed from todo.id to todo._id
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
