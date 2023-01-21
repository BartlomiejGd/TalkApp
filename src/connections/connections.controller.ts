import {Body, Controller, Get, Inject, Post, UseGuards} from '@nestjs/common';
import {ConnectionsService} from "./connections.service";
import {AuthGuard} from "@nestjs/passport";
import {NewConnectionsDto} from "./dto/newConnectionsDto";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";
import {
 AvailableConnectionResponse, ConnectionToAcceptResponse,
 SendNewConnectionResponse
} from "../interfaces/connections.interface";

@Controller('connections')
export class ConnectionsController {

 constructor(
     @Inject(ConnectionsService) private connectionsService: ConnectionsService,
 ) {
 }

  @UseGuards(AuthGuard('jwt'))
  @Post('/newConnection')
  async createConnection(@Body() newConnection: NewConnectionsDto, @UserObj() user: User): Promise<SendNewConnectionResponse> {
  return this.connectionsService.createConnection(newConnection, user);
 }
  @UseGuards(AuthGuard('jwt'))
  @Get('getConnectionListToAccept')
  async listOfConnectionsToAccept(@UserObj() user: User): Promise<ConnectionToAcceptResponse[]>{
  return this.connectionsService.listOfConnectionToAccept(user)
}

  @UseGuards(AuthGuard('jwt'))
  @Get('/getAvailableConnectionsList')
  async listOfAvailableConnections(@UserObj() user: User): Promise<AvailableConnectionResponse[]>{
  return this.connectionsService.listOfAvailableConnections(user);
 }
}
