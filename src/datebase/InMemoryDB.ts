import { Injectable } from '@nestjs/common';
import { IDateBase } from 'src/types/db';

@Injectable()
export class InMemoryDB implements IDateBase {
  users = [];
  articles = [];
  categories = [];
  comments = [];
}
