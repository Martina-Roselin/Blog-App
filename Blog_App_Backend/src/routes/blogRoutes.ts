import express from "express";
import {
  createBlogService,
  deleteBlogService,
  getAllBlogsService,
  updateBlogService,
} from "../service/blogService";
import { createResponse } from "../utils/responseWrapper";
import { authenticateToken } from "../middleware/auth";
import { getUserIdFromToken } from "../utils/jwt";
import { blogMessages } from "../constants/messages";

const router = express.Router();

router.post("/", authenticateToken, async (req: any, res: any) => {
  const { title, content, description, image_url } = req.body;

  if (!title || !content || !description || !image_url) {
    return res
      .status(400)
      .json(createResponse(blogMessages.missing.fields, {}, "Missing fields"));
  }

  try {
    const blogData = {
      title,
      content,
      description,
      image_url,
      user_id: getUserIdFromToken(req.headers["authorization"]),
    };
    const newBlog = await createBlogService(blogData);
    return res
      .status(200)
      .json(createResponse(blogMessages.success.create, newBlog));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(blogMessages.error.internal, {}, error));
  }
});

router.get("/", authenticateToken, async (req: any, res: any) => {
  const { explore, myBlogs, favourites } = req.query;

  try {
    const blogs = await getAllBlogsService({
      user_id: getUserIdFromToken(req.headers["authorization"]),
      explore: explore === "true",
      myBlogs: myBlogs === "true",
      favourites: favourites === "true",
    });

    return res
      .status(200)
      .json(createResponse(blogMessages.success.fetch, blogs));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(blogMessages.error.internal, {}, error));
  }
});

router.delete("/:id", authenticateToken, async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json(
        createResponse(blogMessages.missing.id_required, {}, "Missing blog ID")
      );
  }

  try {
    const userId = getUserIdFromToken(req.headers["authorization"]);
    const deletedBlog = await deleteBlogService(parseInt(id), userId);
    if (!deletedBlog) {
      return res
        .status(404)
        .json(createResponse(blogMessages.error.not_found, {}, null));
    }

    return res
      .status(200)
      .json(createResponse(blogMessages.success.delete, deletedBlog));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(blogMessages.error.internal, {}, error));
  }
});

router.put("/:id", authenticateToken, async (req: any, res: any) => {
  const { id } = req.params;
  const { title, content, description, image_url } = req.body;

  if (!title || !content || !description || !image_url || !id) {
    return res
      .status(400)
      .json(createResponse(blogMessages.missing.fields, {}, "Missing fields"));
  }

  try {
    const blogData = {
      id,
      title,
      content,
      description,
      image_url,
      user_id: getUserIdFromToken(req.headers["authorization"]),
    };

    const updatedBlog = await updateBlogService(blogData, parseInt(id));
    if (updatedBlog === null) {
      return res
        .status(404)
        .json(createResponse(blogMessages.error.not_found, {}, null));
    }

    return res
      .status(200)
      .json(createResponse(blogMessages.success.update, updatedBlog));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(blogMessages.error.internal, {}, error));
  }
});

export default router;
