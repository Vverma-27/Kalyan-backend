import mongoose, { Schema } from "mongoose";
export interface IDonation {
  _id: mongoose.Types.ObjectId;
  from: Schema.Types.Mixed;
  to: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
}
