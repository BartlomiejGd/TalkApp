import { Injectable } from '@nestjs/common';
import { CreateMessagesWebsocketDto } from './dto/create-messages-websocket.dto';
import { UpdateMessagesWebsocketDto } from './dto/update-messages-websocket.dto';

@Injectable()
export class MessagesWebsocketService {
  create(createMessagesWebsocketDto: CreateMessagesWebsocketDto) {
    return 'This action adds a new messagesWebsocket';
  }

  findAll() {
    return `This action returns all messagesWebsocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messagesWebsocket`;
  }

  update(id: number, updateMessagesWebsocketDto: UpdateMessagesWebsocketDto) {
    return `This action updates a #${id} messagesWebsocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} messagesWebsocket`;
  }
}
