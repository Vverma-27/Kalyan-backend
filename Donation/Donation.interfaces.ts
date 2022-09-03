import mongoose, { Schema } from "mongoose";
export interface IDonation {
  _id: mongoose.Types.ObjectId;
  amount: number;
  transactionId: string;
  verified: boolean;
  type: "o" | "r";
  // identifier: string;
}
