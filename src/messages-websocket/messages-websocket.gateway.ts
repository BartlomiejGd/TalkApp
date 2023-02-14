import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessagesWebsocketService } from './messages-websocket.service';
import { CreateMessagesWebsocketDto } from './dto/create-messages-websocket.dto';
import { UpdateMessagesWebsocketDto } from './dto/update-messages-websocket.dto';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class MessagesWebsocketGateway {
  constructor(
    private readonly messagesWebsocketService: MessagesWebsocketService,
  ) {}

  @SubscribeMessage('createMessagesWebsocket')
  create(
    @MessageBody() createMessagesWebsocketDto: CreateMessagesWebsocketDto,
  ) {
    return this.messagesWebsocketService.create(createMessagesWebsocketDto);
  }

  @SubscribeMessage('findAllMessagesWebsocket')
  findAll() {
    return this.messagesWebsocketService.findAll();
  }

  @SubscribeMessage('typing')
  async typing() {
    //todo
  }

  @SubscribeMessage('join')
  join() {
    //todo
  }
}
