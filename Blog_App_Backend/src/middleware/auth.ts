import { verifyJwtToken } from "../utils/jwt";

export const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    const user = verifyJwtToken(token);
    if (!user) return res.sendStatus(403);
  
    req.user = user;
    next();
  };