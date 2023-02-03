import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/user.dto';
import { RegisterUserResponse } from '../interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  //register new user
  @Post('/register')
  async register(
    @Body() newUser: RegisterUserDto,
  ): Promise<RegisterUserResponse> {
    return this.userService.registerNewUser(newUser);
  }
}
