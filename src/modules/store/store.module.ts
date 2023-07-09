import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../../shared/orm/typeorm-ex.module';
import { StoreRepository } from './infra/db/repository/store.repository';
import { StoreManagerRepository } from './infra/db/repository/store-manager.repository';
import { CreateStoreUseCase } from './facade/create/create-store.usecase';
import { UpdateStoreUseCase } from './facade/update/update-store.usecase';
import { DeleteStoreUseCase } from './facade/delete/delete-store.usecase';
import { StoreController } from './presentation/REST/store.controller';
import { StoreDomainService } from './domain/service/store.domain.service';
import { CreateStoreContext } from './facade/create/strategy/create-store-strategy';
import { StoreManagerStrategy } from './facade/create/strategy/store-manager.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './infra/db/entity/store.entity';
import { StoreConfirmEntity } from './infra/db/entity/store-confirm.entity';
import { StoreManagerEntity } from './infra/db/entity/store-manager.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity, StoreConfirmEntity, StoreManagerEntity]),
    TypeOrmExModule.forCustomRepository([StoreRepository, StoreManagerRepository]),
  ],
  providers: [
    CreateStoreUseCase,
    UpdateStoreUseCase,
    DeleteStoreUseCase,

    StoreDomainService,

    CreateStoreContext,
    StoreManagerStrategy,
  ],
  controllers: [StoreController],
})
export class StoreModule {}
