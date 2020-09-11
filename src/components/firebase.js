import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
require("dotenv").config();
const config = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_URL,
  projectId: process.env.REACT_APP_ID,
};

Firebase.initializeApp(config);
export default Firebase;
