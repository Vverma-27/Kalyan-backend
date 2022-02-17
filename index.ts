import App from "./App";
import config from "./config";
import DonationController from "./Donation/Donation.controller";
import StudentController from "./Student/Student.controller";
import UserController from "./User/User.controller";

const app = new App(
  [new UserController(), new StudentController(), new DonationController()],
  config.PORT
);

app.listen();
