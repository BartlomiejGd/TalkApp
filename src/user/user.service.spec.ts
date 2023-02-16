import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserModule } from './user.module';
import { EmailService } from '../emailConfirmation/email.service';

describe('UserService', () => {
  let userService: UserService;
  const userMockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        UserService,
        { provide: getRepositoryToken(User), useValue: userMockRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });


});
