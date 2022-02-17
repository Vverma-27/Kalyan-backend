import { Schema, model } from "mongoose";
import { IUser } from "./User.interfaces";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
  },
  profilePicture: { type: String, required: true },
  amountDonated: { type: Number },
  badge: { type: String },
});

const User = model<IUser>("User", UserSchema);

export default User;
