import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../user/user.entity';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {AuthLoginDto} from "./dto/auth.dto";
import {hashPwd} from "../utility/hash";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    private createToken(currentTokenId: string): {
        accessToken: string;
        expiresIn: number;
    } {
        const payload: JwtPayload = { id: currentTokenId };
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(
            payload,
            process.env.JWT_KEY,
            { expiresIn },
        );
        return {
            accessToken,
            expiresIn,
        };
    }

    private async generateToken(user: User): Promise<string> {
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await this.userRepository.findOne({where: {
                currentTokenID: token,
            }});
        } while (!!userWithThisToken);

        user.currentTokenID = token;
        await this.userRepository.save(user);

        return token;
    }

    async login(req: AuthLoginDto, res: Response): Promise<any> {
        try {
            const user = await this.userRepository.findOne({where: {
                    email: req.email,
                    pwdHash: hashPwd(req.pwd),
                }});

            if (!user) {
                return res.json({ error: 'Invalid login data!' });
            }

            const token = this.createToken(await this.generateToken(user));

            return res
                .cookie('jwt', token.accessToken, {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                })
                .json({ ok: true });
        } catch (e) {
            return res.json({ error: e.message });
        }
    }

    async logout(user: User, res: Response) {
        try {
            user.currentTokenID = null;
            await this.userRepository.save(user);
            res.clearCookie('jwt', {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
            });
            return res.json({ ok: true });
        } catch (e) {
            return res.json({ error: e.message });
        }
    }
}

