import { v4 } from 'uuid';
import { UserType } from './types/userTypes';

class User implements UserType {
  private ws: WebSocket;
  readonly id = v4();
  userLetter = 'Y';
  readonly remoteAddress: string;
  roomId: string;

  constructor(ws: WebSocket, remoteAddres: string) {
    this.remoteAddress = remoteAddres;
    this.ws = ws;
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
