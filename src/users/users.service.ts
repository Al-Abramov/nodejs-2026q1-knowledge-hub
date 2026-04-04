import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { DATE_BASE } from 'src/constants/common';
import { IDateBase } from 'src/types/db';
import { CreateUserDto } from './dto/create-user.dto';
import { User, USER_ROLE } from './users.entity';
import { randomUUID } from 'node:crypto';
import { checkIsUUID, getUserAndChek } from 'src/utils/common';
import { UpdatePasswordDto } from './dto/update-password-dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATE_BASE)
    private db: IDateBase,
  ) {}

  getUsers(): any[] {
    return this.db.users.map((user) => this.excludePassword(user));
  }

  getUserById(id: string): any {
    checkIsUUID(id);

    const user = getUserAndChek(this.db.users, id);

    return this.excludePassword(user);
  }

  private excludePassword(user: User) {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  createUser(dto: CreateUserDto) {
    const user = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      role: dto.role ?? USER_ROLE.viewer,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.db.users.push(user);

    return this.excludePassword(user);
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    checkIsUUID(id);

    const user = getUserAndChek(this.db.users, id);

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = dto.newPassword;
    user.updatedAt = Date.now();

    return this.excludePassword(user);
  }

  deleteUSer(id: string) {
    checkIsUUID(id);

    const user = getUserAndChek(this.db.users, id);

    this.db.users = this.db.users.filter((u) => u.id !== id);

    // TODO ОБНОВИТЬ статьи, УДАЛИТЬ комментарии пользователя
  }
}
