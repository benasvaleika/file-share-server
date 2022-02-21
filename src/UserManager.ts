import { MessageEnum } from './types/MessageEnum';
import {
  ChatMessageType,
  CurrRoomUsersType,
  FileTransDropMessageType,
  InitialMessageType,
  RoomUserType,
} from './types/MessageTypes';
import { UserType } from './types/userTypes';

// TODO refractor message related methods to mesage handler
class UserManager {
  private users: UserType[] = [];

  getLocalUsers(user: UserType) {
    return this.users
      .filter((u) => u.remoteAddress === user.remoteAddress)
      .sort((a, b) => a.joinDate - b.joinDate);
  }

  getRoomUsers(user: UserType) {
    return this.users.filter((u) => u.roomId === user.roomId);
  }

  // FOR DEV PURPOSES
  getAllUsers() {
    return this.users;
  }

  addUser(user: UserType) {
    this.users.push(user);

    const localUsers = this.getLocalUsers(user);
    let roomIdSuggested: string | null | undefined = null;
    if (localUsers.length > 1) {
      roomIdSuggested = localUsers[0].roomId;
    }

    user.sendData(
      JSON.stringify({
        type: MessageEnum.INITIAL,
        userId: user.id,
        userLetter: user.userLetter,
        roomIdSuggested: roomIdSuggested,
      } as InitialMessageType)
    );
  }

  removeUser(user: UserType) {
    this.users = this.users.filter((u) => u !== user);
  }

  sendCurrRoomUsers(user: UserType) {
    const roomUsers = this.getRoomUsers(user);
    const roomUsersJSON = JSON.stringify({
      type: MessageEnum.CURR_ROOM_USERS,
      roomUsers: roomUsers.map((u) => {
        return { id: u.id, userLetter: u.userLetter } as RoomUserType;
      }),
    } as CurrRoomUsersType);
    roomUsers.forEach((u) => u.sendData(roomUsersJSON));
  }

  sendChatMessage(message: ChatMessageType, user: UserType) {
    const roomUsers = this.getRoomUsers(user);
    roomUsers.forEach((u) => {
      if (u.id !== user.id) u.sendData(JSON.stringify(message));
    });
  }

  dropClosedClientFiles(user: UserType) {
    const roomUsers = this.getRoomUsers(user);
    roomUsers.forEach((u) => {
      u.sendData(
        JSON.stringify({
          type: MessageEnum.FILE_TRANS_DROP,
          fileSourceId: user.id,
        } as FileTransDropMessageType)
      );
    });
  }
}

export default UserManager;
