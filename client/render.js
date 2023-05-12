import React from "react";
import ReactDOM from "react-dom";
import { Router } from '@reach/router'
import { Provider } from "react-redux";
import serverData from './utils/server-data'
import getStore from "./redux/store";
import App from './app'

const store = getStore(serverData)

let root = document.getElementById("root")
if (!root) {
  root = document.createElement('div')
  document.body.appendChild(root)
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App path="*" />
    </Router>
  </Provider>,
  root,
);

