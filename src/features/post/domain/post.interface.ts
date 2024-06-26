
export interface IPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;

  update(updatedPost: Partial<IPost>): void;
}
