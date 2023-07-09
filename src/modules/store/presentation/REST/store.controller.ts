import { Body, Controller, Post } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { CreateStoreUseCase } from '../../facade/create/create-store.usecase';

@Controller('store')
export class StoreController {
  constructor(private readonly createStoreUseCase: CreateStoreUseCase) {}

  @Post('/')
  async create(@Body() input: CreateStoreDto) {
    return await this.createStoreUseCase.execute({ id: 1, role: 'manager' }, input);
  }
}
