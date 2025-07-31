import { Node } from '@/types/node-types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface NodeItemProps {
    node: Node;
}

export const NodeItem = ({ node }: NodeItemProps) => {
    return (
        <Card className="w-full">
            <CardHeader className="p-4 bg-muted/50 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {node.type}
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
                <div className="whitespace-pre-wrap">{node.content}</div>
            </CardContent>
        </Card>
    );
};

interface NodeListProps {
    nodes: Node[];
    isLoading: boolean;
}

export const NodeList = ({ nodes, isLoading }: NodeListProps) => {
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
                <NodeItem key={node.id} node={node} />
            ))}
        </div>
    );
};
