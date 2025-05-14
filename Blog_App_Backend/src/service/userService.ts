import { checkForExistingUser, createUser } from "../repositories/userRepo";
const bcrypt = require("bcryptjs");
import { generateJwtToken } from "../utils/jwt";
import { userMessage } from '../constants/messages'
export const register = async (
  email: string,
  username: string,
  password: string
) => {
  const exists = await checkForExistingUser(email);
  if (exists !== null) {
    throw new Error(userMessage.error.exists);
  }
  return await createUser({ email, username, password });
};

export const loginService = async (
  email: string,
  password: string
) => {
  const user = await checkForExistingUser(email);
  if (!user) {
    throw new Error(userMessage.error.not_found);
  }

  const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error(userMessage.error.invalid_credentials); 
      }

  const token = generateJwtToken(user.id, user.username, user.email);
  return token;
}


