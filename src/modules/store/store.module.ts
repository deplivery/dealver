import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentScan } from '@tiny-nestjs/auto-injectable';

import { TypeOrmExModule } from '@shared/orm/typeorm-ex.module';

import { StoreConfirmEntity } from './infra/db/entity/store-confirm.entity';
import { StoreManagerEntity } from './infra/db/entity/store-manager.entity';
import { StoreEntity } from './infra/db/entity/store.entity';
import { StoreManagerRepository } from './infra/db/repository/store-manager.repository';
import { StoreRepository } from './infra/db/repository/store.repository';

@ComponentScan()
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([StoreEntity, StoreConfirmEntity, StoreManagerEntity]),
    TypeOrmExModule.forCustomRepository([StoreRepository, StoreManagerRepository]),
  ],
})
export class StoreModule {}
