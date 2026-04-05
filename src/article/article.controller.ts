import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { QueryArticleDto } from './dto/query-article-dto';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article-dto';
import { UpdateArticleDto } from './dto/update-article-dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get()
  getArticles(@Query() query: QueryArticleDto): Article[] {
    return this.service.getArticles(query);
  }

  @Get(':id')
  getArticleById(@Param('id') id: string): Article {
    return this.service.getArticleById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArticle(@Body() dto: CreateArticleDto) {
    return this.service.createArticle(dto);
  }

  @Put(':id')
  updateArticle(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.service.updateArticle(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArticle(@Param('id') id: string) {
    this.service.deleteArticle(id);
  }
}
