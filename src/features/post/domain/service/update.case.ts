import { IPost } from '../post.interface';

export interface IUpdate {
  update(updatedPost: Partial<IPost>): void;
}

export const UPDATE = function (this: IPost, updatedPost: Partial<IPost>) {
  this.title = updatedPost.title ?? this.title;
  this.shortDescription = updatedPost.shortDescription ?? this.shortDescription;
  this.content = updatedPost.content ?? this.content;
  this.blogId = updatedPost.blogId ?? this.blogId;
  this.blogName = updatedPost.blogName ?? this.blogName;
};
