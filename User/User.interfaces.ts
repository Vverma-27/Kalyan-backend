import mongoose from "mongoose";

export enum badges {
  "Sponsor",
  "Super Sponsor",
  "Philanthropist",
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  number: number;
  amountDonated: number;
  badge: badges;
  profilePicture: string;
  uid: string;
}
