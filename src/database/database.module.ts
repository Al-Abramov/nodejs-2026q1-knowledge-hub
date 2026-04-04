import { Module } from '@nestjs/common';
import { InMemoryDB } from './InMemoryDB';
import { DATE_BASE } from 'src/constants/common';

@Module({
  providers: [
    {
      provide: DATE_BASE,
      useClass: InMemoryDB,
    },
  ],
  exports: [DATE_BASE],
})
export class DatabaseModule {}
