import {Inject, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { MessageModule } from './message/message.module';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConnectionsModule } from './connections/connections.module';
import { EmailModule } from './emailConfirmation/email.module';


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
  UserModule,
  AuthModule,
  ConnectionsModule,
  EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
