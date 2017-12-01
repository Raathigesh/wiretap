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
    const id = globalState.addObservable(thingToTrack);
    handleObservableArray(id, name, thingToTrack, thingToTrack);
  } else if (isObservable(thingToTrack)) {
    const id = globalState.addObservable(thingToTrack);
    handleObservableObject(id, name, thingToTrack, thingToTrack);
  } else {
    throw new Error(
      "The object you are trying to inspect is not an observable."
    );
  }
}

/**
 * Sends the provided array immediately.
 * Then observes the changes on the array.
 * Also tracks the changes on the array items.
 * @param {*} name
 * @param {*} observableArray
 */
function handleObservableArray(id, name, observableArray, thingToEmit) {
  let arrayItemObserverDisposables = [];
  emitChange({
    id,
    name,
    isMobx: true,
    value: toJS(thingToEmit)
  });

  observe(observableArray, change => {
    emitChange({
      id,
      isMobx: true,
      value: toJS(thingToEmit),
      action: change
    });

    // track array elements
    arrayItemObserverDisposables = observeArrayItems(
      id,
      observableArray,
      arrayItemObserverDisposables,
      thingToEmit
    );
  });

  // track array elements
  arrayItemObserverDisposables = observeArrayItems(
    id,
    observableArray,
    arrayItemObserverDisposables,
    thingToEmit
  );
}

function observeArrayItems(
  id,
  observableArray,
  observeDisposables,
  thingToEmit
) {
  observeDisposables.forEach(disposable => {
    disposable();
  });

  let arrayItemObserverDisposables = [];
  observableArray.forEach(observableItem => {
    const disposer = observe(observableItem, change => {
      emitChange({
        id,
        isMobx: true,
        value: toJS(thingToEmit),
        action: change
      });
    });
    arrayItemObserverDisposables.push(disposer);
  });

  return arrayItemObserverDisposables;
}

/**
   * Sends the provided object immediately.
   * Starts observing for changes.
   * @param {*} name
   * @param {*} observableObject
   */
function handleObservableObject(id, name, observableObject, thingToEmit) {
  let arrayItemObserverDisposables = [];

  const mobxActions = Object.getOwnPropertyNames(
    Object.getPrototypeOf(observableObject)
  ).filter(property => {
    if (observableObject[property]) {
      return observableObject[property].isMobxAction;
    }
    return false;
  });

  Object.getOwnPropertyNames(observableObject)
    .filter(propertyName => {
      return isObservableArray(observableObject[propertyName]);
    })
    .forEach(item => {
      handleObservableArray(id, null, observableObject[item], thingToEmit);
    });

  // observe the observable for futre updates
  observe(observableObject, change => {
    emitChange({
      id,
      isMobx: true,
      value: toJS(thingToEmit),
      action: change,
      actions: mobxActions
    });
  });

  // but also send the initial values to the dashboard
  emitChange({
    id,
    name,
    isMobx: true,
    value: toJS(thingToEmit),
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
