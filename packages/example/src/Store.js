import {
  observable,
  computed,
  extendObservable,
  action,
  useStrict
} from "mobx";
import { wiretap, inspect } from "mobx-inspect";

wiretap();

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
export default store;
