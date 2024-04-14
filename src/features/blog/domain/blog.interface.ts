export interface IBlog {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;

  update(updatedBlog: Partial<IBlog>): void;
}
