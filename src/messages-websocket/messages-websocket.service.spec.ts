import { Test, TestingModule } from '@nestjs/testing';
import { MessagesWebsocketService } from './messages-websocket.service';

describe('MessagesWebsocketService', () => {
  let service: MessagesWebsocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesWebsocketService],
    }).compile();

    service = module.get<MessagesWebsocketService>(MessagesWebsocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
