import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import {
  IPaginatedResult,
  IPaginationParams,
  ISortParams,
} from 'src/types/common';

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

export const applySorting = <T>(data: T[], params: ISortParams): T[] => {
  const { sortBy, order } = params;

  if (!sortBy) {
    return data;
  }

  const direction = order === 'desc' ? -1 : 1;

  return [...data].sort((a, b) => {
    if (a[sortBy] > b[sortBy]) return direction;
    if (a[sortBy] < b[sortBy]) return -direction;
    return 0;
  });
};

export const applyPagination = <T>(
  data: T[],
  params: IPaginationParams,
): IPaginatedResult<T> => {
  const page = params.page || 1;
  const limit = params.limit || 10;

  const total = data.length;

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    total,
    page,
    limit,
    data: data.slice(start, end),
  };
};
