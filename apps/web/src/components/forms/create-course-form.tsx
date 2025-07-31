import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog';
import { useCreateCourse } from '@/services/course-service';
import { toast } from 'sonner';

interface CreateCourseFormProps {
    onSuccess?: () => void;
}

export const CreateCourseForm = ({ onSuccess }: CreateCourseFormProps) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const createCourseMutation = useCreateCourse();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('O título do curso é obrigatório.');
            return;
        }

        try {
            await createCourseMutation.mutateAsync({ title });
            toast.success('Curso criado com sucesso!');
            setTitle('');
            setOpen(false);
            onSuccess?.();
        } catch (error) {
            toast.error('Erro ao criar o curso. Tente novamente.');
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="w-full sm:w-auto">
                    Criar Novo Curso
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Criar Novo Curso</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="font-medium">Nome do Curso</Label>
                            <Input
                                id="title"
                                placeholder="Ex: Biologia Celular - Turma 101"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                autoFocus
                                className="w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={createCourseMutation.isPending || !title.trim()}
                        >
                            {createCourseMutation.isPending ? 'Criando...' : 'Criar Curso'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
