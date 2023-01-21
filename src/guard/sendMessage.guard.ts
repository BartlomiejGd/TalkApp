import {ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {SendTxtMessageDto} from "../message/dto/send-txt-message.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Connections} from "../connections/connections.entity";
import {Repository} from "typeorm";

@Injectable()
export class SendMessageGuard extends AuthGuard('jwt') {

    constructor(
        @InjectRepository(Connections) private connectionsRepository: Repository<Connections>,
    ) {
       super();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        //cant get {user} without this line
       const baseGuardResult = await super.canActivate(context);

        //get objects
        const {user} = context.switchToHttp().getRequest();
        const {body} = context.switchToHttp().getRequest();

        //check connetions between sender and reciver
         const result = await this.connectionsRepository.count({where: [
                {sendFrom: user.id, sendTo:body.messageTo, isAccepted :1},
                {sendFrom:body.messageTo, sendTo:user.id, isAccepted: 1}
            ]});

        return result >= 1 ? true : false // ternary operator

    }
}