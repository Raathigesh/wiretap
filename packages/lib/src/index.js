import isString from "lodash.isstring";
import {
  observe,
  isObservable,
  isObservableArray,
  runInAction,
  spy,
  extras,
  whyRun
} from "mobx";
import initializeWalkieTalkie, {
  emitChange,
  emitSpy,
  emitInitialize
} from "./walkieTalkie";
const shortid = require("shortid");

extras.shareGlobalState();
const globalTrackingState = {};

export function wiretap(appName, options = {}) {
  if (!isString(appName)) {
    throw new Error("First parameter should be the application name.");
  }

  const port = options.port ? options.port : 4000;
  initializeWalkieTalkie(port, {
    onUpdate: payload => {
      handleUpdate(payload);
    }
  });

  // emits a reset event which clears the dashboard
  emitInitialize({
    app: appName
  });
}

export function inspect(name, thingToTrack) {
  if (!isString(name)) {
    throw new Error("First parameter should be a string.");
  }

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

export function log(name, obj) {
  if (!isString(name)) {
    throw new Error("First parameter should be a string.");
  }

  const id = shortid.generate();
  emitChange({
    id,
    name,
    value: obj,
    isObservable: false
  });
}

function handleObservableArray(name, observableArray) {
  const id = shortid.generate();
  globalTrackingState[id] = observableArray;
  emitChange({
    id,
    name,
    value: observableArray,
    isObservable: true
  });
}

function handleObservableObject(name, observableObject) {
  const id = shortid.generate();
  globalTrackingState[id] = observableObject;
  // observe the observable for futre updates
  observe(observableObject, change => {
    emitChange({
      id,
      name,
      value: observableObject,
      isObservable: true,
      changeDescription: {}
    });
  });

  // but also send the initial values to the dashboard
  emitChange({
    id,
    name,
    value: observableObject,
    isObservable: true
  });
}

function handleUpdate(payload) {
  let observableThing = globalTrackingState[payload.trackerId];
  payload.namespace.forEach(key => {
    observableThing = observableThing[key];
  });
  observableThing[payload.name] = payload.new_value;
}

// not yet exposed
function startSpying() {
  spy(event => {
    if (event.type === "action") {
      emitSpy({
        name: event.type,
        data: event
      });
    }
  });
}
