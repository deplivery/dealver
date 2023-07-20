import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmExModule } from '@shared/orm/typeorm-ex.module';

import { StoreDomainService } from './domain/service/store.domain.service';
import { CreateStoreUsecase } from './facade/create/create-store-usecase.service';
import { CreateStoreContext } from './facade/create/strategy/create-store-strategy';
import { StoreManagerStrategy } from './facade/create/strategy/store-manager.strategy';
import { DeleteStoreUseCase } from './facade/delete/delete-store.usecase';
import { UpdateStoreUseCase } from './facade/update/update-store.usecase';
import { StoreConfirmEntity } from './infra/db/entity/store-confirm.entity';
import { StoreManagerEntity } from './infra/db/entity/store-manager.entity';
import { StoreEntity } from './infra/db/entity/store.entity';
import { StoreManagerRepository } from './infra/db/repository/store-manager.repository';
import { StoreRepository } from './infra/db/repository/store.repository';
import { StoreController } from './presentation/REST/store.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity, StoreConfirmEntity, StoreManagerEntity]),
    TypeOrmExModule.forCustomRepository([StoreRepository, StoreManagerRepository]),
  ],
  providers: [
    CreateStoreUsecase,
    UpdateStoreUseCase,
    DeleteStoreUseCase,

    StoreDomainService,

    CreateStoreContext,
    StoreManagerStrategy,
  ],
  controllers: [StoreController],
})
export class StoreModule {}
