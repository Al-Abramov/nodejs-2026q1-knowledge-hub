import { IDataBase } from 'src/types/db';

export class InMemoryDB implements IDataBase {
  users = [];
  articles = [];
  categories = [];
  comments = [];
}
