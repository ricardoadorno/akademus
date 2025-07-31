import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { NodesRepository } from './repositories/nodes.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NodesController],
  providers: [NodesService, NodesRepository],
  exports: [NodesService],
})
export class NodesModule {}
