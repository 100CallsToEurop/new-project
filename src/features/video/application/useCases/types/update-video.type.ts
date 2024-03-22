import { AVAILABLE_RESOLUTIONS } from '../../../domain';

export type UpdateVideoType = {
  readonly title: string;
  readonly author: string;
  readonly availableResolutions: AVAILABLE_RESOLUTIONS[];
  readonly canBeDownloaded: boolean;
  readonly minAgeRestriction: number;
  readonly publicationDate: string;
};
