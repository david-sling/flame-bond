import React from "react";
import { Route, Switch } from "react-router";
import Collection from "./Collection";
import Dashboard from "./Dashboard";
import EditEntry from "./EditEntry";
import NewEntry from "./NewEntry";

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
        <Route exact path="/:collectionId/new">
          <NewEntry {...props} />
        </Route>
        <Route exact path="/:collectionId/:entryId">
          <EditEntry {...props} />
        </Route>
      </Switch>
    </div>
  );
}
