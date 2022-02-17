import { applicationDefault, initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

const app = initializeApp({
  //@ts-ignore
  credential: admin.credential.cert(serviceAccount),
});

export default app;

// // Your web app's Firebase configuration

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
