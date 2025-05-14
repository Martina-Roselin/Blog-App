import express from "express";
import { Request, Response } from "express";
import {
  addFavouriteService,
  removeFavouriteService,
} from "../service/favouritesService";
import { createResponse } from "../utils/responseWrapper"; 
import { authenticateToken } from "../middleware/auth";
import { get } from "http";
import { getUserIdFromToken } from "../utils/jwt";
import { blogMessages } from "../constants/messages";

const router = express.Router();

router.post("/:id", authenticateToken, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(createResponse(blogMessages.missing.fields, {}, "Missing blog ID"));
    }

    const favouriteBlogs = await addFavouriteService({
      user_id: getUserIdFromToken(req.headers["authorization"]),
      blog_id: parseInt(id),
    });

    if (favouriteBlogs === null) {
      return res
        .status(409)
        .json(createResponse(blogMessages.error.already_favourited, {}, null));
    }

    return res
      .status(200)
      .json(createResponse(blogMessages.success.favourite, favouriteBlogs));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(blogMessages.error.internal, {}, error));
  }
});

router.delete("/:id", authenticateToken , async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(createResponse(blogMessages.missing.fields, {}, "Missing blog ID"));
    }

    const favouriteBlogs = await removeFavouriteService({
      user_id: getUserIdFromToken(req.headers["authorization"]),
      blog_id: parseInt(id),
    });

    if (favouriteBlogs === null) {
      return res
        .status(409)
        .json(createResponse(blogMessages.error.favoutire_not_found, {}, null));
    }

    return res
      .status(200)
      .json(createResponse(blogMessages.success.unfavourite, favouriteBlogs));
  } catch (error) {
    return res
      .status(500)
      .json(createResponse(blogMessages.error.internal, {}, error));
  }
});

export default router;
