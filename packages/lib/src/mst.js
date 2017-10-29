//@ts-check
import isString from "lodash.isstring";
import { isStateTreeNode } from "mobx-state-tree";
import shortid from "shortid";
import initializeWalkieTalkie, {
  attachHandlers,
  emitChange,
  emitInitialize
} from "./walkieTalkie";
import globalState from "./globalTrackingState";
import {
  inspect as inspectMst,
  handleSnapshotUpdate,
  handlePatchUpdate,
  startRecording,
  stopRecording,
  playRecording
} from "./mobxStateTreeTracker";
import { executeAction } from "./actionExecutor";
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

export function inspect(name, thingToTrack) {
  if (!isString(name)) {
    throw new Error("First parameter should be a string.");
  }

  if (isStateTreeNode(thingToTrack)) {
    inspectMst(name, thingToTrack);
  } else {
    throw new Error("This is not a MST node.");
  }
}
