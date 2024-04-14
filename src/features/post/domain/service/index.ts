import { BaseClass } from '../../../../core/classes';
import { IUpdate, UPDATE } from './update.case';

export class PostService extends BaseClass implements IUpdate {
  update = UPDATE;
}
