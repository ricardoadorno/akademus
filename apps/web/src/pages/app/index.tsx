import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/lib/paths';
import { LoadingScreen } from '@/components/common/loading-screen';

export const AppPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redireciona para o dashboard
        navigate(PATHS.dashboard);
    }, [navigate]);

    return <LoadingScreen message="Redirecionando..." />;
};
