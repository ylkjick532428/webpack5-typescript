import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import Root from "./root";
import MeetingApp from "./meeting";

const container: HTMLElement | null = document.getElementById("root");

if (container) {
  const router = (
    <Switch>
      <Route exact path="/" component={Root} />
      <Route path="/meeting" component={MeetingApp} />
    </Switch>
  );

  // During an update, there is no need to pass the container again
  ReactDOM.render(<Router>{router}</Router>, container);
}
