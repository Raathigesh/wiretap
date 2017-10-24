<img src="./docs/wiretap.png" alt="logo" height="120" align="right" />

# Mobx Wiretap

_The dev tool you and your mobx and mobx-state-tree apps deserve_

<img src="./docs/wiretap.gif" alt="Wiretap" style="margin-top: 15px">

## What's Mobx Wiretap?
Mobx wiretap is an electron app which allows you to inspect your mobx and mobx-state-tree states during **development** time. This makes debugging easy and fun.

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
- [OS X]()
- [Windows]()

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

### 5) Printing plain objects with log()
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

## FAQ
<details>
  <summary>How does this differ from mobx-dev-tools?</summary>

Mobx-dev-tools is an awesome tool to inspect your react app and see how the UI reacts to state changes. Wiretap focues more on the state itself. You would still need mobx-dev-tools to keep an eye on the react components.
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

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/2VtFmV65B5vo13VnsCfGqKU8/Raathigesh/wiretap'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/2VtFmV65B5vo13VnsCfGqKU8/Raathigesh/wiretap.svg' />
</a>
