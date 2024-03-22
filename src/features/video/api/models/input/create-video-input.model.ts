import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { AVAILABLE_RESOLUTIONS } from '../../../domain';

export class CreateVideoInputModel {
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  readonly author: string;
  @IsArray()
  @IsEnum(AVAILABLE_RESOLUTIONS, { each: true })
  readonly availableResolutions: AVAILABLE_RESOLUTIONS[];
}
