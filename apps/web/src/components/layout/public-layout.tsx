import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { LoadingScreen } from '@/components/common/loading-screen';

export const PublicLayout = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (user) {
        return <Navigate to="/app" replace />;
    } return (
        <div className="min-h-screen bg-background">
            <Outlet />
        </div>
    );
};
