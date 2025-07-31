import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any): Promise<any> {
    return this.prisma.node.create({
      data,
    });
  }

  async findById(id: number): Promise<any | null> {
    return this.prisma.node.findUnique({
      where: { id },
    });
  }

  async findByCourseId(courseId: number): Promise<any[]> {
    return this.prisma.node.findMany({
      where: {
        courseId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: number, data: any): Promise<any> {
    return this.prisma.node.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.prisma.node.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }
}
