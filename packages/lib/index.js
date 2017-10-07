import { observe, isObservable, isObservableArray, runInAction } from "mobx";
import io from "socket.io-client";
let socket = null;
const shortid = require("shortid");

const globalTrackingState = {};

export function wiretap(options = {}) {
  const port = options.port ? options.port : 4000;
  socket = io(`http://localhost:${port}`);
  socket.on("update", payload => {
    handleUpdate(payload);
  });
  // emits a reset event which clears the dashboard
  reset();
}

function handleUpdate(payload) {
  let observableThing = globalTrackingState[payload.trackerId];
  payload.namespace.forEach(key => {
    observableThing = observableThing[key];
  });
  observableThing[payload.name] = payload.new_value;
}

export function inspect(name, thingToTrack) {
  debugger;
  if (isObservableArray(thingToTrack)) {
    handleObservableArray(name, thingToTrack);
  } else if (isObservable(thingToTrack)) {
    handleObservableObject(name, thingToTrack);
  } else {
    // if the thing provided thing for inspection is not an observable itself, interate the keys
    // and start tracking observable properties recursively. Don't you feel good when you implement a
    // recursion. I do every damn time!
    Object.keys(thingToTrack).forEach(key => {
      const nestedThingToTrack = thingToTrack[key];
      inspect(`${name}.${key}`, nestedThingToTrack);
    });
  }
}

function handleObservableArray(name, observableArray) {
  const id = shortid.generate();
  globalTrackingState[id] = observableArray;
  emit({
    id,
    name,
    value: observableArray
  });
}

function handleObservableObject(name, observableObject) {
  const id = shortid.generate();
  globalTrackingState[id] = observableObject;
  // observe the observable for futre updates
  observe(observableObject, () => {
    emit({
      id,
      name,
      value: observableObject
    });
  });

  // but also send the initial values to the dashboard
  emit({
    id,
    name,
    value: observableObject
  });
}

function emit(payload) {
  socket.emit("change", payload);
}

function reset() {
  socket.emit("reset", {});
}
