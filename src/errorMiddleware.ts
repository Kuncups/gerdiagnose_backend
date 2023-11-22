// errorMiddleware.ts
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Terjadi kesalahan:", err);
  res.status(500).send("Terjadi kesalahan internal");
};

export default errorMiddleware;
