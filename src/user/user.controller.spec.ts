import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import {UserService} from "./user.service";
import {register} from "tsconfig-paths";

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    registerNewUser: jest.fn(registerNewUser => {
    return{
      emailIsOk: true,
      nickIsOk: true,
      pwdMatch: true
    }
  })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register/create new user', () => {
    expect(controller.register({nick: 'JestNick', email: 'a@gmail.com' , pwd:'1234' , repwd: '1234'}))
        .toContain({
        })
  })

});
