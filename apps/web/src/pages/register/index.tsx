import { RegistrationForm } from '@/components/forms/registration-form';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Create an account</h1>
                    <p className="text-muted-foreground">
                        Sign up to get started with your account
                    </p>
                </div>

                <RegistrationForm />

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link
                            to="/"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
