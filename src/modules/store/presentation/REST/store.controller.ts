import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AutoController } from '@tiny-nestjs/auto-injectable';

import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreCommand } from '../../application/command/create-store.command';
import { UpdateStoreCommand } from '../../application/command/update-store.command';
import { DeleteStoreUsecase } from '../../application/delete/delete-store.usecase';
import { GetStoreUsecase } from '../../application/get/get-store.usecase';
import { StoreApplicationService } from '../../application/service/store-application.service';

@AutoController('store')
export class StoreController {
  constructor(
    private readonly service: StoreApplicationService,
    private readonly deleteStoreUsecase: DeleteStoreUsecase,
    private readonly getStoreUsecase: GetStoreUsecase,
  ) {}

  @Post('/')
  async create(@Body() input: CreateStoreDto) {
    return this.service.createStore(
      new CreateStoreCommand(input.name, input.address, input.startHour, input.endHour, input.storeManagerId),
    );
  }

  @Put('/')
  async update(@Body() input: UpdateStoreDto) {
    return this.service.updateStore(
      new UpdateStoreCommand(input.storeId, input.name, input.address, input.startHour, input.endHour),
    );
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
