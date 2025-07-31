import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseResponseDto } from './dto/course-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('courses')
@ApiTags('Courses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiCreatedResponse({
    description: 'Course created successfully',
    type: CourseResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @CurrentUser('id') userId: number,
  ): Promise<CourseResponseDto> {
    return this.coursesService.create(createCourseDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses for the current user' })
  @ApiOkResponse({
    description: 'Courses retrieved successfully',
    type: [CourseResponseDto],
  })
  async findAll(
    @CurrentUser('id') userId: number,
  ): Promise<CourseResponseDto[]> {
    return this.coursesService.findAllByOwner(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiOkResponse({
    description: 'Course retrieved successfully',
    type: CourseResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ): Promise<CourseResponseDto> {
    return this.coursesService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update course by ID' })
  @ApiOkResponse({
    description: 'Course updated successfully',
    type: CourseResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Course not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
    @CurrentUser('id') userId: number,
  ): Promise<CourseResponseDto> {
    return this.coursesService.update(id, updateCourseDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course by ID' })
  @ApiNoContentResponse({ description: 'Course deleted successfully' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ): Promise<void> {
    return this.coursesService.remove(id, userId);
  }
}
