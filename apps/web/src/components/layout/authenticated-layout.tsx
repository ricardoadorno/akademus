import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { LoadingScreen } from '@/components/common/loading-screen';
import { PATHS } from '@/lib/paths';

export const AuthenticatedLayout = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!user) {
        return <Navigate to={PATHS.login} replace />;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="py-4 border-t">
                <div className="container mx-auto text-center text-sm text-muted-foreground">
                    <p>Akademus - Plataforma para Professores © 2025</p>
                </div>
            </footer>
        </div>
    );
};
