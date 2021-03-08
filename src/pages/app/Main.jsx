import React from "react";
import { Route, Switch } from "react-router";
import Collection from "./Collection";
import Dashboard from "./Dashboard";

export default function Main(props) {
  return (
    <div className="Main">
      <Switch>
        <Route exact path="/">
          <Dashboard {...props} />
        </Route>
        <Route exact path="/:collectionId">
          <Collection {...props} />
        </Route>
      </Switch>
    </div>
  );
}
