const API_BASE_URL = '/api';

// Token management
const TOKEN_KEY = 'linear_auth_token';

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

// API Error class
export class ApiError extends Error {
    constructor(
        public status: number,
        public code: number | null,
        message: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Base fetch wrapper with auth
export async function fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // Handle no content responses
    if (response.status === 204) {
        return null as T;
    }

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(
            response.status,
            data.code ?? null,
            data.message ?? 'An error occurred'
        );
    }

    return data;
}

// Helper methods
export const api = {
    get: <T>(endpoint: string) =>
        fetchWithAuth<T>(endpoint, { method: 'GET' }),

    post: <T>(endpoint: string, body?: unknown) =>
        fetchWithAuth<T>(endpoint, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        }),

    put: <T>(endpoint: string, body?: unknown) =>
        fetchWithAuth<T>(endpoint, {
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        }),

    patch: <T>(endpoint: string, body?: unknown) =>
        fetchWithAuth<T>(endpoint, {
            method: 'PATCH',
            body: body ? JSON.stringify(body) : undefined,
        }),

    delete: <T>(endpoint: string) =>
        fetchWithAuth<T>(endpoint, { method: 'DELETE' }),
};
