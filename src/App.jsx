import React, { useEffect, useState } from "react";
import "./App.scss";
import Login from "./pages/auth/Login";

import useLocalStorage from "./hooks/useLocalStorage";
import firebase from "./services/firebase";
import User from "./pages/app";
import Modal from "./components/Modal";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Alert from "./components/Alert";

export default function App() {
  const [user, setUser] = useLocalStorage("user");
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);

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

  if (!user)
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        <Alert onClose={() => setError(null)} severity="error" open={error}>
          {error}
        </Alert>
      </Router>
    );

  return (
    <>
      <User user={user} setError={setError} />
      <Modal />
    </>
  );
}
