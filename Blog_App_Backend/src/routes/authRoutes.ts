import express from "express";
import bcrypt from "bcryptjs";
import { loginService, register } from "../service/userService";
import { createResponse } from "../utils/responseWrapper";
import { blogMessages, userMessage } from "../constants/messages";

const router = express.Router();

router.post("/register", async (req: any, res: any) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json(createResponse(blogMessages.missing.fields, {}, "Missing fields"));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const registeredUser = await register(email, username, hashedPassword);

    return res
      .status(201)
      .json(createResponse(userMessage.success.create, registeredUser));
  } catch (error) {
    const errMsg = (error as Error).message;

    if (errMsg === "User already exists") {
      return res
        .status(409)
        .json(createResponse(errMsg, {}, "Conflict"));
    }

    return res
      .status(500)
      .json(createResponse(userMessage.error.internal, {}, errMsg));
  }
});

router.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(createResponse(userMessage.missing.fields, {}, "Missing fields"));
  }

  try {
    const token = await loginService(email, password);

    if (!token) {
      return res
        .status(401)
        .json(createResponse(userMessage.error.invalid_credentials, {}, "Unauthorized"));
    }

    return res
      .status(200)
      .json(createResponse(userMessage.success.login, { token }));
  } catch (err) {
    return res
      .status(500)
      .json(createResponse(userMessage.error.login, {}, err));
  }
});

export default router;
