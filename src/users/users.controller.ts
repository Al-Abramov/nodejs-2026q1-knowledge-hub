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

@Controller('user')
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
  deleteUSer(@Param('id') id: string) {
    return this.service.deleteUSer(id);
  }
}
