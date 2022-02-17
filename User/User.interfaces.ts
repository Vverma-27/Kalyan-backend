import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  number: number;
  amountDonated: number;
  badge: string;
  profilePicture: string;
  uid: string;
}
