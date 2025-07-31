import { useAuth } from '@/hooks/use-auth';
import { useCourses } from '@/services/course-service';
import { CreateCourseForm } from '@/components/forms/create-course-form';
import { CourseList } from '@/components/common/course-list';
import { Button } from '@/components/ui/button';

export const DashboardPage = () => {
    const { user, logout } = useAuth();
    const { data: courses = [], isLoading, refetch } = useCourses();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleCourseCreated = () => {
        refetch();
    };

    const handleCourseDeleted = () => {
        refetch();
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="bg-background border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <h1 className="text-3xl font-bold">Akademus</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm">
                                Bem-vindo(a), {user?.firstName || 'Professor(a)'}
                            </span>
                            <Button onClick={handleLogout} variant="outline">
                                Sair
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-8 flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Meus Cursos</h2>
                        <CreateCourseForm onSuccess={handleCourseCreated} />
                    </div>

                    <CourseList
                        courses={courses}
                        isLoading={isLoading}
                        onCourseDeleted={handleCourseDeleted}
                    />
                </div>
            </main>
        </div>
    );
};
