import type { ReactNode } from 'react';
import { QueryProvider } from './query-provider';
import { AuthProvider } from './auth-provider';
import { Toaster } from '@/components/ui/sonner';

interface ProvidersProps {
    children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <QueryProvider>
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </QueryProvider>
    );
};
