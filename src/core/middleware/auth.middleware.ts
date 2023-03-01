import { Logger } from "@core/utils";
import { DataStoredInToken } from "@modules/auth";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Không có token, uỷ quyền bị từ chối." });
  try {
    const user = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as DataStoredInToken;
    if (!req.user) req.user = { id: "" };
    req.user.id = user.id;
    next();
  } catch (error: any) {
    Logger.error(`[ERROR] Msg: ${token}`);
    if (error.name == "TokenExpiredError") {
      res.status(401).json({ message: "Token đã hết hạn" });
    } else {
      res.status(401).json({ message: "Token không hợp lệ" });
    }
  }
};

export default authMiddleware;
