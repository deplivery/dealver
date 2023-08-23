import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  startHour?: number;

  @IsOptional()
  endHour?: number;

  @IsNotEmpty()
  storeId: number;
}
