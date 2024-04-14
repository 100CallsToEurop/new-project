import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IsBlogIdExists } from '../../../../../common/decorators';
import { Transform, TransformFnParams } from 'class-transformer';

export class PostInputModel {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(1)
  @MaxLength(30)
  readonly title: string;
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(1)
  @MaxLength(100)
  readonly shortDescription: string;
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(1)
  @MaxLength(1000)
  readonly content: string;
  @IsBlogIdExists()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(1)
  @IsUUID()
  readonly blogId: string;
}
