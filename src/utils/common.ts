import { BadRequestException, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';

export const checkIsUUID = (id: string, errorText: string) => {
  if (!isUUID(id)) {
    throw new BadRequestException(errorText);
  }
};

interface GetItemAndChek<T> {
  items: T[];
  id: string;
  errorText: string;
}

export const getItemAndChek = <T extends { id: string }>(
  params: GetItemAndChek<T>,
): T | null => {
  const { items, id, errorText } = params;

  const item = items.find((char) => char.id === id);

  if (!item) {
    throw new NotFoundException(errorText);
  }

  return item;
};
