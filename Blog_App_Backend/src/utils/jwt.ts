
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION_TIME } from "../constants/jwt-constants";
dotenv.config();

const JWT_SECRET=process.env.SECRET_KEY || ""; 

export const generateJwtToken = (user_id: number, user_name: string, user_email: string) =>  {
  const token = jwt.sign(
    { id: user_id, username: user_name, email: user_email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION_TIME}
  );
  return token;
}

export const verifyJwtToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const decodeJwtToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    return null;
  }
}
export const getUserIdFromToken = (token_with_bearer: string) => {
    if (!token_with_bearer.startsWith('Bearer ')) {
      return null;
    }
  const token = token_with_bearer.split(' ')[1]
  const decoded = decodeJwtToken(token);
  if (decoded && typeof decoded === 'object' && 'id' in decoded) {
    return decoded.id;
  }
  return null;
}