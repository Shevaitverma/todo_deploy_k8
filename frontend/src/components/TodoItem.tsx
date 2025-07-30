'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { todoApi } from '@/lib/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
  isDarkMode?: boolean;
}

const getPriorityColors = (isDarkMode: boolean) => ({
  low: isDarkMode 
    ? 'bg-green-900/30 text-green-300 border-green-700' 
    : 'bg-green-100 text-green-800 border-green-200',
  medium: isDarkMode 
    ? 'bg-yellow-900/30 text-yellow-300 border-yellow-700' 
    : 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: isDarkMode 
    ? 'bg-red-900/30 text-red-300 border-red-700' 
    : 'bg-red-100 text-red-800 border-red-200',
});

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export default function TodoItem({ todo, onUpdate, onDelete, isDarkMode = false }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
  });

  // Reset edit data when todo changes
  useEffect(() => {
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
    });
  }, [todo._id, todo.title, todo.description, todo.priority]);

  // Cleanup effect to prevent stale state
  useEffect(() => {
    return () => {
      setIsEditing(false);
      setIsLoading(false);
    };
  }, []);

  const handleToggle = async () => {
    try {
      setIsLoading(true);
      const updatedTodo = await todoApi.toggleTodo(todo._id);
      onUpdate(updatedTodo);
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const updatedTodo = await todoApi.updateTodo(todo._id, editData);
      onUpdate(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      setIsLoading(true);
      await todoApi.deleteTodo(todo._id);
      onDelete(todo._id);
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Even if the API call fails, remove from UI to prevent further issues
      onDelete(todo._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`rounded-lg shadow-sm border p-4 space-y-3 transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          placeholder="Todo title"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          placeholder="Description (optional)"
          rows={2}
        />
        <select
          value={editData.priority}
          onChange={(e) => setEditData({ ...editData, priority: e.target.value as 'low' | 'medium' | 'high' })}
          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'border-gray-300 text-gray-900'
          }`}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isLoading || !editData.title.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md disabled:opacity-50 transition-colors ${
              isDarkMode 
                ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg shadow-sm border p-4 transition-all duration-200 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-0.5 transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          } disabled:opacity-50`}
        >
          {todo.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium transition-colors duration-200 ${
            isDarkMode 
              ? todo.completed ? 'line-through text-gray-400' : 'text-white'
              : todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm mt-1 transition-colors duration-200 ${
              isDarkMode 
                ? todo.completed ? 'line-through text-gray-500' : 'text-gray-300'
                : todo.completed ? 'line-through text-gray-500' : 'text-gray-600'
            }`}>
              {todo.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColors(isDarkMode)[todo.priority]}`}>
              {priorityLabels[todo.priority]}
            </span>
            <span className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors disabled:opacity-50"
            title="Edit todo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
            title="Delete todo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 