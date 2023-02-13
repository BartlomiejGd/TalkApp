import { Test, TestingModule } from '@nestjs/testing';
import { MessagesWebsocketGateway } from './messages-websocket.gateway';
import { MessagesWebsocketService } from './messages-websocket.service';

describe('MessagesWebsocketGateway', () => {
  let gateway: MessagesWebsocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesWebsocketGateway, MessagesWebsocketService],
    }).compile();

    gateway = module.get<MessagesWebsocketGateway>(MessagesWebsocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
