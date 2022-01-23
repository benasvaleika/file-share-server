export interface UserType {
  id: string;
  userLetter: string;
  remoteAddress: string | undefined;
  roomId: string | undefined;

  sendData(data: string): void;
  setRoomId(roomId: string): void;
  close(): void;
}
