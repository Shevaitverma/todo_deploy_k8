'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import ErrorBoundary from '@/components/ErrorBoundary';
import { CreateTodoData, Todo } from '@/types/todo';

export default function HomePage() {
  const { todos, isLoading, error: _error, addTodo, updateTodo, deleteTodo, refreshTodos } = useTodos();
  const [isAdding, setIsAdding] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleAddTodo = async (data: CreateTodoData) => {
    try {
      setIsAdding(true);
      await addTodo(data);
    } catch (error) {
      // Error is handled by the hook
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    updateTodo(updatedTodo._id, {
      title: updatedTodo.title,
      description: updatedTodo.description,
      completed: updatedTodo.completed,
      priority: updatedTodo.priority,
    });
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className={`transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 shadow-lg border-gray-700' : 'bg-white shadow-sm border-gray-200'} border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className={`text-xl font-bold transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Todo App</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={refreshTodos}
                  disabled={isLoading}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 disabled:opacity-50 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  title="Refresh todos"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Todo Form */}
            <div className="lg:col-span-1">
              <AddTodoForm onAdd={handleAddTodo} isLoading={isAdding} isDarkMode={isDarkMode} />
            </div>

            {/* Todo List */}
            <div className="lg:col-span-2">
              {_error && (
                <div className={`mb-6 rounded-lg p-4 transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-red-900/20 border border-red-800' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium transition-colors duration-200 ${
                        isDarkMode ? 'text-red-300' : 'text-red-800'
                      }`}>Error</h3>
                      <p className={`text-sm mt-1 transition-colors duration-200 ${
                        isDarkMode ? 'text-red-400' : 'text-red-700'
                      }`}>{_error}</p>
                    </div>
                  </div>
                </div>
              )}

              <TodoList
                todos={todos}
                onUpdate={handleUpdateTodo}
                onDelete={deleteTodo}
                isLoading={isLoading}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`border-t mt-16 transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`text-center text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
              <p className="mt-1">Connected to your Express.js + MongoDB backend</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
