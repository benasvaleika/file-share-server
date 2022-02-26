import { MessageEnum } from './types/MessageEnum';
import {
  ChatMessageType,
  FileTransCancelMessageType,
  FileTransMessageType,
  FileTransRejectMessageType,
  RoomIdMessageType,
  RtcSdpOfferMessageType,
} from './types/MessageTypes';
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
    const messageDestinationUser = userManager
      .getRoomUsers(user)
      .filter((u) => u.id === f.destinationId);
    messageDestinationUser[0].sendData(
      JSON.stringify({
        type: MessageEnum.FILE_TRANS,
        files: [f],
      } as FileTransMessageType)
    );
  });
};

export const fileTransferCancelMessageHandler = (
  message: FileTransCancelMessageType,
  userManager: UserManager,
  user: UserType
) => {
  const messageDestinationUser = userManager
    .getRoomUsers(user)
    .filter((u) => u.id === message.fileDestinationId);
  messageDestinationUser[0].sendData(JSON.stringify(message));
};

export const fileTransferRejectMessageHandler = (
  message: FileTransRejectMessageType,
  userManager: UserManager,
  user: UserType
) => {
  const messageDestinationUser = userManager
    .getRoomUsers(user)
    .filter((u) => u.id === message.fileSourceId);
  messageDestinationUser[0].sendData(JSON.stringify(message));
};

export const rtcSdpOfferMessageHandler = (
  message: RtcSdpOfferMessageType,
  userManager: UserManager,
  user: UserType
) => {
  const messageDestinationUser = userManager
    .getRoomUsers(user)
    .filter((u) => u.id === message.destinationId);
  messageDestinationUser[0].sendData(JSON.stringify(message));
};
