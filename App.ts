import express from "express";
import mongoose from "mongoose";
import config from "./config";
import app from "./config/firebase-admin";
import cors from "cors";
import upload from "./config/multer";
import authDecode from "./middleware/authMiddleware";
class App {
  private app: express.Application;
  private port: number;
  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
  private initializeMiddlewares() {
    mongoose
      .connect(
        `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/?authSource=admin`
      )
      .then(() => {
        console.log("logged in to mongo");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(app);
    this.app.use(cors());
    this.app.use(upload.single("file"));
    this.app.use(express.json());
    // this.app.use(authDecode);
  }
  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use("/api/", controller.router);
    });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
