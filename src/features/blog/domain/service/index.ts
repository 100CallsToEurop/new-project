import { BaseClass } from '../../../../core/classes';
import { IUpdate, UPDATE } from './update.case';

export class BlogService extends BaseClass implements IUpdate {
  update = UPDATE;
}
