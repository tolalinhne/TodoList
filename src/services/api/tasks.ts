import { api } from './client';
import type {
    ApiResponse,
    CreateTaskRequest,
    PaginatedResult,
    Task,
    UpdateTaskRequest,
} from '@/types';

export const tasksApi = {
    /**
     * Get current user's tasks (paginated)
     */
    getMyTasks: async (page = 0, size = 10): Promise<PaginatedResult<Task>> => {
        const response = await api.get<ApiResponse<PaginatedResult<Task>>>(
            `/tasks/myTasks?page=${page}&size=${size}`
        );
        return response.result;
    },

    /**
     * Get task by ID
     */
    getTask: async (id: number): Promise<Task> => {
        const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
        return response.result;
    },

    /**
     * Create a new task
     */
    createTask: async (data: CreateTaskRequest): Promise<Task> => {
        const response = await api.post<ApiResponse<Task>>('/tasks', data);
        return response.result;
    },

    /**
     * Update a task
     */
    updateTask: async (id: number, data: UpdateTaskRequest): Promise<Task> => {
        const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, data);
        return response.result;
    },

    /**
     * Delete a task
     */
    deleteTask: async (id: number): Promise<void> => {
        await api.delete(`/tasks/${id}`);
    },

    /**
     * Get tasks by category (paginated)
     */
    getTasksByCategory: async (
        categoryId: number,
        page = 0,
        size = 10
    ): Promise<PaginatedResult<Task>> => {
        const response = await api.get<ApiResponse<PaginatedResult<Task>>>(
            `/tasks/allForCategory?categoryId=${categoryId}&page=${page}&size=${size}`
        );
        return response.result;
    },

    /**
     * Assign task to user
     */
    assignTask: async (taskId: number, userId: number): Promise<Task> => {
        const response = await api.patch<ApiResponse<Task>>(
            `/tasks/${taskId}/assignTask?userId=${userId}`
        );
        return response.result;
    },

    /**
     * Unassign task from user
     */
    unassignTask: async (taskId: number, userId: number): Promise<Task> => {
        const response = await api.patch<ApiResponse<Task>>(
            `/tasks/${taskId}/unassignTask?userId=${userId}`
        );
        return response.result;
    },
};
