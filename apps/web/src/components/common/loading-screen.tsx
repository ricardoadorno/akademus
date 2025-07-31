interface LoadingScreenProps {
    message?: string;
}

export const LoadingScreen = ({ message = "Carregando..." }: LoadingScreenProps) => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">{message}</p>
        </div>
    </div>
);
