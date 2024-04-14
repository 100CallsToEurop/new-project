import { IBlog } from '../blog.interface';
export interface IUpdate {
  update(updatedBlog: Partial<IBlog>): void;
}

export const UPDATE = function (this: IBlog, updatedBlog: Partial<IBlog>) {
  this.name = updatedBlog.name ?? this.name;
  this.description = updatedBlog.description ?? this.description;
  this.websiteUrl = updatedBlog.websiteUrl ?? this.websiteUrl;
};
