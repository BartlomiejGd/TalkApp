import {Body, Controller, Get, Inject, Post, Put, UseGuards} from '@nestjs/common';
import {ConnectionsService} from "./connections.service";
import {AuthGuard} from "@nestjs/passport";
import {NewConnectionsDto} from "./dto/newConnections.dto";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";
import {
    AcceptConnectionResponse,
    AvailableConnectionResponse, ConnectionToAcceptResponse,
    SendNewConnectionResponse
} from "../interfaces/connections.interface";
import {AcceptConnectionsDto} from "./dto/acceptConnections.dto";

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
  @Get('/getConnectionListToAccept')
  async listOfConnectionsToAccept(@UserObj() user: User): Promise<ConnectionToAcceptResponse[]>{
    return this.connectionsService.listOfConnectionToAccept(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/acceptConnection')
  async acceptConnection(@Body() acceptConnectionsDto: AcceptConnectionsDto ,@UserObj() user: User): Promise<AcceptConnectionResponse>{
     return this.connectionsService.acceptConnection(acceptConnectionsDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/getAvailableConnectionsList')
  async listOfAvailableConnections(@UserObj() user: User): Promise<AvailableConnectionResponse[]>{
    return this.connectionsService.listOfAvailableConnections(user);
  }

}
