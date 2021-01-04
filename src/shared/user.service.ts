import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { User } from 'src/interface/user';
import { FsStore } from 'src/utils/fs-store';

@Injectable()
export class UserService {
  private store: FsStore<Array<User>>;

  constructor() {
    this.store = new FsStore(join(FsStore.STORE_DIR, 'user.json'));
  }

  addUser(user: User): boolean {
    const users = this.getUsers();
    const data = users.filter((u) => u.username !== user.username).concat(user);
    return this.store.set('data', data);
  }

  getUsers(): Array<User> {
    return this.store.get() || [];
  }
}
