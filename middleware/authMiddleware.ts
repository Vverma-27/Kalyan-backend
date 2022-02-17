import app from "../config/firebase-admin";
import express from "express";
import { getAuth } from "firebase-admin/auth";

const authDecode = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const header = req.headers?.authorization;
  if (
    header !== "Bearer null" &&
    req.headers?.authorization?.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      const decodeValue = await getAuth().verifyIdToken(token);
      if (decodeValue) {
        //@ts-ignore
        req.user = decodeValue;
        console.log(decodeValue);
        next();
      } else {
        return res
          .status(401)
          .json({ msg: "Action Not authorized! Invalid Token!" });
      }
    } catch (e) {
      if (e.code === "auth/argument-error") {
        return res
          .status(401)
          .json({ msg: "Action Not authorized! Invalid Token!" });
      }
      console.log(e);
      return res.status(500).json({ msg: "Something went wrong!" });
    }
  } else {
    res.status(401).json({ msg: "Action Not authorized! User Not Logged In!" });
  }
};
export default authDecode;
