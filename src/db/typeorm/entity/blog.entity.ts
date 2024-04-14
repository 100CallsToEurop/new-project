import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../core/orms/typeorm/postgres';

@Entity()
export class BlogEntity extends BaseEntity {
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  websiteUrl: string;
}
