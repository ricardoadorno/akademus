import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-9xl font-bold text-muted-foreground">404</h1>
                    <h2 className="text-2xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground max-w-md">
                        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button asChild>
                        <Link to="/login">Go to Login</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link to="/app">Go to App</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
