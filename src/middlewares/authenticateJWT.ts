import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
  expiration_date : string
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
     res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
       res.status(401).json({ message: "Unauthorized" });
    }

    const { userId } = decoded as JwtPayload;
    req['userId'] = userId;  

    next();  
  });
};
