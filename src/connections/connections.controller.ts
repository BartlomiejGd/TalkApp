import {Body, Controller, Get, Inject, Post, UseGuards} from '@nestjs/common';
import {ConnectionsService} from "./connections.service";
import {AuthGuard} from "@nestjs/passport";
import {ConnectionsDto} from "./dto/connections.dto";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";
import {ListOfConnectionsResponse, SendNewConnectionResponse} from "../interfaces/connections.interface";

@Controller('connections')
export class ConnectionsController {

 constructor(
     @Inject(ConnectionsService) private connectionsService: ConnectionsService,
 ) {
 }


 @UseGuards(AuthGuard('jwt'))
 @Post('/newConnection')
 async createConnection(@Body() newConnection: ConnectionsDto, @UserObj() user: User): Promise<SendNewConnectionResponse> {
 return this.connectionsService.createConnection(newConnection, user);
 }

 @UseGuards(AuthGuard('jwt'))
 @Get('/getConnectionsList')
 async listOfConnections(@UserObj() user: User): Promise<ListOfConnectionsResponse>{
  return this.connectionsService.listOfConnections(user);
 }
}
