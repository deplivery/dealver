import { Domain } from '@shared/domain/domain';
import { ValueObject } from '@shared/domain/value-object';
import { CoreEntity } from '@shared/orm/core.entity';

export function mapToDomain<T extends CoreEntity, U extends Domain<any> | ValueObject<any>>(
  entity: T,
  DomainClass: new (props: T, id?: number) => U,
): U {
  return entity.id ? (new DomainClass(entity, entity.id) as U) : (new DomainClass(entity) as U);
}

export function mapToEntity<U extends Domain<any> | ValueObject<any>, T extends CoreEntity>(
  domain: U,
  EntityClass: new () => T,
): T {
  const entity = new EntityClass();
  if (domain instanceof Domain) {
    Object.assign(entity, domain.props);
    entity.id = domain.getId();
  } else if (domain instanceof ValueObject) {
    Object.assign(entity, domain.getValues());
  }
  return entity;
}
