import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {getRepositoryToken, InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {Inject} from "@nestjs/common";
import {EmailService} from "../emailConfirmation/email.service";

const mockUserRepository = () => ({

});
describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          UserService,
          {      provide: getRepositoryToken(User),
            useClass: Repository,}
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
