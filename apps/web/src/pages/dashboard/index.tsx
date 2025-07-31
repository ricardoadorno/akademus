import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useCourses } from '@/services/course-service';
import { CreateCourseForm } from '@/components/forms/create-course-form';
import { CourseList } from '@/components/common/course-list';
import { Course } from '@/types/course-types';
import { Button } from '@/components/ui/button';

export const DashboardPage = () => {
    const { user, logout } = useAuth();
    const { data: courses = [], isLoading, refetch } = useCourses();
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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

    const handleCourseSelected = (course: Course) => {
        setSelectedCourse(course);
        // No futuro, navegaremos para a página do curso
        // navigate(`/app/courses/${course.id}`);
    };

    const handleBackToList = () => {
        setSelectedCourse(null);
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
                    {selectedCourse ? (
                        <div className="space-y-6">
                            <Button variant="outline" onClick={handleBackToList}>
                                Voltar para Lista de Cursos
                            </Button>

                            <div className="bg-card p-6 rounded-lg shadow">
                                <h2 className="text-2xl font-bold mb-4">{selectedCourse.title}</h2>
                                <p className="text-muted-foreground mb-6">
                                    Este curso ainda não possui nós de conhecimento.
                                    Adicione seu primeiro nó no conteúdo abaixo.
                                </p>

                                {/* Aqui será implementado o conteúdo dos nós na próxima user story */}
                                <div className="p-8 border border-dashed rounded-lg text-center">
                                    <p className="text-muted-foreground mb-4">
                                        A criação de nós de conhecimento será implementada na próxima sprint.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8 flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Meus Cursos</h2>
                                <CreateCourseForm onSuccess={handleCourseCreated} />
                            </div>

                            <CourseList
                                courses={courses}
                                isLoading={isLoading}
                                onCourseSelected={handleCourseSelected}
                                onCourseDeleted={handleCourseDeleted}
                            />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};
