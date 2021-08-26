import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import reducer from "./store/reducers";
import Node from "./components/Node";
import MainLayout from "./components/Layout"
import Card from "./components/Card";

let tree = {
  0: {
    id: 0,
    name: "root",
    childIds: [],
  },
};

// const tree = generateTree()
const store = createStore(reducer, tree);
render(
  <Provider store={store}>
    <MainLayout>
      <Card>
      <Node id={0} />
      </Card>
    </MainLayout>
  </Provider>,
  document.getElementById("root")
);
