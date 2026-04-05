import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ARTICLE_STATUS, ArticleStatusType } from '../article.entity';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(ARTICLE_STATUS)
  status?: ArticleStatusType;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
