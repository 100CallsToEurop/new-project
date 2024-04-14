import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../core/orms/typeorm/postgres';

@Entity()
export class PostEntity extends BaseEntity {
  @Column()
  title: string;
  @Column()
  shortDescription: string;
  @Column()
  content: string;
  @Column()
  blogId: string;
  @Column()
  blogName: string;
}
