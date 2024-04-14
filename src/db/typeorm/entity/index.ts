import { VideoEntity } from './video.entity';
import { BlogEntity } from './blog.entity';
import { PostEntity } from './post.entity';

export * from './video.entity';
export * from './post.entity';
export * from './blog.entity';

export const ENTITIES = [VideoEntity, BlogEntity, PostEntity];
