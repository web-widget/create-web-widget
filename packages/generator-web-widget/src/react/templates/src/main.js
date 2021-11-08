import React from "react";
import ReactDOM from "react-dom";
import webWidgetReact from "web-widget-react";
import Root from "./root.component";

const lifecycles = webWidgetReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
