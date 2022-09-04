import express from "express";
import config from "./config";
import cors from "cors";
import mongoose from "mongoose";
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
    this.app.use(cors());
    mongoose
      .connect(
        `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.w471pdz.mongodb.net/?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("logged in to mongo");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(app);
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
