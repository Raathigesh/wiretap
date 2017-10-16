import { observe, isObservable, isObservableArray, toJS } from "mobx";
import initializeWalkieTalkie, { emitChange } from "./walkieTalkie";
import globalState from "./globalTrackingState";
/**
 * Starts observing the provided thing and sends changes to the server
 * @param {*} name
 * @param {*} thingToTrack
 */
export function inspect(name, thingToTrack) {
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

/**
 * Sends the provided array immediately.
 * Then observes the changes on the array.
 * Also tracks the changes on the array items.
 * @param {*} name
 * @param {*} observableArray
 */
function handleObservableArray(name, observableArray) {
  const id = globalState.addObservable(observableArray);

  emitChange({
    id,
    name,
    isMobx: true,
    value: toJS(observableArray)
  });

  observe(observableArray, change => {
    emitChange({
      id,
      isMobx: true,
      value: toJS(observableArray),
      action: change
    });
  });

  // track array elements
  observableArray.forEach(observableItem => {
    observe(observableItem, change => {
      emitChange({
        id,
        isMobx: true,
        value: toJS(observableArray),
        action: change
      });
    });
  });
}

/**
   * Sends the provided object immediately.
   * Starts observing for changes.
   * @param {*} name
   * @param {*} observableObject
   */
function handleObservableObject(name, observableObject) {
  const id = globalState.addObservable(observableObject);

  const mobxActions = Object.getOwnPropertyNames(
    Object.getPrototypeOf(observableObject)
  ).filter(property => {
    return observableObject[property].isMobxAction;
  });

  // observe the observable for futre updates
  observe(observableObject, change => {
    emitChange({
      id,
      isMobx: true,
      value: toJS(observableObject),
      action: change,
      actions: mobxActions
    });
  });

  // if there is an array, listen to that array as well
  Object.getOwnPropertyNames(observableObject)
    .filter(propertyName => isObservableArray(observableObject[propertyName]))
    .forEach(item => {
      observe(observableObject[item], change => {
        emitChange({
          id,
          isMobx: true,
          value: toJS(observableObject),
          action: change,
          actions: mobxActions
        });
      });
    });

  // but also send the initial values to the dashboard
  emitChange({
    id,
    name,
    isMobx: true,
    value: toJS(observableObject),
    actions: mobxActions
  });
}

/**
   * Updates the observables with the data server sent
   * @param {*} payload
   */
export function handleUpdate({ trackerId, name, namespace, new_value }) {
  let observableThing = globalState.getObservable(trackerId);

  namespace.forEach(key => {
    observableThing = observableThing[key];
  });
  observableThing[name] = new_value;
}
