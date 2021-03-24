import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import dotenv from "dotenv";
import params from "../../config/firebase";

dotenv.config();

firebase.initializeApp(params);

firebase.analytics();

export default firebase;
