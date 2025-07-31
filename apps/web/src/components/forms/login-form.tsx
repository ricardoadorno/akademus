import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import type { LoginRequest } from '@/types/auth-types';
import { PATHS } from '@/lib/paths';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSwitchToRegister?: () => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: 'ricardo.castrorc1998@gmail.com',
            password: '123123',
        },
        resolver: zodResolver(loginSchema),
    });

    const handleLogin = async (data: LoginFormData) => {
        try {
            setError(null);
            const loginData: LoginRequest = {
                email: data.email,
                password: data.password,
            };
            await login(loginData);

            navigate(PATHS.app);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                    Sign in to your Cortex account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    {onSwitchToRegister && (
                        <div className="text-center mt-4">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Button
                                    variant="link"
                                    className="p-0"
                                    onClick={onSwitchToRegister}
                                >
                                    Register
                                </Button>
                            </p>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};
