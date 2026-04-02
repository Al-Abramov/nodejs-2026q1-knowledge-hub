import { Injectable } from '@nestjs/common';
import { IDateBase } from 'src/types/db';

@Injectable()
export class InMemoryDB implements IDateBase {
  private users = {
    '123': {
      id: 1,
      name: 'First',
    },
    '345': {
      id: 2,
      name: 'Second',
    },
  };

  getAllUsers() {
    return Object.values(this.users);
  }

  getUserById(id: string) {
    return this.users[id];
  }
}
