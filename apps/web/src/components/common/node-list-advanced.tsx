import { useState } from 'react';
import { Node, NodeType } from '@/types/node-types';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDeleteNode, useUpdateNode } from '@/services/node-service';
import { formatDate } from '@/lib/utils';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface NodeItemAdvancedProps {
    node: Node;
    onUpdated?: () => void;
    onDeleted?: () => void;
}

export const NodeItemAdvanced = ({ node, onUpdated, onDeleted }: NodeItemAdvancedProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(node.content);
    const [isFlashcard, setIsFlashcard] = useState(node.isFlashcard);
    const [isQuizItem, setIsQuizItem] = useState(node.isQuizItem);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const updateNode = useUpdateNode();
    const deleteNode = useDeleteNode();

    const handleSaveEdit = async () => {
        try {
            await updateNode.mutateAsync({
                id: node.id,
                data: {
                    content: editedContent,
                    isFlashcard,
                    isQuizItem
                },
            });
            setIsEditing(false);
            toast.success('Nó atualizado com sucesso!');
            onUpdated?.();
        } catch (error) {
            toast.error('Erro ao atualizar o nó. Tente novamente.');
            console.error(error);
        }
    };

    const handleCancelEdit = () => {
        setEditedContent(node.content);
        setIsFlashcard(node.isFlashcard);
        setIsQuizItem(node.isQuizItem);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        try {
            await deleteNode.mutateAsync(node.id);
            setIsDeleteDialogOpen(false);
            toast.success('Nó excluído com sucesso!');
            onDeleted?.();
        } catch (error) {
            toast.error('Erro ao excluir o nó. Tente novamente.');
            console.error(error);
        }
    };

    const getNodeTypeLabel = (type: NodeType) => {
        switch (type) {
            case NodeType.TEXT:
                return 'Texto';
            case NodeType.IMAGE:
                return 'Imagem';
            case NodeType.VIDEO:
                return 'Vídeo';
            case NodeType.AUDIO:
                return 'Áudio';
            default:
                return 'Desconhecido';
        }
    };

    return (
        <Card className="w-full hover:shadow-md transition-shadow">
            <CardHeader className="p-4 bg-muted/30 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {getNodeTypeLabel(node.type)}
                    </span>
                    {node.isFlashcard && (
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">
                            Flashcard
                        </span>
                    )}
                    {node.isQuizItem && (
                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded">
                            Quiz
                        </span>
                    )}
                </div>
                <span className="text-xs text-muted-foreground">
                    {formatDate(node.createdAt)}
                </span>
            </CardHeader>

            <CardContent className="p-4">
                {isEditing ? (
                    <div className="space-y-4">
                        <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full min-h-[150px]"
                        />

                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={isFlashcard}
                                    onCheckedChange={(checked) => setIsFlashcard(!!checked)}
                                    id="isFlashcard"
                                />
                                <label
                                    htmlFor="isFlashcard"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    É um flashcard
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={isQuizItem}
                                    onCheckedChange={(checked) => setIsQuizItem(!!checked)}
                                    id="isQuizItem"
                                />
                                <label
                                    htmlFor="isQuizItem"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    É um item de quiz
                                </label>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="whitespace-pre-wrap">{node.content}</div>
                )}
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-end space-x-2">
                {isEditing ? (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={updateNode.isPending}
                        >
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleSaveEdit}
                            disabled={updateNode.isPending}
                        >
                            <Check className="h-4 w-4 mr-1" />
                            {updateNode.isPending ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                        >
                            <Pencil className="h-4 w-4 mr-1" />
                            Editar
                        </Button>

                        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Excluir
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Confirmar exclusão</DialogTitle>
                                    <DialogDescription>
                                        Tem certeza que deseja excluir este nó de conhecimento?
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
                                        disabled={deleteNode.isPending}
                                    >
                                        {deleteNode.isPending ? 'Excluindo...' : 'Excluir'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </CardFooter>
        </Card>
    );
};

interface NodeListAdvancedProps {
    nodes: Node[];
    isLoading: boolean;
    onNodeUpdated?: () => void;
    onNodeDeleted?: () => void;
}

export const NodeListAdvanced = ({
    nodes,
    isLoading,
    onNodeUpdated,
    onNodeDeleted
}: NodeListAdvancedProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-pulse text-center">
                    <p className="text-lg text-muted-foreground">Carregando nós...</p>
                </div>
            </div>
        );
    }

    if (nodes.length === 0) {
        return (
            <div className="text-center py-8 border rounded-lg bg-muted/30">
                <p className="text-lg text-muted-foreground">
                    Este curso ainda não possui nós de conhecimento.
                </p>
                <p className="text-muted-foreground">
                    Adicione seu primeiro nó usando o botão acima.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {nodes.map((node) => (
                <NodeItemAdvanced
                    key={node.id}
                    node={node}
                    onUpdated={onNodeUpdated}
                    onDeleted={onNodeDeleted}
                />
            ))}
        </div>
    );
};
