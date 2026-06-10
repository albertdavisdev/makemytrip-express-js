import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};
