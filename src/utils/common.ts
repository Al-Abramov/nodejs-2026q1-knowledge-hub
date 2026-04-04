import { BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { User } from 'src/users/users.entity';

export const checkIsUUID = (id: string) => {
  if (!isUUID(id)) {
    throw new BadRequestException('Invalid userId');
  }
};

export const getUserAndChek = (users: User[], id: string): User | null => {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new BadRequestException('User not found');
  }

  return user || null;
};
