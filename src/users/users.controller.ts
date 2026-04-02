import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getUsers(): any[] {
    return this.service.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): any {
    return this.service.getUserById(id);
  }
}
