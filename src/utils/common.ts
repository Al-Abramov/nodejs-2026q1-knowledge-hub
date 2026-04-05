import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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

interface GetEntityAndCheck<T> {
  entities: T[];
  id: string;
  errorText: string;
}
export const getAndChekEntity = <T extends { id: string }>(
  params: GetEntityAndCheck<T>,
): T | null => {
  const { entities, id, errorText } = params;

  if (!id) {
    return null;
  }

  const entity = entities.find((char) => char.id === id);

  if (!entity) {
    throw new UnprocessableEntityException(errorText);
  }

  return entity;
};
