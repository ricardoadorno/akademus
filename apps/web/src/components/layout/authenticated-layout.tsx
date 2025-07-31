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
        <div className="min-h-screen bg-background">
            <main>
                <Outlet />
            </main>
        </div>
    );
};
