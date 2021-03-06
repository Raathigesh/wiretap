<img src="./docs/wiretap.png" alt="logo" height="120" align="right" />

# Mobx Wiretap

_The dev tool your mobx and mobx-state-tree app deserve_

<img src="./docs/wiretap.gif" alt="Wiretap" style="margin-top: 15px">

## What's Mobx Wiretap?
Mobx wiretap is an electron app which allows you to inspect your mobx and mobx-state-tree states during **development** time. This makes debugging easy and fun.

[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/mobx-wiretap/Lobby)

## Features
- Mobx
  - Live inspection of observable state
  - Update observable state
  - Listen to action logs
  - Invoke actions
- Mobx state tree
  - Live inspection of state tree
  - View action, snapshot and patch logs
  - Apply snapshots and patches
  - Invoke actions with arguments
  - Record and replay actions

## Getting started

### 1) Download the app
- [OS X](https://github.com/Raathigesh/wiretap/releases/download/v0.2.0/wiretap-0.2.0.dmg)
- [Windows](https://github.com/Raathigesh/wiretap/releases/download/v0.2.0/wiretap-setup-0.2.0.exe)

### 2) Install the npm module
```
yarn add mobx-wiretap --dev
```

### 3) Inspecting mobx observables
```javascript
import { observable } from "mobx";
import { wiretap, inspect } from "mobx-wiretap";

// Provide a name as the app name.
wiretap("My awesome app");

const todos = observable([{
   text: "Watch narcos",
   completed: false
}])

// Now you are inspecting todos.
// Changes will reflect in real time in the app.
// First parameter is a required label.
inspect("Todos", todos);
```

### 4) Inspecting Mobx-state-tree observables
```javascript
import { types } from "mobx-state-tree";
// Please note that you have to require from '/mst'.
import { wiretap, inspect } from "mobx-wiretap/mst";

// Provide a name as the app name.
wiretap("My awesome app");

const Todo = types.model("Todo", {
    title: types.string,
    done: false
}).actions(self => ({
    toggle() {
        self.done = !self.done
    }
}));

const todo = Todo.create({
    title: "Get coffee",
    done: false
});

// Now you are inspecting todos.
// Changes will reflect in real time in the app.
// First parameter is a required label.
inspect("Todo", todo);
```

Sometimes wiretap would not be able to auto-detect the actions from the mst observable you are tracking. In that case, you would be able to pass the action names as the third parameter as follows.

```javascript
inspect("Todo", todo, ['addTodo']);
```

### 5) Inspecting plain object with log()
```javascript
import { wiretap, log } from "mobx-wiretap";
wiretap("My awesome app");

// Call log
log("CustomObject", {
    question: "Are unicorns real?"
});
```

## Examples
- [Mobx example](https://github.com/Raathigesh/wiretap/tree/master/packages/example/mobx-example)
- [Mobx state tree example](https://github.com/Raathigesh/wiretap/tree/master/packages/example/mobx-state-tree-example)

## Connect to a specific port or a host
Wiretap usually listens on port `4000`. If port `4000` is already occupied, wiretap would start listening on a different port. You can find the port in the sidebar.

If wiretap is listening on port other than `4000`, you must provide the port when initializing. You could also provide a host.
```javascript
import { wiretap } from "mobx-wiretap";
wiretap("My awesome app", {
    host: 'http://localhost',
    port: 84585
});
```

## Mobx Wiretap Live (Experimental)
Mobx Wiretap Live is the same inspector but as a hosted app.

App: https://wiretap.debuggable.io/live/

### Initialize with the peer id
All you have to do is install `mobx-wiretap-remote` and initialize your connection with the ID presented to you on https://wiretap.debuggable.io/live/
```javascript
import { wiretap } from "mobx-wiretap-remote";
wiretap("My awesome app", {
    peerId: "<ID From https://wiretap.debuggable.io/live/>"
});
```
**But if you are worried about sending your data to an unknown service, not to worry, your app data is NOT sent to a centralized server. Instead the app uses WebRTC - peer to peer connection and sends the data directly to the peer. So your app is a peer and the inspector tab is another peer.**
## FAQ
<details>
  <summary>How does this differ from mobx-dev-tools?</summary>

Mobx-dev-tools is an awesome tool to inspect your react app and see how the UI reacts to state changes. Wiretap focuses more on the state itself. You would still need mobx-dev-tools to keep an eye on the react components.
</details>

## The road ahead
 - Support for mobx computed properties.
 - Support for mobx-state-tree views.
 - Support for react native.

 ### Looking for your suggestions
 Let me know what you want to see in wiretap. Go right ahead and share your feedback and thoughts by creating an issue.

## Contribute
- Go into `packages/app` directory
- Do `yarn install`
- Run `yarn dev` to start the app

## Inspiration
Inspired by [Reactotron](https://github.com/infinitered/reactotron).

## Thanks
Thanks [Alex Bergin](https://codepen.io/abergin/pen/XpwRpE)  for the awesome loading animation.

## License
MIT © [Raathigeshan](https://twitter.com/Raathigeshan)


