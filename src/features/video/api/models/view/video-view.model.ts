import { AVAILABLE_RESOLUTIONS } from '../../../domain';

export class VideoViewModel {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AVAILABLE_RESOLUTIONS[];
}
