import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export interface ISortParams {
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
}

export interface IPaginatedResult<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}

export class PaginationAndSortDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({ required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
