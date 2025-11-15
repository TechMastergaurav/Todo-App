import { Request, Response, NextFunction } from "express";
import Log from "../models/Log.js";

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    await Log.create({ message: err.message, stack: err.stack, route: req.path });
  } catch (e) {
    console.error("Failed to write log:", e);
  }
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
};
