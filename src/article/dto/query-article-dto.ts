import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ARTICLE_STATUS, ArticleStatusType } from '../article.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationAndSortDto } from 'src/types/common';

export class QueryArticleDto extends PaginationAndSortDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(ARTICLE_STATUS)
  status?: ArticleStatusType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tag?: string;
}
