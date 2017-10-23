import "todomvc-common";
import TodoStore from "./stores/TodoStore";
import ViewStore from "./stores/ViewStore";
import TodoApp from "./components/todoApp.js";
import React from "react";
import ReactDOM from "react-dom";
import { map } from "mobx";

const initialState =
  (window.initialState && JSON.parse(window.initialState)) || {};

import { wiretap, inspect, log } from "mobx-wiretap";
wiretap("Todo");

var todoStore = new TodoStore();
var viewStore = new ViewStore();

inspect("Todos", todoStore);
inspect("Todos Array", todoStore.todos);
log("Sting", "Is this even work now?");
log("Obj", {
  value: 5
});
ReactDOM.render(
  <TodoApp todoStore={todoStore} viewStore={viewStore} />,
  document.getElementById("todoapp")
);

if (module.hot) {
  module.hot.accept("./components/todoApp", () => {
    var NewTodoApp = require("./components/todoApp").default;
    ReactDOM.render(
      <NewTodoApp todoStore={todoStore} viewStore={viewStore} />,
      document.getElementById("todoapp")
    );
  });
}
