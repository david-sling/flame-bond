import React from "react";
import "./App.scss";
import Login from "./pages/auth/Login";

import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [user, setUser] = useLocalStorage("user");

  if (!user) return <Login />;

  return <div>app</div>;
}
