<div align="center">
  <img src="./docs/wiretap.png" alt="Wiretap" height="200">
  <h3 align="center">Mock data for your prototypes and demos</h3>
</div>

Monitor (Wiretap) your mobx observables and also allows to update your observables from the dashboard. Inspired by [Reactotron](https://github.com/infinitered/reactotron) which focus mainly on Redux.

## Features
- Monitor observables
- Update observables through the UI
- Log objects (A fancier console)
- And many more coming soon. Open an issue if you have a feature request.

## Get started

### Install the module
```
yarn add mobx-wiretap
```

### Initialize wiretap and start inspecting
```javascript
import {observable} from "mobx";
import { wiretap, inspect, log } from "mobx-inspect";

// This initializes the connection with the dashboard.
// You have to invoke this before any other methods from mobx-inspect
// Pass any name as the app name
wiretap("My awesome app");

const todos = observable([{
   text: "Watch narcos",
   completed: false
}])

// Now you are inspecting todos.
// Changes will reflect in the dashboard as your app changes them.
// First parameter is a mandotory label
inspect("Todos", todos);

// Just a fancier console.log
// First parameter is a mandotory label
log("Custom log", {
    text: "What's up?" 
});
```


# Thanks
Thanks [Alex Bergin](https://codepen.io/abergin/pen/XpwRpE)  for the awesome loading animation.
