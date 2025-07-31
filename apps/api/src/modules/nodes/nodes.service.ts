import { Injectable, NotFoundException } from '@nestjs/common';
import { NodesRepository } from './repositories/nodes.repository';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { NodeResponseDto } from './dto/node-response.dto';

@Injectable()
export class NodesService {
  constructor(private readonly nodesRepository: NodesRepository) {}

  async create(createNodeDto: CreateNodeDto): Promise<NodeResponseDto> {
    const node = await this.nodesRepository.create({
      course: {
        connect: { id: createNodeDto.courseId },
      },
      type: createNodeDto.type,
      content: createNodeDto.content,
      isFlashcard: createNodeDto.isFlashcard || false,
      isQuizItem: createNodeDto.isQuizItem || false,
    });

    return this.mapToResponseDto(node);
  }

  async findByCourseId(courseId: number): Promise<NodeResponseDto[]> {
    const nodes = await this.nodesRepository.findByCourseId(courseId);
    return nodes.map((node) => this.mapToResponseDto(node));
  }

  async findOne(id: number): Promise<NodeResponseDto> {
    const node = await this.nodesRepository.findById(id);
    if (!node) {
      throw new NotFoundException(`Node with ID ${id} not found`);
    }

    return this.mapToResponseDto(node);
  }

  async update(
    id: number,
    updateNodeDto: UpdateNodeDto,
  ): Promise<NodeResponseDto> {
    // Check if node exists
    const existingNode = await this.nodesRepository.findById(id);
    if (!existingNode) {
      throw new NotFoundException(`Node with ID ${id} not found`);
    }

    // Create a copy of the DTO and remove courseId to prevent changing the course
    const updateData: any = { ...updateNodeDto };
    if (updateData.courseId !== undefined) {
      delete updateData.courseId; // Remove courseId to prevent changing the course relationship
    }

    const updatedNode = await this.nodesRepository.update(id, updateData);
    return this.mapToResponseDto(updatedNode);
  }

  async remove(id: number): Promise<void> {
    // Check if node exists
    const existingNode = await this.nodesRepository.findById(id);
    if (!existingNode) {
      throw new NotFoundException(`Node with ID ${id} not found`);
    }

    await this.nodesRepository.softDelete(id);
  }

  private mapToResponseDto(node: any): NodeResponseDto {
    return {
      id: node.id,
      courseId: node.courseId,
      type: node.type,
      content: node.content,
      isFlashcard: node.isFlashcard,
      isQuizItem: node.isQuizItem,
      createdAt: node.createdAt,
      updatedAt: node.updatedAt,
    };
  }
}
