import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { CreateStoreInput } from '../../../facade/create/dto/create-store.input';

export class CreateStoreDto implements CreateStoreInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsInt()
  @Min(0)
  @Max(24)
  startHour: number;

  @IsInt()
  @Min(0)
  @Max(24)
  @IsNotEmpty()
  endHour: number;
}
