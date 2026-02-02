// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
    code: number | null;
    message: string | null;
    result: T;
}

export interface PaginatedResult<T> {
    content: T[];
    pageable: {
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

// ============================================
// User Types
// ============================================

export type UserRole = 'ADMIN' | 'USER';

export interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    tasks?: Task[];
}

export interface UserSummary {
    id: number;
    username: string;
    email: string;
}

// ============================================
// Task Types
// ============================================

export type TaskStatus = 'CANCELED' | 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority | null;
    dueDate: string | null;
    category: Category | null;
    user: UserSummary | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskRequest {
    title: string;
    description: string;
    dueDate?: string;
    categoryId?: number;
    priority?: TaskPriority;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    dueDate?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    categoryId?: number;
}

// ============================================
// Category Types
// ============================================

export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    tasks?: Task[];
}

export interface CreateCategoryRequest {
    name: string;
}

export interface UpdateCategoryRequest {
    name: string;
}

// ============================================
// Auth Types
// ============================================

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface AuthToken {
    token: string;
}

export interface UpdateUserRequest {
    username?: string;
    password?: string;
    email?: string;
}
