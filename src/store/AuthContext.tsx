import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { userStorage, initializeSampleData } from '@/services/storage';
import type { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing user on mount
    useEffect(() => {
        const initAuth = () => {
            const savedUser = userStorage.get();
            if (savedUser) {
                setUser(savedUser);
            }
            // Initialize sample data for new users
            initializeSampleData();
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (username: string, _password: string) => {
        // Simulate login - in offline mode, we just create/load a local user
        const existingUser = userStorage.get();
        if (existingUser) {
            setUser(existingUser);
        } else {
            const newUser = userStorage.createDefault(username, `${username}@local.app`);
            setUser(newUser);
        }
    };

    const register = async (username: string, email: string, _password: string) => {
        // Create local user
        const newUser = userStorage.createDefault(username, email);
        setUser(newUser);
    };

    const logout = async () => {
        userStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
