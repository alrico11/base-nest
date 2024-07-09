// import { WebSocketGateway, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { SocketService } from './socket.service';

// @WebSocketGateway()
// export class SocketGateway implements OnGatewayConnection {
//   @WebSocketServer()
//   private server: Server | undefined;

//   constructor(private readonly socketService: SocketService) {}

//   handleConnection(socket: Socket): void {
//     this.socketService.handleConnection(socket);
//   }
//   // Implement other Socket.IO event handlers and message handlers
// }
