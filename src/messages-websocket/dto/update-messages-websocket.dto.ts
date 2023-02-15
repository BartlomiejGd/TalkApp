import { PartialType } from '@nestjs/mapped-types';
import { CreateMessagesWebsocketDto } from './create-messages-websocket.dto';

export class UpdateMessagesWebsocketDto extends PartialType(
  CreateMessagesWebsocketDto,
) {
  id: number;
}
