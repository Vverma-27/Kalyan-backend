import express from "express";
import User from "./User.model";
class UserController {
  private router: express.Router;
  private route = "/users";
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.route}/auth`, this.loginSponsor);
    this.router.get(`${this.route}/me`, this.getCurrentUser);
  }
  private async getCurrentUser(req: express.Request, res: express.Response) {
    try {
      //@ts-ignore
      const { uuid } = req.user;
      const user = await User.findOne({
        uuid,
      });
      if (!user) return res.status(404).json({ msg: "User not found" });
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  }
  private async loginSponsor(req: express.Request, res: express.Response) {
    try {
      //@ts-ignore
      const { email, name, picture, uid } = req.user;
      const user = await User.findOne({ uid });
      if (user) return res.json({ user });
      const newUser = await User.create({
        email,
        name,
        profilePicture: picture,
        uid,
      });
      res.status(201).json({ user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  }
}
export default UserController;
