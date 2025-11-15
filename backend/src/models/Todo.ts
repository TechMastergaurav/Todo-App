import mongoose from "mongoose";

export interface ITodo extends mongoose.Document {
  userId: string;
  title: string;
  notes?: string;
  completed: boolean;
  createdAt: Date;
}

const todoSchema = new mongoose.Schema<ITodo>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  notes: { type: String },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<ITodo>("Todo", todoSchema);
