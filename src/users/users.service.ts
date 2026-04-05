import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { DATE_BASE } from 'src/constants/common';
import { IDataBase } from 'src/types/db';
import { CreateUserDto } from './dto/create-user.dto';
import { User, USER_ROLE } from './users.entity';
import { randomUUID } from 'node:crypto';
import {
  applyPagination,
  applySorting,
  checkIsUUID,
  getItemAndChek,
} from 'src/utils/common';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { QueryUserDto } from './dto/query-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATE_BASE)
    private db: IDataBase,
  ) {}

  getUsers(query: QueryUserDto) {
    let users = [...this.db.users];

    users = applySorting(users, {
      sortBy: query.sortBy,
      order: query.order,
    });

    const usersWithoutPassword = users.map((user) =>
      this.excludePassword(user),
    );

    if (!query.page && !query.limit) {
      return usersWithoutPassword;
    }

    return applyPagination(usersWithoutPassword, {
      page: Number(query.page),
      limit: Number(query.limit),
    });
  }

  getUserById(id: string): User {
    checkIsUUID(id, 'Invalid userId');

    const user = getItemAndChek<User>({
      items: this.db.users,
      id,
      errorText: 'User not found',
    });

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
    checkIsUUID(id, 'Invalid userId');

    const user = getItemAndChek<User>({
      items: this.db.users,
      id,
      errorText: 'User not found',
    });

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = dto.newPassword;
    user.updatedAt = Date.now();

    return this.excludePassword(user);
  }

  deleteUser(id: string) {
    checkIsUUID(id, 'Invalid userId');

    getItemAndChek<User>({
      items: this.db.users,
      id,
      errorText: 'User not found',
    });

    this.db.users = this.db.users.filter((user) => user.id !== id);

    this.db.articles = this.db.articles.map((article) =>
      article.authorId === id ? { ...article, authorId: null } : article,
    );

    this.db.comments = this.db.comments.filter(
      (comment) => comment.authorId !== id,
    );
  }
}
