export interface IBlog {
  title: string;
  content: string;
  description: string;
  image_url: string;
  user_id: number;
}

export interface IGetBlogs {
  user_id: number;
  explore: boolean;
  myBlogs: boolean;
  favourites: boolean;
}
