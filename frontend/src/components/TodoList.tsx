'use client';

import { useState, useMemo } from 'react';
import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  isDarkMode?: boolean;
}

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'created' | 'priority' | 'title';

export default function TodoList({ todos, onUpdate, onDelete, isLoading = false, isDarkMode = false }: TodoListProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos;

    // Apply filter
    switch (filter) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        filtered = todos;
    }

    // Apply sorting
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    
    switch (sortBy) {
      case 'priority':
        return filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'created':
      default:
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [todos, filter, sortBy]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }, [todos]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`rounded-lg shadow-sm border p-4 animate-pulse transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded ${
                isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}></div>
              <div className="flex-1 space-y-2">
                <div className={`h-4 rounded w-3/4 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}></div>
                <div className={`h-3 rounded w-1/2 ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className={`rounded-lg shadow-sm border p-4 transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Your Todos</h2>
          <div className={`flex items-center gap-4 text-sm transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span>Total: {stats.total}</span>
            <span>Active: {stats.active}</span>
            <span>Completed: {stats.completed}</span>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className={`text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className={`px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className={`text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className={`px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`}
            >
              <option value="created">Date Created</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Todo List */}
      {filteredAndSortedTodos.length === 0 ? (
        <div className={`rounded-lg shadow-sm border p-8 text-center transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className={`text-lg font-medium mb-2 transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {filter === 'all' ? 'No todos yet' : `No ${filter} todos`}
          </h3>
          <p className={`transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {filter === 'all' 
              ? 'Get started by adding your first todo!' 
              : `No ${filter} todos found. Try changing the filter.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
} 