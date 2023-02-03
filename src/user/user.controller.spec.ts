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

  const userMockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        EmailService,
        {
          provide: getRepositoryToken(User),
          useValue: userMockRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', () => {
    const newUser = {
      nick: 'JestTest',
      email: 'aaaa@gamil.com',
      pwd: '11111',
      repwd: '11111'
    }
    expect(controller.register(newUser)).toBe({
      emailIsOk: true,
      nickIsOK: true,
      pwdMatch: true,
      accountCreated: true
    })
  })

});
