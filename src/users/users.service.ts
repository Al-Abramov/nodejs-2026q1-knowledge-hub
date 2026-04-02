import { Inject, Injectable } from '@nestjs/common';
import { DATE_BASE } from 'src/constants/common';
import { IDateBase } from 'src/types/db';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATE_BASE)
    private bd: IDateBase,
  ) {}

  getUsers(): any[] {
    return this.bd.getAllUsers();
  }

  getUserById(id: string): any {
    return this.bd.getUserById(id);
  }
}
