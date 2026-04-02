import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { InMemoryDB } from 'src/InMemoryDB/InMemoryDB';
import { DATE_BASE } from 'src/constants/common';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: DATE_BASE,
      useClass: InMemoryDB,
    },
  ],
})
export class UsersModule {}
