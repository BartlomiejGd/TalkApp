import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesWebsocketService } from './messages-websocket.service';
import { CreateMessagesWebsocketDto } from './dto/create-messages-websocket.dto';
import { UpdateMessagesWebsocketDto } from './dto/update-messages-websocket.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class MessagesWebsocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesWebsocketService: MessagesWebsocketService,
  ) {}

  @SubscribeMessage('createMessagesWebsocket')
  async screate(
    @MessageBody() createMessagesWebsocketDto: CreateMessagesWebsocketDto,
  ) {
    const message = await this.messagesWebsocketService.create(
      createMessagesWebsocketDto,
    );

    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessagesWebsocket')
  findAll() {
    return this.messagesWebsocketService.findAll();
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messagesWebsocketService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping });
  }

  @SubscribeMessage('join')
  join(@MessageBody('name') name: string, @ConnectedSocket() client: Socket) {
    return this.messagesWebsocketService.identify(name, client.id);
  }
}
