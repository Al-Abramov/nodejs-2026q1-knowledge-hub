import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ARTICLE_STATUS, ArticleStatusType } from '../article.entity';
import { ApiProperty } from '@nestjs/swagger';

export class QueryArticleDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(ARTICLE_STATUS)
  status?: ArticleStatusType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ isArray: true, required: false })
  @IsOptional()
  @IsString()
  tag?: string;
}
