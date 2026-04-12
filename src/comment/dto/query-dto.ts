import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { PaginationAndSortDto } from 'src/types/common';

export class QueryCommentDto extends PaginationAndSortDto {
  @ApiProperty({ required: true })
  @IsUUID()
  articleId: string;
}
