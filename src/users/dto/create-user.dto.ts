import { IsEnum, IsOptional, IsString } from 'class-validator';
import { USER_ROLE, UserRoleType } from '../users.entity';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: UserRoleType;
}
