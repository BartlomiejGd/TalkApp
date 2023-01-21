import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Connections} from "./connections.entity";
import {Repository} from "typeorm";
import {NewConnectionsDto} from "./dto/newConnectionsDto";
import {User} from "../user/user.entity";
import {
    AcceptConnectionResponse,
    AvailableConnectionResponse, ConnectionToAcceptResponse,
    SendNewConnectionResponse
} from "../interfaces/connections.interface";

@Injectable()
export class ConnectionsService {

    constructor(
        @InjectRepository(Connections) private connectionsRepository: Repository<Connections>,
    ) {
    }


   async createConnection(newConnection: NewConnectionsDto, user: User): Promise<SendNewConnectionResponse>{
        const connections = new Connections();
        connections.sendFrom = user.id
        connections.sendTo = newConnection.sendTo
        connections.isAccepted = true; //TODO it should be replace to false when AcceptConnections will be created

      await this.connectionsRepository.save(connections);

       return {
           isSuccess: true
       };
    }

    async listOfConnectionToAccept(user: User): Promise<ConnectionToAcceptResponse[]>{

        const result = [] as Array<ConnectionToAcceptResponse>
        const listOfConnectionToAccept = await this.connectionsRepository.find({
            select:['sendFrom', 'id', 'createdAt'],
            where: {sendTo: user.id, isAccepted: false}
        })

        listOfConnectionToAccept.map((obj) => {
            result.push({
                connectionId: obj.id,
                userSenderId: obj.sendFrom,
                date: obj.createdAt
            })
        })

        return result;
    }

    async acceptConnection(user: User): Promise<AcceptConnectionResponse>
    {
        //todo finish it

        return {
            isSuccess: true
        }
    }

    async listOfAvailableConnections(user: User): Promise<AvailableConnectionResponse[]>{

        const result = [] as Array <AvailableConnectionResponse>;
        const listOfRequestConnection = await this.connectionsRepository.find({
            select: ['sendTo', 'id'],
            where: {isAccepted: true}
        });

        listOfRequestConnection.map((obj) => {
            result.push({connectionId: obj.id, availableUserId: obj.sendTo})
        })

        console.log(result)

        return result ;
    }
}
