import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MessagesWebsocketService } from './messages-websocket.service';
import { CreateMessagesWebsocketDto } from './dto/create-messages-websocket.dto';
import { UpdateMessagesWebsocketDto } from './dto/update-messages-websocket.dto';

@WebSocketGateway()
export class MessagesWebsocketGateway {
  constructor(private readonly messagesWebsocketService: MessagesWebsocketService) {}

  @SubscribeMessage('createMessagesWebsocket')
  create(@MessageBody() createMessagesWebsocketDto: CreateMessagesWebsocketDto) {
    return this.messagesWebsocketService.create(createMessagesWebsocketDto);
  }

  @SubscribeMessage('findAllMessagesWebsocket')
  findAll() {
    return this.messagesWebsocketService.findAll();
  }

  @SubscribeMessage('findOneMessagesWebsocket')
  findOne(@MessageBody() id: number) {
    return this.messagesWebsocketService.findOne(id);
  }

  @SubscribeMessage('updateMessagesWebsocket')
  update(@MessageBody() updateMessagesWebsocketDto: UpdateMessagesWebsocketDto) {
    return this.messagesWebsocketService.update(updateMessagesWebsocketDto.id, updateMessagesWebsocketDto);
  }

  @SubscribeMessage('removeMessagesWebsocket')
  remove(@MessageBody() id: number) {
    return this.messagesWebsocketService.remove(id);
  }
}
