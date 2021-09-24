import { Comment } from "./comment";

export interface Post {
  id?: number;
  name: string;
  description: string;
  location: string;
  image?: File;
  likes?: number;
  userLiked: string[];
  comments?: Comment[];
  username: string;
}