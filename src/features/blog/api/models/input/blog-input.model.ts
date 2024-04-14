import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class BlogInputModel {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(15)
  readonly name: string;
  @IsNotEmpty()
  @MaxLength(500)
  readonly description: string;
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(
    '^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$',
  )
  readonly websiteUrl: string;
}
