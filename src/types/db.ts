import { Article } from 'src/article/article.entity';
import { Category } from 'src/category/category.entity';
import { User } from 'src/users/users.entity';

export interface IDataBase {
  users: User[];
  categories: Category[];
  articles: Article[];
  // comments: Comment[];
}
