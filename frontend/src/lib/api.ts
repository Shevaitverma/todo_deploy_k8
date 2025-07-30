import { Todo, CreateTodoData, UpdateTodoData } from '@/types/todo';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const todoApi = {
  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todos`);
    return handleResponse<Todo[]>(response);
  },

  // Get single todo
  async getTodo(id: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    return handleResponse<Todo>(response);
  },

  // Create new todo
  async createTodo(data: CreateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Todo>(response);
  },

  // Update todo
  async updateTodo(id: string, data: UpdateTodoData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Todo>(response);
  },

  // Delete todo
  async deleteTodo(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    
    // If the todo is not found (404), that's actually fine - it means it's already deleted
    if (response.status === 404) {
      return { message: 'Todo deleted successfully' };
    }
    
    return handleResponse<{ message: string }>(response);
  },

  // Toggle todo completion
  async toggleTodo(id: string): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
      method: 'PATCH',
    });
    return handleResponse<Todo>(response);
  },
}; 