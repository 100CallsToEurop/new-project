import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CreateVideoInputModel } from './create-video-input.model';

export class UpdateVideoInputModel extends CreateVideoInputModel {
  @IsBoolean()
  @IsOptional()
  readonly canBeDownloaded: boolean;
  @Min(1)
  @Max(18)
  @IsNumber()
  @IsOptional()
  readonly minAgeRestriction: number;
  @IsString()
  @IsOptional()
  readonly publicationDate: string;
}
