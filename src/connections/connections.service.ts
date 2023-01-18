import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Connections} from "./connections.entity";
import {Repository} from "typeorm";
import {ConnectionsDto} from "./dto/connections.dto";
import {User} from "../user/user.entity";
import {ListOfConnectionsResponse, SendNewConnectionResponse} from "../interfaces/connections.interface";

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
        connections.isAccepted = true; //TODO it should be replace to false when AcceptConnections will be created

      await this.connectionsRepository.save(connections);

       return {
           isSuccess: true
       };
    }

    async listOfConnections(user: User): Promise<ListOfConnectionsResponse>{

   return
    }
}
