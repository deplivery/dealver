import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AutoController } from '@tiny-nestjs/auto-injectable';

import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreUsecase } from '../../facade/create/create-store-usecase.service';
import { DeleteStoreUsecase } from '../../facade/delete/delete-store.usecase';
import { GetStoreUsecase } from '../../facade/get/get-store.usecase';
import { UpdateStoreUsecase } from '../../facade/update/update-store.usecase';

@AutoController('store')
export class StoreController {
  constructor(
    private readonly createStoreUsecase: CreateStoreUsecase,
    private readonly updateStoreUsecase: UpdateStoreUsecase,
    private readonly deleteStoreUsecase: DeleteStoreUsecase,
    private readonly getStoreUsecase: GetStoreUsecase,
  ) {}

  @Post('/')
  async create(@Body() input: CreateStoreDto) {
    return this.createStoreUsecase.execute({ id: 1, role: 'manager' }, input);
  }

  @Put('/')
  async update(@Body() input: UpdateStoreDto) {
    return this.updateStoreUsecase.execute({ id: 1, role: 'manager' }, input);
  }

  @Delete('/')
  async delete() {
    return this.deleteStoreUsecase.execute({ id: 1, role: 'manager' }, { storeId: 1 });
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    return this.getStoreUsecase.getOne(Number(id));
  }
}
