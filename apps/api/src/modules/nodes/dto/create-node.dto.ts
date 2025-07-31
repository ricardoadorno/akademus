import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

enum NodeType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export class CreateNodeDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the course this node belongs to',
  })
  @Type(() => Number)
  @IsInt({ message: 'Course ID must be an integer' })
  @IsPositive({ message: 'Course ID must be a positive integer' })
  @IsNotEmpty({ message: 'Course ID is required' })
  courseId: number;

  @ApiProperty({
    enum: NodeType,
    example: 'TEXT',
    description: 'Type of node (TEXT, IMAGE, VIDEO, AUDIO)',
    default: 'TEXT',
  })
  @IsEnum(NodeType, {
    message: 'Type must be one of: TEXT, IMAGE, VIDEO, AUDIO',
  })
  @IsOptional()
  type?: NodeType = NodeType.TEXT;

  @ApiProperty({
    example: 'This is the content of the node',
    description: 'Content of the node',
  })
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  @MaxLength(10000, { message: 'Content must not exceed 10000 characters' })
  @Transform(({ value }) => value?.trim())
  content: string;

  @ApiProperty({
    example: false,
    description: 'Whether this node is a flashcard',
    default: false,
  })
  @IsBoolean({ message: 'isFlashcard must be a boolean' })
  @IsOptional()
  isFlashcard?: boolean = false;

  @ApiProperty({
    example: false,
    description: 'Whether this node is a quiz item',
    default: false,
  })
  @IsBoolean({ message: 'isQuizItem must be a boolean' })
  @IsOptional()
  isQuizItem?: boolean = false;
}
