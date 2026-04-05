import { IsEnum, IsOptional, IsString } from 'class-validator';
import { USER_ROLE, UserRoleType } from '../users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: ['admin', 'editor', 'viewer'], required: false })
  @IsOptional()
  @IsEnum(USER_ROLE)
  role?: UserRoleType;
}
