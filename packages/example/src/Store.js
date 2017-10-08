import {
  observable,
  computed,
  extendObservable,
  action,
  useStrict,
  extras
} from "mobx";

import { wiretap, inspect, log } from "mobx-inspect";

extras.shareGlobalState();
wiretap("Sample app");

class Store {
  constructor() {
    this.appInfo = observable({
      version: "0.1.0",
      license: "MIT"
    });

    this.todos = observable([
      {
        name: "Watch Narcos"
      },
      {
        name: "Release Mobx Wiretap"
      },
      {
        name: "Add support for Mobx-state-tree"
      }
    ]);

    extendObservable(this, {
      get getLisense() {
        return this.appInfo.license + ">>";
      },
      tick: action(function() {
        this.appInfo.license = "David";
      })
    });
  }
}

const store = new Store();
inspect("Store", store);
inspect("App Info", store.appInfo);
inspect("Todos", store.todos);
setTimeout(() => {
  store.tick();
}, 3000);
log("customLog", {
  Name: 22323
});

log("two", "Whats up");
export default store;
