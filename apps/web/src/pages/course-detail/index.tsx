import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourse } from '@/services/course-service';
import { useNodesByCourseId } from '@/services/node-service';
import { CreateNodeForm } from '@/components/forms/create-node-form';
import { NodeListAdvanced } from '@/components/common/node-list-advanced';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/lib/paths';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const CourseDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const courseId = parseInt(id || '0');

    const {
        data: course,
        isLoading: isLoadingCourse,
        isError: isCourseError
    } = useCourse(courseId);

    const {
        data: nodes = [],
        isLoading: isLoadingNodes,
        refetch: refetchNodes
    } = useNodesByCourseId(courseId);

    const handleBackToDashboard = () => {
        navigate(PATHS.dashboard);
    };

    const handleNodeCreated = () => {
        refetchNodes();
    };

    // Mostrar estado de carregamento
    if (isLoadingCourse) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBackToDashboard}
                        className="mr-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                    <Skeleton className="h-8 w-1/3" />
                </div>

                <div className="bg-card p-6 rounded-lg shadow">
                    <Skeleton className="h-8 w-1/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-8" />

                    <div className="space-y-4">
                        {Array(3).fill(null).map((_, i) => (
                            <Skeleton key={i} className="h-32 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Mostrar erro caso ocorra
    if (isCourseError || !course) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBackToDashboard}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                </div>

                <div className="bg-card p-6 rounded-lg shadow text-center">
                    <h2 className="text-xl font-medium mb-2">Erro ao carregar curso</h2>
                    <p className="text-muted-foreground mb-4">
                        Não foi possível carregar as informações do curso. Tente novamente mais tarde.
                    </p>
                    <Button onClick={handleBackToDashboard}>
                        Voltar para Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBackToDashboard}
                        className="mr-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Nós de Conhecimento</h2>
                    <CreateNodeForm
                        courseId={course.id}
                        onSuccess={handleNodeCreated}
                    />
                </div>

                <NodeListAdvanced
                    nodes={nodes}
                    isLoading={isLoadingNodes}
                    onNodeUpdated={handleNodeCreated}
                    onNodeDeleted={handleNodeCreated}
                />
            </div>
        </div>
    );
};
