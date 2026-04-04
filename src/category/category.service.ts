import { Inject, Injectable } from '@nestjs/common';
import { DATE_BASE } from 'src/constants/common';
import { IDataBase } from 'src/types/db';
import { Category } from './category.entity';
import { checkIsUUID, getItemAndChek } from 'src/utils/common';
import { randomUUID } from 'crypto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category-dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(DATE_BASE)
    private db: IDataBase,
  ) {}

  getCategories(): Category[] {
    return this.db.categories;
  }

  getCategoryById(id: string): Category {
    checkIsUUID(id, 'Invalid categoryId');

    const category = getItemAndChek<Category>({
      items: this.db.categories,
      id,
      errorText: 'Category not found',
    });

    return category;
  }

  createCategory(dto: CreateCategoryDto) {
    const category = {
      id: randomUUID(),
      name: dto.name,
      description: dto.description,
    };

    this.db.categories.push(category);

    return category;
  }

  updateCategory(id: string, dto: UpdateCategoryDto) {
    checkIsUUID(id, 'Invalid categoryId');

    const category = getItemAndChek<Category>({
      items: this.db.categories,
      id,
      errorText: 'Category not found',
    });

    category.name = dto.name ?? category.name;
    category.description = dto.description ?? category.description;

    return category;
  }

  deleteCategory(id: string) {
    checkIsUUID(id, 'Invalid categoryId');

    const category = getItemAndChek<Category>({
      items: this.db.categories,
      id,
      errorText: 'Category not found',
    });

    this.db.categories = this.db.categories.filter((c) => c.id !== id);

    // TODO ОБНОВИТЬ статьи article.categoryId = null
  }
}
