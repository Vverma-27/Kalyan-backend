import { Schema, model } from "mongoose";
import { IStudent } from "./Student.interfaces";

const StudentSchema = new Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  age: { type: Number, required: true },
  parentInfo: {
    father: {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      occupation: { type: String, required: true },
      income: { type: Number, required: true },
    },
    mother: {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      occupation: { type: String, required: true },
      income: { type: Number, required: true },
    },
  },
  teacherRemarks: { type: String, required: true },
  achievements: [{ type: String }],
  hobbies: [{ type: String }],
  address: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
  },
  phone: { type: Number, required: true },
  donations: [{ type: Schema.Types.ObjectId, ref: "Donation" }],
});

const Student = model<IStudent>("Student", StudentSchema);

export default Student;
