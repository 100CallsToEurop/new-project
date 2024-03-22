import { IVideo } from '../video.interface';

export interface IUpdateVideo {
  update(updatedVideo: Partial<IVideo>): void;
}

export const UPDATE_VIDEO = function (
  this: IVideo,
  updatedVideo: Partial<IVideo>,
) {
  this.title = updatedVideo.title ?? this.title;
  this.author = updatedVideo.author ?? this.author;
  this.canBeDownloaded = updatedVideo.canBeDownloaded ?? this.canBeDownloaded;
  this.minAgeRestriction =
    updatedVideo.minAgeRestriction ?? this.minAgeRestriction;
  this.createdAt = updatedVideo.createdAt ?? this.createdAt;
  this.publicationDate = updatedVideo.publicationDate ?? this.publicationDate;
  this.availableResolutions =
    updatedVideo.availableResolutions ?? this.availableResolutions;
};
