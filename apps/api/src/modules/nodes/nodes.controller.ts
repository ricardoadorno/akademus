import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { NodeResponseDto } from './dto/node-response.dto';

@Controller('nodes')
@ApiTags('Nodes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new node' })
  @ApiCreatedResponse({
    description: 'Node created successfully',
    type: NodeResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNodeDto: CreateNodeDto): Promise<NodeResponseDto> {
    return this.nodesService.create(createNodeDto);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all nodes for a course' })
  @ApiOkResponse({
    description: 'Nodes retrieved successfully',
    type: [NodeResponseDto],
  })
  findByCourse(
    @Param('courseId') courseId: string,
  ): Promise<NodeResponseDto[]> {
    return this.nodesService.findByCourseId(+courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get node by ID' })
  @ApiOkResponse({
    description: 'Node retrieved successfully',
    type: NodeResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Node not found' })
  findOne(@Param('id') id: string): Promise<NodeResponseDto> {
    return this.nodesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a node' })
  @ApiOkResponse({
    description: 'Node updated successfully',
    type: NodeResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Node not found' })
  update(
    @Param('id') id: string,
    @Body() updateNodeDto: UpdateNodeDto,
  ): Promise<NodeResponseDto> {
    return this.nodesService.update(+id, updateNodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a node' })
  @ApiOkResponse({ description: 'Node deleted successfully' })
  @ApiNotFoundResponse({ description: 'Node not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.nodesService.remove(+id);
  }
}
