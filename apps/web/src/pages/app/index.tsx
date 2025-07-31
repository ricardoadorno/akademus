import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export const AppPage = () => {
    const { user, logout } = useAuth();

    return (
        <div className="container mx-auto p-6">
            <div className="space-y-6">

                <div className="flex justify-end gap-4 items-center">
                    <span className="text-lg font-semibold">
                        Welcome, {user?.firstName || 'Guest'}
                    </span>
                    <Button onClick={() => logout()} variant="outline">
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};
