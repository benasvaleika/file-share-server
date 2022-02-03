import { IncomingMessage } from 'http';
import { v4 } from 'uuid';
import { WebSocket } from 'ws';
import { UserType } from './types/userTypes';
import { generateUserLetter } from './utils';

class User implements UserType {
  private ws: WebSocket;
  readonly id;
  userLetter;
  readonly remoteAddress;
  roomId: string | undefined;
  joinDate;

  constructor(ws: WebSocket, req: IncomingMessage) {
    this.remoteAddress = req.socket.remoteAddress;
    this.ws = ws;
    this.id = v4();
    this.userLetter = generateUserLetter();
    this.joinDate = new Date().getTime();
  }

  sendData(data: string) {
    if (this.ws.readyState !== 1) {
      return;
    }
    this.ws.send(data);
  }

  setRoomId(roomId: string) {
    this.roomId = roomId;
  }

  close() {
    this.ws.close();
  }
}

export default User;
