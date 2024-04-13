import { AVAILABLE_RESOLUTIONS } from '../../../domain';

export class VideoViewModel {
  id: string;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AVAILABLE_RESOLUTIONS[];
}
