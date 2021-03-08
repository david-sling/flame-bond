import firebase from "firebase";
import dotenv from "dotenv";

dotenv.config();

firebase.initializeApp({
  apiKey: "AIzaSyCB6UQUehYoOHq7fbMgZwJpONU7CfkIxuM",
  authDomain: "react-firebase-cms-ac2fb.firebaseapp.com",
  projectId: "react-firebase-cms-ac2fb",
  storageBucket: "react-firebase-cms-ac2fb.appspot.com",
  messagingSenderId: "237255758081",
  appId: "1:237255758081:web:d7dbf3c1f70e580acf4b00",
});

export default firebase;
