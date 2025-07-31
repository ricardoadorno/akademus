import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course-types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDeleteCourse } from '@/services/course-service';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import { PATHS } from '@/lib/paths';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface CourseCardProps {
    course: Course;
    onDeleted?: () => void;
}

export const CourseCard = ({ course, onDeleted }: CourseCardProps) => {
    const navigate = useNavigate();
    const deleteCourse = useDeleteCourse();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteCourse.mutateAsync(course.id);
            toast.success('Curso excluído com sucesso!');
            setIsDeleteDialogOpen(false);
            onDeleted?.();
        } catch (error) {
            toast.error('Erro ao excluir o curso. Tente novamente.');
            console.error(error);
        }
    };

    const handleViewDetails = () => {
        navigate(PATHS.courseDetail(String(course.id)));
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    <p>Criado em: {formatDate(course.createdAt)}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handleViewDetails}
                >
                    Ver Detalhes
                </Button>

                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                            Excluir
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmar exclusão</DialogTitle>
                            <DialogDescription>
                                Tem certeza que deseja excluir o curso "{course.title}"?
                                Esta ação não pode ser desfeita.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={deleteCourse.isPending}
                            >
                                {deleteCourse.isPending ? 'Excluindo...' : 'Excluir'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};
