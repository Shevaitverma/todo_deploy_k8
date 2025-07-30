'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoData, UpdateTodoData } from '@/types/todo';
import { todoApi } from '@/lib/api';

interface UseTodosReturn {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (data: CreateTodoData) => Promise<void>;
  updateTodo: (id: string, data: UpdateTodoData) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch todos';
      setError(errorMessage);
      console.error('Error fetching todos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (data: CreateTodoData) => {
    try {
      setError(null);
      const newTodo = await todoApi.createTodo(data);
      setTodos(prev => [newTodo, ...prev]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add todo';
      setError(errorMessage);
      console.error('Error adding todo:', err);
      throw err;
    }
  }, []);

  const updateTodo = useCallback(async (id: string, data: UpdateTodoData) => {
    try {
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, data);
      setTodos(prev => prev.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update todo';
      setError(errorMessage);
      console.error('Error updating todo:', err);
      throw err;
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      console.log(`[DELETE] Attempting to delete todo with ID: ${id}`);
      await todoApi.deleteTodo(id);
      console.log(`[DELETE] Successfully deleted todo with ID: ${id}`);
      setTodos(prev => {
        const filtered = prev.filter(todo => todo._id !== id);
        console.log(`[DELETE] Updated todos list, removed todo ${id}, remaining: ${filtered.length}`);
        return filtered;
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete todo';
      setError(errorMessage);
      console.error('Error deleting todo:', err);
      // Don't throw the error - just log it and continue
      // The todo will be removed from the UI anyway
    }
  }, []);

  const toggleTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      const updatedTodo = await todoApi.toggleTodo(id);
      setTodos(prev => prev.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle todo';
      setError(errorMessage);
      console.error('Error toggling todo:', err);
      throw err;
    }
  }, []);

  const refreshTodos = useCallback(async () => {
    setIsLoading(true);
    await fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refreshTodos,
  };
} 