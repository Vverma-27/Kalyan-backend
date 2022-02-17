import { model, Schema } from "mongoose";
import { IDonation } from "./Donation.interfaces";

const DonationSchema = new Schema<IDonation>({
  from: {
    type: Schema.Types.Mixed,
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Donation = model<IDonation>("Donation", DonationSchema);

export default Donation;
