import globalState from "./globalTrackingState";
export function executeAction(id, name, args) {
  const observable = globalState.getObservable(id);
  // invoke the action with the args
  observable[name](...args);
}
