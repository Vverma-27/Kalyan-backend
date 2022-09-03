import App from "./App";
import config from "./config";
import DonationController from "./Donation/Donation.controller";

const app = new App([new DonationController()], config.PORT);

app.listen();
