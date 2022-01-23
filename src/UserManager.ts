import { UserType } from './types/userTypes';

class UserManager {
  private users: UserType[] = [];

  addUser(user: UserType) {
    this.users.push(user);
  }

  getLocalUsers(user: UserType) {
    return this.users.filter((u) => u.remoteAddress === user.remoteAddress);
  }

  removeUser(user: UserType) {
    this.users = this.users.filter((u) => u !== user);
  }
}

export default UserManager;
