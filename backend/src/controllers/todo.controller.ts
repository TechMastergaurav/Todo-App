import { Request, Response, NextFunction } from "express";
import Todo from "../models/Todo.js";

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { title, notes } = req.body;
    if (!title) return res.status(400).json({ message: "title required" });

    const todo = await Todo.create({ userId, title, notes });
    res.json(todo);
  } catch (e) { next(e); }
};

export const listTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (e) { next(e); }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) { next(e); }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) { next(e); }
};
