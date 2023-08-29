import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AutoController } from '@tiny-nestjs/auto-injectable';

import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreCommand } from '../../application/command/create-store.command';
import { DeleteStoreCommand } from '../../application/command/delete-store.command';
import { UpdateStoreCommand } from '../../application/command/update-store.command';
import { GetStoreUsecase } from '../../application/get/get-store.usecase';
import { StoreApplicationService } from '../../application/service/store-application.service';

@AutoController('store')
export class StoreController {
  constructor(private readonly service: StoreApplicationService, private readonly getStoreUsecase: GetStoreUsecase) {}

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

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.service.deleteStore(new DeleteStoreCommand(Number(id)));
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    return this.getStoreUsecase.getOne(Number(id));
  }
}
