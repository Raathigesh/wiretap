import "todomvc-common";
import TodoStore from "./stores/TodoStore";
import ViewStore from "./stores/ViewStore";
import TodoApp from "./components/todoApp.js";
import React from "react";
import ReactDOM from "react-dom";
import { map } from "mobx";
import { wiretap, inspect, log } from "mobx-wiretap";

const initialState =
  (window.initialState && JSON.parse(window.initialState)) || {};

wiretap("Todo");

var todoStore = new TodoStore();
var viewStore = new ViewStore();

// Mobx Integration
inspect("Todos", todoStore);
inspect("Todos Array", todoStore.todos);
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
