import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ARTICLE_STATUS, ArticleStatusType } from '../article.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(ARTICLE_STATUS)
  status?: ArticleStatusType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
