import admin from "firebase-admin";
import serviceAccount from "./firestore-private-key.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // used for local testing
  // credential: admin.credential.applicationDefault(), // uncomment for deployment
  databaseURL: "https://geekout-api-demo.firebaseio.com",
});

const db = admin.firestore();
export { db, admin };
