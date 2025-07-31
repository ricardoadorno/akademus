import { createBrowserRouter } from 'react-router-dom';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { PublicLayout } from '@/components/layout/public-layout';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { AppPage } from '@/pages/app';
import { NotFoundPage } from '@/pages/not-found';
import { PATHS } from './lib/paths';


export const router = createBrowserRouter([
    {
        path: PATHS.login,
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
        ],
    },
    {
        path: PATHS.register,
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: PATHS.app,
        element: <AuthenticatedLayout />,
        children: [
            {
                index: true,
                element: <AppPage />,
            },
            // You can add more app sub-routes here
            // {
            //     path: "profile",
            //     id: "profile",
            //     element: <ProfilePage />,
            // },
            // {
            //     path: "settings",
            //     id: "settings",
            //     element: <SettingsPage />,
            // },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
],
);
