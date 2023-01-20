import {ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class SendMessageGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {

        // call AuthGuard in order to ensure user is injected in request
        const baseGuardResult = await super.canActivate(context);
        if(!baseGuardResult){
            // unsuccessful authentication return false
            return false;
        }

        // successfull authentication, user is injected
        const {user} = context.switchToHttp().getRequest();

        //check user connection to message reciver

        console.log('id usera login '+user.id)

        return false
    }
}