import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import dotenv from "dotenv";
import params from "../../config/firebase";

dotenv.config();

firebase.initializeApp(params);

export default firebase;
