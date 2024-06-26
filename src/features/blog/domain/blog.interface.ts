export interface IBlog {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  isMembership: boolean;

  update(updatedBlog: Partial<IBlog>): void;
}
