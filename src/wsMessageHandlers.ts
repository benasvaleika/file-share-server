import { RoomIdMessageType } from './types/MessageTypes';
import { UserType } from './types/userTypes';

export const roomIdMessageHandler = (message: RoomIdMessageType, user: UserType) => {
  user.setRoomId(message.roomId);
};
