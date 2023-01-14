import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
  TypeOrmModule.forFeature(),
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'SQLiteDatabase.db',
    entities: ['dist/**/**.entity{.ts,.js}'],
    logging: true,
    synchronize: true,
  }),
  MessageModule,
  ],
  controllers: [AppController, MessageController],
  providers: [AppService, MessageService],
})
export class AppModule {}
