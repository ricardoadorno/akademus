import { Injectable } from '@nestjs/common';
import { Prisma, Course } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    return await this.prisma.course.create({
      data,
      select: {
        id: true,
        title: true,
        ownerId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async findById(id: number): Promise<Course | null> {
    return await this.prisma.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        ownerId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async findByOwner(
    ownerId: number,
    params?: {
      skip?: number;
      take?: number;
      where?: Prisma.CourseWhereInput;
      orderBy?: Prisma.CourseOrderByWithRelationInput;
    },
  ): Promise<Course[]> {
    const { skip, take, where, orderBy } = params || {};

    return await this.prisma.course.findMany({
      skip,
      take,
      where: {
        ownerId,
        deletedAt: null,
        isActive: true,
        ...where,
      },
      orderBy: orderBy || { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        ownerId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async update(id: number, data: Prisma.CourseUpdateInput): Promise<Course> {
    return await this.prisma.course.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        title: true,
        ownerId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.prisma.course.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }

  async findByIdAndOwner(id: number, ownerId: number): Promise<Course | null> {
    return await this.prisma.course.findFirst({
      where: {
        id,
        ownerId,
        deletedAt: null,
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        ownerId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }
}
