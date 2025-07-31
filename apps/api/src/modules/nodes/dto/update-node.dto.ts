import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateNodeDto } from './create-node.dto';

// Primeiro omitimos o courseId e depois tornamos todos os campos opcionais
export class UpdateNodeDto extends PartialType(
  OmitType(CreateNodeDto, ['courseId'] as const),
) {}
