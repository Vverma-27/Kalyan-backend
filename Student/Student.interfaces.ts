import mongoose from "mongoose";
export interface IStudent {
  name: string;
  age: number;
  class: string;
  parentInfo: {
    father: {
      name: string;
      age: number;
      occupation: string;
      income: number;
    };
    mother: {
      name: string;
      age: number;
      occupation: string;
      income: number;
    };
  };
  teacherRemarks: string;
  achievements: string[];
  hobbies: string[];
  donations: mongoose.Types.ObjectId[];
  address: {
    city: string;
    state: string;
    country: string;
    pincode: number;
  };
  phone: number;
}
