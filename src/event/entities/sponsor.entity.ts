import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('sponsors', { schema: 'core' })
export class SponsorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'name',
    type: 'text',
    nullable: false,
  })
  name: string;

  fileId: string;


  @ManyToOne(() => EventEntity, {nullable: false})
  @JoinColumn({
    name: 'event_id',
    foreignKeyConstraintName: 'sponsor_event_id',
  })
  event: EventEntity;
}
