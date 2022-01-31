import UserManager from './UserManager';
import { UserType } from './types/userTypes';
import { MessageEnum } from './types/MessageEnum';
import { chatMessageHandler, roomIdMessageHandler } from './wsMessageHandlers';
import { ChatMessageType, RoomIdMessageType } from './types/MessageTypes';

const wsMessageManager = (user: UserType, message: string, userManager: UserManager) => {
  const parsedMsg = JSON.parse(message);

  switch (parsedMsg.type) {
    case MessageEnum.ROOMID:
      roomIdMessageHandler(parsedMsg as RoomIdMessageType, user);
      break;
    case MessageEnum.CHAT_MESSAGE:
      chatMessageHandler(parsedMsg as ChatMessageType, userManager, user);
      break;
    default:
      // handle deff
      console.log('default reached');
  }
};

export default wsMessageManager;
