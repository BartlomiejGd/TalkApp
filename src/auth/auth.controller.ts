import {Body, Controller, Get, Post, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthLoginDto} from "./dto/auth.dto";
import {User} from "../user/user.entity";
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {UserObj} from "../decorators/user-obj.decorator";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    async phoneRegister(
        @Body() req: AuthLoginDto,
        @Res() res: Response,
    ): Promise<any> {
        return this.authService.login(req, res);
    }

    @Get('/logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@UserObj() user: User, @Res() res: Response) {
        return this.authService.logout(user, res);
    }
}
