import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { QueryCommentDto } from './dto/query-dto';
import { CreateCommentDto } from './dto/create-comment-dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get()
  getComments(@Query() query: QueryCommentDto) {
    return this.service.getComments(query);
  }

  @Get(':id')
  getCommentById(@Param('id') id: string) {
    return this.service.getCommentById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createComment(@Body() dto: CreateCommentDto) {
    return this.service.createComment(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteComment(@Param('id') id: string) {
    this.service.deleteComment(id);
  }
}
