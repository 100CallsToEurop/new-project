import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AVAILABLE_RESOLUTIONS } from '../../../features/video/domain';

@Entity('videos')
export class VideoEntity {
  @PrimaryColumn()
  id: number;

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
