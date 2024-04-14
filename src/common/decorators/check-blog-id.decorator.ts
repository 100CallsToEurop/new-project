import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { BlogService } from '../../features/blog/application/service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsBlogIdExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly blogService: BlogService) {}

  async validate(blogId: string): Promise<boolean> {
    const blog = await this.blogService.getBlogById(blogId);
    return !!blog;
  }

  defaultMessage(): string {
    return 'blogId not found';
  }
}

export function IsBlogIdExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isBlogIdExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsBlogIdExistsConstraint,
      async: true,
    });
  };
}
