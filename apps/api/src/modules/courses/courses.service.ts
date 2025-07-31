import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from '@prisma/client';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './repositories/courses.repository';
import { CourseResponseDto } from './dto/course-response.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async create(
    createCourseDto: CreateCourseDto,
    ownerId: number,
  ): Promise<CourseResponseDto> {
    const course = await this.coursesRepository.create({
      title: createCourseDto.title,
      owner: {
        connect: { id: ownerId },
      },
    });

    return this.mapToResponseDto(course);
  }

  async findAllByOwner(ownerId: number): Promise<CourseResponseDto[]> {
    const courses = await this.coursesRepository.findByOwner(ownerId);
    return courses.map((course) => this.mapToResponseDto(course));
  }

  async findOne(id: number, ownerId: number): Promise<CourseResponseDto> {
    const course = await this.coursesRepository.findByIdAndOwner(id, ownerId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.mapToResponseDto(course);
  }

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
    ownerId: number,
  ): Promise<CourseResponseDto> {
    const existingCourse = await this.coursesRepository.findByIdAndOwner(
      id,
      ownerId,
    );
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    const updatedCourse = await this.coursesRepository.update(id, {
      ...updateCourseDto,
    });

    return this.mapToResponseDto(updatedCourse);
  }

  async remove(id: number, ownerId: number): Promise<void> {
    const existingCourse = await this.coursesRepository.findByIdAndOwner(
      id,
      ownerId,
    );
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    await this.coursesRepository.softDelete(id);
  }

  private mapToResponseDto(course: Course): CourseResponseDto {
    return {
      id: course.id,
      title: course.title,
      ownerId: course.ownerId,
      isActive: course.isActive,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
  }
}
