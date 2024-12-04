import { register } from 'module';
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

@Entity('registrations')
export class RegistrationEntity {
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
    type: 'timestamp',
    name: 'registreted_at',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  registeredAt: Date;

  @Column({
    type: Boolean,
    name: 'attended',
    nullable: false,
    default: false,
  })
  attended: boolean;

  @ManyToOne(() => EventEntity)
  @JoinColumn({
    name: 'event_id',
    foreignKeyConstraintName: 'registration_event_id_foreign_key',
  })
  event: EventEntity;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  user: string;
}
