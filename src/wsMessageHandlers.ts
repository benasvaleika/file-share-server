import { MessageEnum } from './types/MessageEnum';
import { ChatMessageType, FileTransMessageType, RoomIdMessageType } from './types/MessageTypes';
import { UserType } from './types/userTypes';
import UserManager from './UserManager';

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

export const fileTransMessageHandler = (
  message: FileTransMessageType,
  userManager: UserManager,
  user: UserType
) => {
  message.files.forEach((f) => {
    const fileDestinationUser = userManager
      .getRoomUsers(user)
      .filter((u) => u.id === f.destinationId);
    fileDestinationUser[0].sendData(
      JSON.stringify({
        type: MessageEnum.FILE_TRANS,
        files: [f],
      } as FileTransMessageType)
    );
  });
};
