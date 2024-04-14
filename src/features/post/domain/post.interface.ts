
export interface IPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;

  update(updatedPost: Partial<IPost>): void;
}
