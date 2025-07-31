import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import type { Prisma } from '@prisma/client';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

// Type for the user data we work with in the service
type UserData = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersRepository.create({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: hashedPassword,
    });

    return this.mapToResponseDto(user);
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user || user.deletedAt) {
      throw new NotFoundException('User not found');
    }
    return this.mapToResponseDto(user);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async findByEmailWithPassword(email: string) {
    return await this.usersRepository.findByEmailWithPassword(email);
  }

  async findAll(paginationDto: PaginationDto): Promise<UserResponseDto[]> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const users = await this.usersRepository.findMany({
      skip,
      take: limit,
    });

    return users.map((user) => this.mapToResponseDto(user));
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser || existingUser.deletedAt) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );
      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('User with this email already exists');
      }
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (updateUserDto.email) updateData.email = updateUserDto.email;
    if (updateUserDto.firstName) updateData.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) updateData.lastName = updateUserDto.lastName;
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.usersRepository.update(id, updateData);
    return this.mapToResponseDto(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user || user.deletedAt) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.softDelete(id);
  }

  private mapToResponseDto(user: UserData): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      isActive: user.isActive,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
