import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmailService } from '../emailConfirmation/email.service';
import { EmailModule } from '../emailConfirmation/email.module';
import { Repository } from 'typeorm';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { hashPwd } from '../utility/hash';
import { raw } from "express";

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          /**
           * Mock the UserService to return values we are expecting.
           *
           * This may not seem like a big deal with such a simple application
           * especially as everything is done in memory, but this becomes even
           * more important as services depend on other services such as TypeORM/Mongo
           * ElasticSearch, etc.
           */
          provide: UserService,
          useValue: {
            registerNewUser: jest
              .fn()
              .mockResolvedValue({emailIsOk: true, nickIsOK: true, pwdMatch: true, accountCreated: true})
          }
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Its important to use async and await! all my functions are async
  it('should register user', async ()=>{
    const retRegisterUser = await controller.register({
      nick: 'nickTets',
      email: 'jest@gmail.com',
      pwd: '11111',
      repwd:'11111'
    })
    expect(retRegisterUser).toMatchObject({
      emailIsOk: true,
      nickIsOK: true,
      pwdMatch: true,
      accountCreated: true
    })
  })

});
