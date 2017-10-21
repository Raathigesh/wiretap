//@ts-check
import isString from "lodash.isstring";
import { extras } from "mobx";
import { isStateTreeNode } from "mobx-state-tree";
import shortid from "shortid";
import initializeWalkieTalkie, {
  emitChange,
  emitInitialize
} from "./walkieTalkie";
import globalState from "./globalTrackingState";
import { inspect as inspectMobx, handleUpdate } from "./mobxTracker";
import {
  inspect as inspectStateTree,
  handleSnapshotUpdate,
  handlePatchUpdate,
  startRecording,
  stopRecording,
  playRecording
} from "./mobxStateTreeTracker";

extras.shareGlobalState();

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
  initializeWalkieTalkie(port, {
    onUpdate: payload => {
      handleUpdate(payload);
    },
    onExecuteAction: ({ id, name, args }) => {
      executeAction(id, name, args);
    },
    onApplySnapshot: payload => {
      handleSnapshotUpdate(payload);
    },
    onApplyPatch: payload => {
      handlePatchUpdate(payload);
    },
    onStartRecording: ({ id }) => {
      startRecording(id);
    },
    onStopRecording: ({ id, recordingId }) => {
      stopRecording(id, recordingId);
    },
    onPlayRecording: ({ id, recordingId }) => {
      playRecording(id, recordingId);
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
  if (isStateTreeNode(thingToTrack)) {
    inspectStateTree(name, thingToTrack, actions);
  } else {
    inspectMobx(name, thingToTrack);
  }
}

/**
 * Sends the provided values to the server.
 * Just sends the provided object as is. No fancy business.
 * @param {*} name
 * @param {*} obj
 */
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

function executeAction(id, name, args) {
  const observable = globalState.getObservable(id);
  // invoke the action with the args
  observable[name](...args);
}
