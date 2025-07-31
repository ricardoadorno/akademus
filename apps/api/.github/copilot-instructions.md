# GitHub Copilot Instructions for NestJS Backend Project

## Project Overview

This is a NestJS backend application using Prisma ORM with TypeScript. Follow these patterns and conventions consistently.

## Architecture Patterns

### Resource Structure (NestJS CLI Pattern)

```
src/
├── modules/
│   └── [resource]/
│       ├── dto/
│       │   ├── create-[resource].dto.ts
│       │   ├── update-[resource].dto.ts
│       │   └── [resource]-response.dto.ts
│       ├── entities/
│       │   └── [resource].entity.ts
│       ├── repositories/
│       │   └── [resource].repository.ts
│       ├── [resource].controller.ts
│       ├── [resource].service.ts
│       └── [resource].module.ts
├── common/
├── config/
├── database/
└── auth/
```

## Core Patterns

### Controllers

- Use `@ApiTags()`, `@ApiBearerAuth()` for Swagger
- Apply proper HTTP status codes with `@HttpCode()`
- Add OpenAPI decorators: `@ApiOperation()`, `@ApiResponse()`, `@ApiCreatedResponse()`, `@ApiOkResponse()`, `@ApiNotFoundResponse()`, `@ApiBadRequestResponse()`

```typescript
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
```

### Repositories

- Abstract database operations
- Inject Prisma service in repositories, not services
- Services depend on repositories, not directly on Prisma
- Use interfaces for repository contracts when needed
- Keep business logic in services, data access in repositories

```typescript
@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        firstName: true, // Prisma converts first_name to firstName
        lastName: true, // Prisma converts last_name to lastName
        phoneNumber: true, // Prisma converts phone_number to phoneNumber
        isActive: true, // Prisma converts is_active to isActive
        status: true,
        avatarUrl: true, // Prisma converts avatar_url to avatarUrl
        createdAt: true, // Prisma converts created_at to createdAt
        updatedAt: true, // Prisma converts updated_at to updatedAt
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        posts: {
          where: {
            deletedAt: null,
            isPublished: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async findActiveUsers(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      where: {
        deletedAt: null,
        isActive: true,
        ...where,
      },
      orderBy: orderBy || { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
  }
}
```

### Services

- Inject repositories, handle business logic
- Implement proper error handling with NestJS exceptions
- Use async/await for asynchronous operations
- Validate data and handle transformations
- Manage transactions when multiple repository calls are involved

```typescript
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
```

### DTOs

- Use `class-validator` with comprehensive validation
- Add OpenAPI decorators for documentation
- Use `PartialType()` for update DTOs
- Exclude sensitive fields in response DTOs
- Use `@Transform()` for data transformation
- Implement custom validators when needed

```typescript
export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @ApiProperty({ example: 'John', minLength: 2, maxLength: 50 })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @ApiProperty({ example: 'Doe', minLength: 2, maxLength: 50 })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @ApiProperty({ minLength: 8, maxLength: 50 })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password must not exceed 50 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain lowercase, uppercase, and number',
  })
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: '+1234567890', required: false })
  phone?: string;

  @ApiProperty({ example: 25, required: false })
  age?: number;

  @ApiProperty({ example: 'ACTIVE' })
  status: string;

  @ApiProperty({ example: ['USER'] })
  roles: string[];

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  avatarUrl?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

export class PaginationDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Page number (starts from 1)',
    required: false,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @ApiProperty({
    example: 10,
    minimum: 1,
    maximum: 100,
    description: 'Number of items per page',
    required: false,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit must not exceed 100' })
  limit?: number = 10;
}
```

## Database Patterns

### Naming Conventions

- **Primary Keys**: Use `@id @default(autoincrement())` for integer IDs
- **Column Naming**: Use camelCase for Prisma models, snake_case for database columns
- **Model Naming**: Use PascalCase for Prisma models
- **Table Naming**: Use snake_case with `@@map()` directive
- **Foreign Keys**: Always suffix with `_id`
- **Boolean Fields**: Prefix with `is_`, `has_`, `can_`
- **Timestamps**: Include `created_at` and `updated_at` on all entities
- **Soft Deletes**: Use `deleted_at` timestamp, not boolean flags
- **Indexes**: Add `@@index()` for frequently queried fields
- **Enums**: Define as Prisma enums with SCREAMING_SNAKE_CASE values
- **Relations**: Always define both sides with proper `@relation` directives

### Schema Example

```prisma
model User {
  id         Int       @id @default(autoincrement())
  email      String    @unique
  firstName String @map("first_name")
  lastName  String @map("last_name")
  isActive  Boolean   @default(true) @map("is_active")
  status     UserStatus @default(PENDING)
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  // Relations
  profile    UserProfile?
  posts      Post[]

  @@index([email])
  @@index([status])
  @@map("users")
}

enum UserStatus {
  PENDING
  ACTIVE
  INACTIVE
  SUSPENDED
  BANNED
}
```

## Validation & Authentication

### Validation

- Use `ValidationPipe` globally with `transform: true`
- Validate IDs with `@IsInt()` and `@IsPositive()`
- Use `@Transform()` for data transformation
- Use `@Type()` for proper type conversion

### Authentication

- Use Passport.js with JWT strategy
- Implement guards: `@UseGuards(JwtAuthGuard)`
- Create custom decorators: `@CurrentUser()`
- Hash passwords with bcrypt (salt rounds: 10)
- Use environment variables for JWT secrets

## Error Handling

- Use NestJS built-in exceptions: `BadRequestException`, `NotFoundException`, etc.
- Create custom exception filters for consistent responses
- Log errors with NestJS Logger
- Return structured error responses with proper HTTP status codes
