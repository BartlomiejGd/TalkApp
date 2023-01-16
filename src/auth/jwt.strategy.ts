import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as process from "process";

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: any): null | string {
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey:process.env.JWT_KEY,
    });
  }

  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }

    const user = await this.userRepository.findOneOrFail({where: {
        currentTokenID: payload.id,
      }});
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
