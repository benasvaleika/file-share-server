import { ChatMessageType, RoomIdMessageType } from './types/MessageTypes';
import { UserType } from './types/userTypes';
import UserManager from './UserManager';

// CAN BE MERGED WITH WS MANAGER IF FUNCTIONS REMAIN SIMPLE

export const roomIdMessageHandler = (
  message: RoomIdMessageType,
  user: UserType,
  userManager: UserManager
) => {
  user.setRoomId(message.roomId);
  userManager.sendCurrRoomUsers(user);
};

export const chatMessageHandler = (
  message: ChatMessageType,
  userManager: UserManager,
  user: UserType
) => {
  userManager.sendChatMessage(message, user);
};
