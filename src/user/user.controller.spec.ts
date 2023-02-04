import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmailService } from '../emailConfirmation/email.service';
import { EmailModule } from '../emailConfirmation/email.module';
import {Repository} from "typeorm";
import {getRepositoryToken, InjectRepository} from "@nestjs/typeorm";
import { User } from "./user.entity";


describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        EmailService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            exist: jest.fn()
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', ()=> {
    expect(userRepository).toBeDefined();
  })


});
