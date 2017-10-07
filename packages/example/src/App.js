import React, { Component } from "react";
import store from "./Store";
import { observer } from "mobx-react";
let index = 0;
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <h1>{store.appInfo.version}</h1>
          <h1>{store.appInfo.license}</h1>
          <button
            onClick={() => {
              store.appInfo.version = `${store.appInfo.version} ${index}`;
              index++;
            }}
          >
            Update Version
          </button>
          {store.todos.map(item => {
            return <div>{item.name}</div>;
          })}
        </header>
      </div>
    );
  }
}

export default observer(App);
