//@ts-check
import isString from "lodash.isstring";

import { extras } from "mobx";
import shortid from "shortid";
import initializeWalkieTalkie, {
  attachHandlers,
  emitInitialize
} from "./walkieTalkie";
import { executeAction } from "./actionExecutor";
import { inspect as inspectMobx, handleUpdate } from "./mobxTracker";
export * from "./extras";

// extras.shareGlobalState();

/**
 * Initializes wiretap and establishes the connection with the server
 * @param {*} appName
 * @param {*} options
 */
export function wiretap(appName, options = {}) {
  if (!isString(appName)) {
    throw new Error("First parameter should be the application name.");
  }

  const port = options.port ? options.port : 4000;
  initializeWalkieTalkie(port, options.peerId);

  attachHandlers({
    onUpdate: payload => {
      handleUpdate(payload);
    },
    onExecuteAction: ({ id, name, args }) => {
      executeAction(id, name, args);
    }
  });

  // emits a reset event which clears the dashboard
  emitInitialize({
    app: appName
  });
}

export function inspect(name, thingToTrack, actions) {
  if (!isString(name)) {
    throw new Error("First parameter should be a string.");
  }

  inspectMobx(name, thingToTrack);
}
