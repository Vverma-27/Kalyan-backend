import express from "express";
import v2 from "../config/cloudinary";
import authDecode from "../middleware/authMiddleware";
import User from "./User.model";
class UserController {
  private router: express.Router;
  private route = "/users";
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.route}/auth`, authDecode, this.loginSponsor);
    this.router.get(`${this.route}/me`, authDecode, this.getCurrentUser);
    this.router.put(`${this.route}`, authDecode, this.updateCurrentUser);
    this.router.get(`${this.route}`, this.getSponsors);
  }
  private async getSponsors(req: express.Request, res: express.Response) {
    try {
      const sponsors = await User.find()
        .sort({ amountDonated: -1 })
        .limit(10)
        //@ts-ignore
        .skip(req.query.page * 10);
      const totalCount = await User.countDocuments();
      res.status(200).json({ sponsors, results: totalCount });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
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
  private async updateCurrentUser(req: express.Request, res: express.Response) {
    try {
      //@ts-ignore
      const { uuid } = req.user;
      //@ts-ignore
      const image = req.file;
      console.log(image);
      if (image) {
        const { secure_url: picture, public_id } = await v2.uploader.upload(
          image.path
        );
        req.body.profilePicture = picture;
      }
      const user = await User.findOneAndUpdate(
        {
          uuid,
        },
        req.body,
        { new: true }
      );
      console.log(user);
      res.json({ user });
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
