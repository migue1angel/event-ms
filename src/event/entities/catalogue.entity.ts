import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('catalogues')
export class CatalogueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    select: false,
    name: 'created_at',
    type: 'timestamp',
    nullable: true,
    default: ()=> 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;
  
  @DeleteDateColumn({
    select: false,
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminacion del archivo',
  })
  deletedAt: Date;

  @Column({
    name: 'name',
    type: 'varchar',
    unique:true,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'type',
    type: 'varchar',
    nullable: false,
  })
  type: string;
  
  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'code',
    type: 'int',
    nullable: false,
  })
  code: number;
}
