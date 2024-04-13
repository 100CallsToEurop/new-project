import { Column, Entity } from 'typeorm';
import { AVAILABLE_RESOLUTIONS } from '../../../features/video/domain';
import { BaseEntity } from '../../../core/orms/typeorm/postgres';

@Entity('videos')
export class VideoEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ default: false })
  canBeDownloaded: boolean;

  @Column({ nullable: true, default: null })
  minAgeRestriction: number;

  @Column()
  createdAt: Date;

  @Column()
  publicationDate: Date;

  @Column('enum', {
    enum: AVAILABLE_RESOLUTIONS,
    array: true,
    nullable: true,
    default: [AVAILABLE_RESOLUTIONS.P144],
  })
  availableResolutions: AVAILABLE_RESOLUTIONS[];
}
