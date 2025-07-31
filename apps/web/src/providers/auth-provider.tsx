import { useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { authService } from '@/services/auth-service';
import { AuthContext } from '@/contexts/auth-context';
import type { User, AuthContextType, LoginRequest, RegisterRequest } from '@/types/auth-types';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const initializeAuth = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (token) {
                // Validate token and get user info
                const userData = await authService.getCurrentUser();
                setUser(userData);
            }
        } catch (error) {
            console.error('Auth initialization failed:', error);
            localStorage.removeItem('auth_token');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    const login = async (credentials: LoginRequest) => {
        try {
            setIsLoading(true);
            const response = await authService.login(credentials);
            setUser(response.user);
            localStorage.setItem('auth_token', response.token);
            toast.success('Successfully logged in!');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: RegisterRequest) => {
        try {
            setIsLoading(true);
            const response = await authService.register(userData);
            setUser(response.user);
            localStorage.setItem('auth_token', response.token);
            toast.success('Account created successfully!');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            localStorage.removeItem('auth_token');
            toast.success('Successfully logged out!');
        } catch (error) {
            console.error('Logout error:', error);
            // Even if logout fails on server, clear local state
            setUser(null);
            localStorage.removeItem('auth_token');
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
