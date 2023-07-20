import { Body, Controller, Post } from '@nestjs/common';

import { CreateStoreDto } from './dto/create-store.dto';
import { CreateStoreUsecase } from '../../facade/create/create-store-usecase.service';

@Controller('store')
export class StoreController {
  constructor(private readonly createStoreUseCase: CreateStoreUsecase) {}

  @Post('/')
  async create(@Body() input: CreateStoreDto) {
    return this.createStoreUseCase.execute({ id: 1, role: 'manager' }, input);
  }
}
