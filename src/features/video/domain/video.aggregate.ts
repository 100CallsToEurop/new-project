import { VideoService } from './service';
import { Logger } from '@nestjs/common';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  validateSync,
} from 'class-validator';
import {
  AVAILABLE_RESOLUTIONS,
  IVideo,
  IVideoResponse,
} from './video.interface';
import { addDays } from 'date-fns';

export class VideoAggregate extends VideoService implements IVideo {
  private readonly logger = new Logger(VideoAggregate.name);
  @IsNumber()
  @IsOptional()
  id: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  title: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  author: string;
  @IsBoolean()
  @IsOptional()
  canBeDownloaded: boolean;
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(18)
  minAgeRestriction: number;
  @IsDate()
  @IsOptional()
  createdAt: Date;
  @IsDate()
  @IsOptional()
  publicationDate: Date;
  @IsArray()
  @IsEnum(AVAILABLE_RESOLUTIONS, { each: true })
  availableResolutions: AVAILABLE_RESOLUTIONS[];

  private constructor() {
    super();
  }
  static create(video: Partial<IVideo>): VideoAggregate {
    const _video = new VideoAggregate();
    _video.id = +new Date();
    _video.title = video.title;
    _video.author = video.author;
    _video.canBeDownloaded = false;
    _video.minAgeRestriction = null;
    _video.createdAt = new Date();
    _video.publicationDate = addDays(_video.createdAt, 1);
    _video.availableResolutions = video.availableResolutions;

    const error = validateSync(_video);
    if (!!error.length) {
      error.forEach((e) => _video.logger.error(e.constraints));
      throw new Error('Testing not valid');
    }
    return _video;
  }

  static mapping(video: Partial<IVideo>): VideoAggregate {
    const _video = new VideoAggregate();
    _video.id = video.id;
    _video.title = video.title;
    _video.author = video.author;
    _video.canBeDownloaded = video.canBeDownloaded;
    _video.minAgeRestriction = video.minAgeRestriction;
    _video.createdAt = video.createdAt;
    _video.publicationDate = video.publicationDate;
    _video.availableResolutions = video.availableResolutions;

    const error = validateSync(_video);
    if (!!error.length) {
      error.forEach((e) => _video.logger.error(e.constraints));
      throw new Error('Video not valid');
    }
    return _video;
  }

  static BuildResponseVideo(video: IVideo): IVideoResponse {
    return {
      id: video.id,
      title: video.title,
      author: video.author,
      canBeDownloaded: video.canBeDownloaded,
      minAgeRestriction: video.minAgeRestriction,
      createdAt: video.createdAt.toISOString(),
      publicationDate: video.publicationDate.toISOString(),
      availableResolutions: video.availableResolutions,
    };
  }
}
