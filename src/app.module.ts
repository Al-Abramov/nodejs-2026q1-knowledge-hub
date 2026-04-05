import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [DatabaseModule, UsersModule, CategoryModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
