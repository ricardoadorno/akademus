import { ApiProperty } from '@nestjs/swagger';

enum NodeType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export class NodeResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the node',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the course this node belongs to',
  })
  courseId: number;

  @ApiProperty({
    enum: NodeType,
    example: 'TEXT',
    description: 'Type of node (TEXT, IMAGE, VIDEO, AUDIO)',
  })
  type: string;

  @ApiProperty({
    example: 'This is the content of the node',
    description: 'Content of the node',
  })
  content: string;

  @ApiProperty({
    example: false,
    description: 'Whether this node is a flashcard',
  })
  isFlashcard: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether this node is a quiz item',
  })
  isQuizItem: boolean;

  @ApiProperty({
    example: '2025-07-31T21:00:00.000Z',
    description: 'Timestamp of when the node was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-07-31T21:00:00.000Z',
    description: 'Timestamp of when the node was last updated',
  })
  updatedAt: Date;
}
