import { BaseClass } from '../../../../core/classes';
import { IUpdateVideo, UPDATE_VIDEO } from './update.case';

export class VideoService extends BaseClass implements IUpdateVideo {
  update = UPDATE_VIDEO;
}
