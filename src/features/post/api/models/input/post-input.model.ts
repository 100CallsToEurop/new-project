import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class PostInputModel {
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string;
  @IsNotEmpty()
  @MaxLength(100)
  readonly shortDescription: string;
  @IsNotEmpty()
  @MaxLength(1000)
  readonly content: string;
  @IsNotEmpty()
  @IsUUID()
  readonly blogId: string;
}
