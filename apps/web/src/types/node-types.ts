export enum NodeType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export interface Node {
  id: number;
  courseId: number;
  type: NodeType;
  content: string;
  isFlashcard: boolean;
  isQuizItem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNodeRequest {
  courseId: number;
  type?: NodeType;
  content: string;
  isFlashcard?: boolean;
  isQuizItem?: boolean;
}

export interface UpdateNodeRequest {
  type?: NodeType;
  content?: string;
  isFlashcard?: boolean;
  isQuizItem?: boolean;
}

export interface NodeResponse {
  id: number;
  courseId: number;
  type: NodeType;
  content: string;
  isFlashcard: boolean;
  isQuizItem: boolean;
  createdAt: string;
  updatedAt: string;
}
