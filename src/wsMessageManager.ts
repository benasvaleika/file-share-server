import UserManager from './UserManager';
import { UserType } from './types/userTypes';
import { MessageEnum } from './types/MessageEnum';
import {
  chatMessageHandler,
  fileTransferCancelMessageHandler,
  fileTransferRejectMessageHandler,
  fileTransMessageHandler,
  roomIdMessageHandler,
  rtcIceCandidateMessageHandler,
  rtcSdpAnswerMessageHandler,
  rtcSdpOfferMessageHandler,
} from './wsMessageHandlers';
import {
  ChatMessageType,
  FileTransCancelMessageType,
  FileTransMessageType,
  FileTransRejectMessageType,
  RoomIdMessageType,
  RtcSdpAnswerMessageType,
  RtcSdpOfferMessageType,
} from './types/MessageTypes';

const wsMessageManager = (user: UserType, message: string, userManager: UserManager) => {
  const parsedMsg = JSON.parse(message);

  switch (parsedMsg.type) {
    case MessageEnum.ROOMID:
      roomIdMessageHandler(parsedMsg as RoomIdMessageType, user, userManager);
      break;
    case MessageEnum.CHAT_MESSAGE:
      chatMessageHandler(parsedMsg as ChatMessageType, userManager, user);
      break;
    case MessageEnum.FILE_TRANS:
      fileTransMessageHandler(parsedMsg as FileTransMessageType, userManager, user);
      break;
    case MessageEnum.FILE_TRANS_CANCEL:
      fileTransferCancelMessageHandler(parsedMsg as FileTransCancelMessageType, userManager, user);
      break;
    case MessageEnum.FILE_TRANS_REJECT:
      fileTransferRejectMessageHandler(parsedMsg as FileTransRejectMessageType, userManager, user);
      break;
    case MessageEnum.RTC_SDP_OFFER:
      rtcSdpOfferMessageHandler(parsedMsg as RtcSdpOfferMessageType, userManager, user);
      break;
    case MessageEnum.RTC_SDP_ANSWER:
      rtcSdpAnswerMessageHandler(parsedMsg as RtcSdpAnswerMessageType, userManager, user);
      break;
    case MessageEnum.RTC_ICE_CANDIDATE:
      rtcIceCandidateMessageHandler(parsedMsg as RtcSdpAnswerMessageType, userManager, user);
      break;
    default:
      // handle deff
      console.log('default reached');
  }
};

export default wsMessageManager;
