'use client';

import { useState } from 'react';
import { CreateTodoData } from '@/types/todo';

interface AddTodoFormProps {
  onAdd: (todoData: CreateTodoData) => void;
  isLoading?: boolean;
  isDarkMode?: boolean;
}

export default function AddTodoForm({ onAdd, isLoading = false, isDarkMode = false }: AddTodoFormProps) {
  const [formData, setFormData] = useState<CreateTodoData>({
    title: '',
    description: '',
    priority: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAdd(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`rounded-lg shadow-sm border p-6 transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <h2 className={`text-lg font-semibold mb-4 transition-colors duration-200 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>Add New Todo</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className={`block text-sm font-medium mb-1 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="What needs to be done?"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="description" className={`block text-sm font-medium mb-1 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="Add more details (optional)"
            rows={3}
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="priority" className={`block text-sm font-medium mb-1 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300 text-gray-900'
            }`}
            disabled={isLoading}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.title.trim()}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
    </form>
  );
} 