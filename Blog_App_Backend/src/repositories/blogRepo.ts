import { where } from "sequelize";
import blogs from "../models/blogs";
import Favourites from "../models/favorites";
import { IBlog, IGetBlogs } from "../Interfaces/blogs";
import User from "../models/user";
import { Blog } from "../models/associations";

export const createBlog = async (blogData: IBlog) => {
  try {
    return await blogs.create({ ...blogData });
  } catch (error) {
    return { error: true, message: error };
  }
};

export const getAllBlogs = async (userId: number) => {
  try {
    const allBlogs = await Blog.findAll({
      include: [
        {
          model: User,
          as: "Users",
          attributes: ["id"],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "author",
          attributes: ["id", "username"],
        },
      ],
    });

    const result = allBlogs.map((blog: any) => {
      const blogJson = blog.toJSON();
      const author = blogJson.author?.username || null;

      delete blogJson.Users;
      delete blogJson.author;

      return {
        ...blogJson,
        isFavourite: (blogJson.Users?.length || 0) > 0,
        isMyBlog: blogJson.user_id === userId,
        author,
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { error: true, message: error };
  }
};

export const getMyBlogs = async (userId: number) => {
  try {
    const myBlogs = await Blog.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: User,
          as: "Users",
          where: { id: userId },
          required: false,
          attributes: ["id"],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "author",
          attributes: ["id", "username"],
        },
      ],
    });

    const result = myBlogs.map((blog: any) => {
      const blogJson = blog.toJSON();
      const author = blogJson.author?.username || null;

      delete blogJson.Users;
      delete blogJson.author;

      return {
        ...blogJson,
        isFavourite: (blogJson.Users?.length || 0) > 0,
        isMyBlog: blogJson.user_id === userId,
        author,
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching my blogs:", error);
    return { error: true, message: error };
  }
};

export const getMyFavouriteBlogs = async (userId: number) => {
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Blog,
          as: "Blogs",
          required: false,
          attributes: [
            "id",
            "title",
            "content",
            "description",
            "image_url",
            "user_id",
            "created_at",
            "updated_at",
          ],
          through: { attributes: [] },
          include: [
            {
              model: User,
              as: "author",
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    if (!user) return [];

    const result = (user.get("Blogs") as any[]).map((blog: any) => {
      const blogJson = blog.toJSON();
      const author = blogJson.author?.username || null;

      delete blogJson.author;

      return {
        ...blogJson,
        author,
        isFavourite: true,
        isMyBlog: blogJson.user_id === userId,
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching favorite blogs:", error);
    return { error: true, message: error };
  }
};

export const updateBlog = async (blogData: IBlog, blogId: number) => {
  try {
    const blog = await blogs.findByPk(blogId);
    if (!blog) return null;

    const updateBlog = await blogs.update(
      { ...blogData },
      {
        where: {
          id: blogId,
          user_id: blogData.user_id,
        },
      }
    );
    return updateBlog;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const deleteBlog = async (blogId: number, userId: number) => {
  try {
    const existingBlog = await blogs.findByPk(blogId);
    if (!existingBlog) {
      return null;
    }
    const deleteBlog = await blogs.destroy({
      where: {
        id: blogId,
        user_id: userId,
      },
    });
    return deleteBlog;
  } catch (error) {
    return { error: true, message: error };
  }
};
