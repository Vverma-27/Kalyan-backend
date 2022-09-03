import { model, Schema } from "mongoose";
import { IDonation } from "./Donation.interfaces";

const DonationSchema = new Schema<IDonation>({
  amount: {
    type: Number,
    required: true,
  },
  transactionId: { type: String, required: true },
  type: { type: String, required: true },
  // identifier: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

const Donation = model<IDonation>("Donation", DonationSchema);

export default Donation;
