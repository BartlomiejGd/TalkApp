import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Connections} from "./connections.entity";
import {Repository} from "typeorm";
import {ConnectionsDto} from "./dto/connections.dto";
import {User} from "../user/user.entity";
import {
    AvailableConnection,
    SendNewConnectionResponse
} from "../interfaces/connections.interface";

@Injectable()
export class ConnectionsService {

    constructor(
        @InjectRepository(Connections) private connectionsRepository: Repository<Connections>,
    ) {
    }


   async createConnection(newConnection: ConnectionsDto, user: User): Promise<SendNewConnectionResponse>{
        const connections = new Connections();
        connections.sendFrom = user.id
        connections.sendTo = newConnection.sendTo
        connections.isAccepted = 1; //TODO it should be replace to false when AcceptConnections will be created

      await this.connectionsRepository.save(connections);

       return {
           isSuccess: true
       };
    }

    async listOfConnections(user: User): Promise<AvailableConnection[]>{

        const result = [] as Array <AvailableConnection>;
        const listOfRequestConnection = await this.connectionsRepository.find({
            select: ['sendTo', 'id'],
            where: {isAccepted: 1}
        });

        listOfRequestConnection.map((obj) => {
            result.push({connectionId: obj.id, availableUserId: obj.sendTo})
        })

        console.log(result)

        return result ;
    }
}
