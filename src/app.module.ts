import {Inject, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { MessageModule } from './message/message.module';
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [
     ConfigModule.forRoot(),
      TypeOrmModule.forFeature(),
      TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/**.entity{.ts,.js}'],
      logging: true,
      synchronize: true,
  }),
  MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
