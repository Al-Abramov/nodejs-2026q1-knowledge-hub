import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsUUID()
  articleId: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  authorId?: string;
}
