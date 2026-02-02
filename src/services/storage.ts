import type { Task, Category, User } from '@/types';

const STORAGE_KEYS = {
    TASKS: 'linear_tasks',
    CATEGORIES: 'linear_categories',
    USER: 'linear_user',
    NEXT_TASK_ID: 'linear_next_task_id',
    NEXT_CATEGORY_ID: 'linear_next_category_id',
};

// ============================================
// Generic Storage Helpers
// ============================================

function getItem<T>(key: string, defaultValue: T): T {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

// ============================================
// Task Storage
// ============================================

export const taskStorage = {
    getAll: (): Task[] => {
        return getItem<Task[]>(STORAGE_KEYS.TASKS, []);
    },

    getById: (id: number): Task | undefined => {
        const tasks = taskStorage.getAll();
        return tasks.find((t) => t.id === id);
    },

    create: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task => {
        const tasks = taskStorage.getAll();
        const nextId = getItem<number>(STORAGE_KEYS.NEXT_TASK_ID, 1);

        const now = new Date().toISOString();
        const newTask: Task = {
            ...data,
            id: nextId,
            createdAt: now,
            updatedAt: now,
        };

        tasks.push(newTask);
        setItem(STORAGE_KEYS.TASKS, tasks);
        setItem(STORAGE_KEYS.NEXT_TASK_ID, nextId + 1);

        return newTask;
    },

    update: (id: number, data: Partial<Task>): Task | null => {
        const tasks = taskStorage.getAll();
        const index = tasks.findIndex((t) => t.id === id);

        if (index === -1) return null;

        const updatedTask: Task = {
            ...tasks[index],
            ...data,
            updatedAt: new Date().toISOString(),
        };

        tasks[index] = updatedTask;
        setItem(STORAGE_KEYS.TASKS, tasks);

        return updatedTask;
    },

    delete: (id: number): boolean => {
        const tasks = taskStorage.getAll();
        const filtered = tasks.filter((t) => t.id !== id);

        if (filtered.length === tasks.length) return false;

        setItem(STORAGE_KEYS.TASKS, filtered);
        return true;
    },

    getByStatus: (status: Task['status']): Task[] => {
        return taskStorage.getAll().filter((t) => t.status === status);
    },

    getByCategory: (categoryId: number): Task[] => {
        return taskStorage.getAll().filter((t) => t.category?.id === categoryId);
    },
};

// ============================================
// Category Storage
// ============================================

export const categoryStorage = {
    getAll: (): Category[] => {
        return getItem<Category[]>(STORAGE_KEYS.CATEGORIES, []);
    },

    getById: (id: number): Category | undefined => {
        const categories = categoryStorage.getAll();
        return categories.find((c) => c.id === id);
    },

    create: (name: string): Category => {
        const categories = categoryStorage.getAll();
        const nextId = getItem<number>(STORAGE_KEYS.NEXT_CATEGORY_ID, 1);

        const now = new Date().toISOString();
        const newCategory: Category = {
            id: nextId,
            name,
            createdAt: now,
            updatedAt: now,
        };

        categories.push(newCategory);
        setItem(STORAGE_KEYS.CATEGORIES, categories);
        setItem(STORAGE_KEYS.NEXT_CATEGORY_ID, nextId + 1);

        return newCategory;
    },

    update: (id: number, name: string): Category | null => {
        const categories = categoryStorage.getAll();
        const index = categories.findIndex((c) => c.id === id);

        if (index === -1) return null;

        const updatedCategory: Category = {
            ...categories[index],
            name,
            updatedAt: new Date().toISOString(),
        };

        categories[index] = updatedCategory;
        setItem(STORAGE_KEYS.CATEGORIES, categories);

        return updatedCategory;
    },

    delete: (id: number): boolean => {
        const categories = categoryStorage.getAll();
        const filtered = categories.filter((c) => c.id !== id);

        if (filtered.length === categories.length) return false;

        setItem(STORAGE_KEYS.CATEGORIES, filtered);
        return true;
    },
};

// ============================================
// User Storage (for local auth simulation)
// ============================================

export const userStorage = {
    get: (): User | null => {
        return getItem<User | null>(STORAGE_KEYS.USER, null);
    },

    set: (user: User): void => {
        setItem(STORAGE_KEYS.USER, user);
    },

    clear: (): void => {
        localStorage.removeItem(STORAGE_KEYS.USER);
    },

    createDefault: (username: string, email: string): User => {
        const user: User = {
            id: 1,
            username,
            email,
            role: 'USER',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        userStorage.set(user);
        return user;
    },
};

// ============================================
// Initialize with sample data (if empty)
// ============================================

export function initializeSampleData(): void {
    // Only initialize if no data exists
    if (taskStorage.getAll().length > 0 || categoryStorage.getAll().length > 0) {
        return;
    }

    // Create sample categories
    const workCategory = categoryStorage.create('Work');
    const personalCategory = categoryStorage.create('Personal');
    categoryStorage.create('Shopping');

    // Create sample tasks
    taskStorage.create({
        title: 'Welcome to Linear Clone! 🎉',
        description: 'This is your first task. Feel free to edit or delete it.',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: null,
        category: workCategory,
        user: null,
    });

    taskStorage.create({
        title: 'Try creating a new task',
        description: 'Click the "New Issue" button in the header to create a task.',
        status: 'TODO',
        priority: 'LOW',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        category: personalCategory,
        user: null,
    });

    taskStorage.create({
        title: 'Explore the filters',
        description: 'Use the filter buttons to view tasks by status.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: null,
        category: workCategory,
        user: null,
    });
}
