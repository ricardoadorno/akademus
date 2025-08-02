import { useState } from 'react';
import { useForm, Control } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useCreateNode } from '@/services/node-service';
import { toast } from 'sonner';
import { NodeType } from '@/types/node-types';
import { Checkbox } from '@/components/ui/checkbox';

interface CreateNodeFormProps {
    courseId: number;
    onSuccess?: () => void;
}

// Define o tipo para o formulário
type FormValues = {
    content: string;
    isFlashcard?: boolean;
    isQuizItem?: boolean;
};

const formSchema = z.object({
    content: z
        .string()
        .min(5, { message: 'O conteúdo deve ter pelo menos 5 caracteres' })
        .max(10000, { message: 'O conteúdo não deve exceder 10000 caracteres' }),
    isFlashcard: z.boolean().default(false),
    isQuizItem: z.boolean().default(false),
});

export const CreateNodeForm = ({ courseId, onSuccess }: CreateNodeFormProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const createNode = useCreateNode();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
            isFlashcard: false,
            isQuizItem: false,
        },
    });

    const handleSubmit = async (values: FormValues) => {
        try {
            await createNode.mutateAsync({
                courseId,
                type: NodeType.TEXT, // For MVP, only text is supported
                content: values.content,
                isFlashcard: values.isFlashcard,
                isQuizItem: values.isQuizItem,
            });

            toast.success('Nó de conhecimento criado com sucesso!');
            form.reset();
            setIsDialogOpen(false);
            onSuccess?.();
        } catch (error) {
            toast.error('Erro ao criar o nó de conhecimento. Tente novamente.');
            console.error(error);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>Adicionar Nó</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Nó de Conhecimento</DialogTitle>
                    <DialogDescription>
                        Crie um novo nó de conhecimento para o seu curso. Para o MVP, apenas texto é suportado.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control as Control<FormValues>}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Conteúdo</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Digite o conteúdo do nó de conhecimento aqui..."
                                            className="min-h-[150px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control as Control<FormValues>}
                                name="isFlashcard"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>É um flashcard</FormLabel>
                                            <p className="text-sm text-muted-foreground">
                                                Marque esta opção se este nó deve ser usado como flashcard para revisão.
                                            </p>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control as Control<FormValues>}
                                name="isQuizItem"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>É um item de quiz</FormLabel>
                                            <p className="text-sm text-muted-foreground">
                                                Marque esta opção se este nó deve ser usado como item de quiz.
                                            </p>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={createNode.isPending}>
                                {createNode.isPending ? 'Criando...' : 'Criar Nó'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
