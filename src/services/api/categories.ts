import { api } from './client';
import type {
    ApiResponse,
    Category,
    CreateCategoryRequest,
    PaginatedResult,
    UpdateCategoryRequest,
} from '@/types';

export const categoriesApi = {
    /**
     * Get all categories (paginated)
     */
    getAllCategories: async (page = 0, size = 50): Promise<PaginatedResult<Category>> => {
        const response = await api.get<ApiResponse<PaginatedResult<Category>>>(
            `/categories/all?page=${page}&size=${size}`
        );
        return response.result;
    },

    /**
     * Get category by ID
     */
    getCategory: async (id: number): Promise<Category> => {
        const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
        return response.result;
    },

    /**
     * Create a new category
     */
    createCategory: async (data: CreateCategoryRequest): Promise<Category> => {
        const response = await api.post<ApiResponse<Category>>('/categories', data);
        return response.result;
    },

    /**
     * Update a category
     */
    updateCategory: async (id: number, data: UpdateCategoryRequest): Promise<Category> => {
        const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, data);
        return response.result;
    },

    /**
     * Delete a category
     */
    deleteCategory: async (id: number): Promise<void> => {
        await api.delete(`/categories/${id}`);
    },
};
