import React from "react";
import ReactDOM from "react-dom";
import webWidgetReact from "@web-widget/web-widget-react";
import { App, styles } from "./App.jsx";

export default webWidgetReact({
  React,
  ReactDOM,
  rootComponent: App,
  styles,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    // https://reactjs.org/docs/error-boundaries.html
    return null;
  },
});
