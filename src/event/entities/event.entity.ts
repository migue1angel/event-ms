import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity } from './catalogue.entity';
import { SponsorEntity } from './sponsor.entity';
import { RegistrationEntity } from './registration.entity';
import { AddressEntity } from './address.entity';
import { TicketTypeEntity } from './ticket-type.entity';

@Entity('events', { schema: 'core' })
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    select:false,
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'description',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'timestamp',
    name: 'start_date',
    nullable: false,
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
    name: 'end_date',
    nullable: false,
  })
  endDate: Date;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({
    name: 'status_id',
    foreignKeyConstraintName: 'event_status_id',
  })
  state: CatalogueEntity;

  @Column({
    type: 'boolean',
    name: 'is_public',
    nullable: false,
  })
  isPublic: boolean;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({
    name: 'category_id',
    foreignKeyConstraintName: 'event_catalogue_id_foreign_key',
  })
  category: CatalogueEntity;

  @Column({
    name: 'organizer_id', //userId
    type: 'uuid',
  })
  organizer: string;

  @ManyToOne(() => AddressEntity, {nullable:false})
  @JoinColumn({
    name: 'address_id',
    foreignKeyConstraintName: 'event_address_id_foreign_key',
  })
  address: AddressEntity;

  @Column({
    type: 'boolean',
    name: 'hasSponsors',
    nullable: true,
  })
  hasSponsors: boolean;

  @OneToMany(() => SponsorEntity, (sponsor) => sponsor.event)
  sponsors: SponsorEntity[];

  @OneToMany(() => RegistrationEntity, (registration) => registration.event)
  registrations: RegistrationEntity[];

  @OneToMany(() => TicketTypeEntity, (ticket_type) => ticket_type.event)
  ticketTypes: TicketTypeEntity[];

}
