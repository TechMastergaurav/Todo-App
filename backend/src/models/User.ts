import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name:string;
  email: string;
  password: string;
  resetToken?: string | null;
  resetExpires?: Date | null;
}

const userSchema = new mongoose.Schema<IUser>({
  name:{type:String},
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  resetToken: String,
  resetExpires: Date
}, { timestamps: true });

export default mongoose.model<IUser>("User", userSchema);
