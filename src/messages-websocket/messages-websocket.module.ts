import { Module } from '@nestjs/common';
import { MessagesWebsocketService } from './messages-websocket.service';
import { MessagesWebsocketGateway } from './messages-websocket.gateway';

@Module({
  providers: [MessagesWebsocketGateway, MessagesWebsocketService]
})
export class MessagesWebsocketModule {}
