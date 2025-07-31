import { useState } from 'react';
import { LoginForm } from '@/components/forms/login-form';
import { RegistrationForm } from '@/components/forms/registration-form';

type AuthMode = 'login' | 'register';

export const AuthPage = () => {
    const [mode, setMode] = useState<AuthMode>('login');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {mode === 'login' ? (
                    <LoginForm onSwitchToRegister={() => setMode('register')} />
                ) : (
                    <RegistrationForm onSwitchToLogin={() => setMode('login')} />
                )}
            </div>
        </div>
    );
};
