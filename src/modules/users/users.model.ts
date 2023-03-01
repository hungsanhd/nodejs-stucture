import mongoose, { Document } from "mongoose";
import IUser from "./users.interface";

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  referral_code: {
    type: String,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<IUser & Document>("user", UserSchema);
