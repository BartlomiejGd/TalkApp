import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {UserObj} from "../decorators/user-obj.decorator";


@Injectable()
export class AllowSendMessageGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();



        return false //false   //eturn request.headers['x-password'] === goodPass;
    }
}