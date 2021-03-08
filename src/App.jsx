import React, { useEffect, useState } from "react";
import "./App.scss";
import Login from "./pages/auth/Login";

import useLocalStorage from "./hooks/useLocalStorage";
import firebase from "./services/firebase";
import User from "./pages/app";

export default function App() {
  const [user, setUser] = useLocalStorage("user");
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged(function (u) {
      if (u) {
        setUser(u);
        console.log("Logged In");
      } else {
        console.log("Logged Out");
        setUser(null);
      }
      setLoading(false);
    });
    // setLoading(false);
  }, []);

  if (!user) return <Login />;

  return <User user={user} />;
}
