import { Module } from '@nestjs/common';
import { ConnectionsController } from './connections.controller';
import { ConnectionsService } from './connections.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connections} from "./connections.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Connections])
  ],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
  exports: [ConnectionsService]
})
export class ConnectionsModule {}
