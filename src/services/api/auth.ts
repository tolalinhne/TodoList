import { api, setToken, removeToken } from './client';
import type {
    ApiResponse,
    AuthToken,
    LoginRequest,
    RegisterRequest,
    UpdateUserRequest,
    User,
} from '@/types';

export const authApi = {
    /**
     * Register a new user
     */
    register: async (data: RegisterRequest): Promise<User> => {
        const response = await api.post<ApiResponse<User>>('/auth/register', data);
        return response.result;
    },

    /**
     * Login and get JWT token
     */
    login: async (data: LoginRequest): Promise<string> => {
        const response = await api.post<ApiResponse<AuthToken>>('/auth/login', data);
        const token = response.result.token;
        setToken(token);
        return token;
    },

    /**
     * Logout and invalidate token
     */
    logout: async (): Promise<void> => {
        try {
            await api.post<ApiResponse<null>>('/auth/logout');
        } finally {
            removeToken();
        }
    },

    /**
     * Get current user info
     */
    getMyInfo: async (): Promise<User> => {
        const response = await api.get<ApiResponse<User>>('/auth/myInfo');
        return response.result;
    },

    /**
     * Update current user info
     */
    updateMyInfo: async (data: UpdateUserRequest): Promise<User> => {
        const response = await api.put<ApiResponse<User>>('/auth/myInfo', data);
        return response.result;
    },
};
