import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../../../shared/core.entity';

@Entity({ name: 'notifications' })
export class Notification extends CoreEntity {
  @Column('varchar', { name: 'recipient', length: 150 })
  recipient: string;

  @Column('text', { name: 'message' })
  message: string;

  @Column('varchar', { name: 'status', length: 20 })
  status: string;

  @Column('datetime', { name: 'schedule_time', nullable: true })
  notifyTime?: Date;
}
