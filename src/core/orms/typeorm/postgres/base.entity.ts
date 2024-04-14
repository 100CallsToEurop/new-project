import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryColumn('uuid')
  public id: string;
  @CreateDateColumn({ name: 'created_at', nullable: true })
  public createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  public updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  public deletedAt: Date;
}
