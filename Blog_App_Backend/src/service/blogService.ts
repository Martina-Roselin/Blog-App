import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getMyFavouriteBlogs,
  updateBlog,
} from "../repositories/blogRepo";
import { IBlog, IGetBlogs } from "../Interfaces/blogs";
export const createBlogService = async (blogData: IBlog) => {
  try {
    return await createBlog(blogData);;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const getAllBlogsService = async (blogData: IGetBlogs) => {
  try {
    if (blogData.explore) {
      const exploreBlogs = await getAllBlogs(blogData.user_id);
      return exploreBlogs;
    }
    if (blogData.myBlogs) {
      const myBlogs = await getMyBlogs(blogData.user_id);
      return myBlogs;
    }
    if (blogData.favourites) {
      const myFavourites = await getMyFavouriteBlogs(blogData.user_id);
      return myFavourites;
    }
  } catch (error) {
    return { error: true, message: error };
  }
};

export const deleteBlogService = async (blogId: number, userId: number) => {
  try {
    return await deleteBlog(blogId, userId);
  } catch (error) {
    return { error: true, message: error };
  }
};

export const updateBlogService = async (blogData: IBlog, blogId: number) => {
  try {
    return await updateBlog(blogData, blogId);;
  } catch (error) {
    return { error: true, message: error };
  }
};
