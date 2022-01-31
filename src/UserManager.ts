import { MessageEnum } from './types/MessageEnum';
import { ChatMessageType, InitialMessageType } from './types/MessageTypes';
import { UserType } from './types/userTypes';

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

  sendChatMessage(message: ChatMessageType, user: UserType) {
    const roomUsers = this.getRoomUsers(user);
    roomUsers.forEach((u) => {
      if (u.id !== user.id) u.sendData(JSON.stringify(message));
    });
  }
}

export default UserManager;
