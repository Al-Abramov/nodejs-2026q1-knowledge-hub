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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { User } from './users.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getUsers(): User[] {
    return this.service.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): User {
    return this.service.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }

  @Put(':id')
  updatePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
    return this.service.updatePassword(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    this.service.deleteUser(id);
  }
}
