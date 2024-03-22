import { AVAILABLE_RESOLUTIONS } from '../../../domain';

export type CreateVideoType = {
  readonly title: string;
  readonly author: string;
  readonly availableResolutions: AVAILABLE_RESOLUTIONS[];
};
