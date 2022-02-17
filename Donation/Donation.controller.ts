import express from "express";
import razorPayInstance from "../config/razorpay";
import Student from "../Student/Student.model";
import { v4 as uuidv4 } from "uuid";
import Donation from "./Donation.model";
class DonationController {
  private router: express.Router;
  private route = "/donations";
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(this.route, this.getAllDonations);
    this.router.get(`${this.route}/:id`, this.getDonationById);
    this.router.post(`${this.route}/:id`, this.donateToStudent);
  }
  private donateToStudent = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).send("Student not found");
      }
      var options = {
        amount: req.body.amount, // amount in the smallest currency unit
        currency: "INR",
        receipt: uuidv4(),
      };
      const order = await razorPayInstance.orders.create(options);
      console.log(order);
      const donation = await Donation.create({
        from: "anonymous",
        amount: order.amount,
        to: req.params.id,
        date: order.created_at,
      });
      student.donations.push(donation.id);
      res.json({ student, donation });
    } catch (err) {
      res.status(500).send(err);
    }
  };
  private getAllDonations = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      console.log("hello");
      const donations = await Donation.find();
      res.json({ donations });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };
  private getDonationById = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const donation = await Donation.findById(req.params.id);
      if (!donation) {
        return res.status(404).send("Donation not found");
      }
      res.json({ donation });
    } catch (err) {
      res.status(500).send(err);
    }
  };
}
export default DonationController;
