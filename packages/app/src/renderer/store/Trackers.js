import { observable, extendObservable, computed, action } from "mobx";
import io from "socket.io-client";
import moment from "moment";
import { uuid } from "../../utils/uuid";
const { ipcRenderer } = require("electron");
import Tracker from "./Tracker";
let socket = null;

class Trackers {
  constructor() {
    extendObservable(this, {
      connectionInfo: {
        port: null,
        app: ""
      },
      saved: {
        snapshots: new Map()
      },
      savedSnapshots: computed(() => {
        return this.saved.snapshots
          .values()
          .filter(
            snapshot =>
              snapshot.trackerName === this.currentTracker.name &&
              snapshot.app === this.app
          )
          .reverse();
      }),
      savedForCurrentTracker: computed(() => {
        const snapshots = this.savedSnapshots.filter(
          snapshot => snapshot.trackerId === this.currentRecordingId
        );
        return {
          snapshots
        };
      }),
      currrentTrackerId: 0,
      trackers: new Map(),
      isRecording: false,
      currentRecordingId: 0,
      currentTracker: computed(() => {
        return this.trackers.get(this.currrentTrackerId);
      }),
      setCurrentTrackerId: id => {
        this.currrentTrackerId = id;
      },
      stopRecording: trackerId => {
        socket.emit("stopRecording", {
          id: trackerId,
          recordingId: this.currentRecordingId
        });
      },
      update: payload => {
        if (typeof payload.existing_value === "boolean") {
          payload.new_value = payload.new_value === "true";
        }
        payload.trackerId = this.currrentTrackerId;
        socket.emit("update", payload);
      }
    });

    ipcRenderer.on("port", (event, port) => {
      socket = io(`http://localhost:${port}/`);

      // events from the sync server
      socket.on("connected", info => {
        this.connectionInfo.port = info.port;
      });
      socket.on("change", tracker => {
        this.addTracker(tracker);
      });
      socket.on("initialize", payload => {
        this.reset(payload);
      });

      socket.on("action", payload => {
        const tracker = this.trackers.get(payload.id);
        tracker && tracker.addActionLog(payload.value, payload.action);
      });

      socket.on("snapshot", payload => {
        const tracker = this.trackers.get(payload.id);
        if (tracker && tracker.isRecordingSnapshots)
          tracker.addSnapshot(payload.value, payload.snapshot);
      });

      socket.on("patch", payload => {
        const tracker = this.trackers.get(payload.id);
        tracker && tracker.addPatch(payload.value, payload.patch);
      });

      socket.on("recordingStart", ({ recordingId }) => {
        this.isRecording = true;
        this.currentRecordingId = recordingId;
      });

      socket.on("recordingEnd", payload => {
        this.isRecording = false;
        const tracker = this.getTracker(payload.id);
        tracker && tracker.addRecording(payload.recordingId);
      });
    });
  }

  reset(info) {
    this.trackers = new Map();
    this.connectionInfo.app = info.app;
  }

  addTracker(payload) {
    const nodeType = payload.isStateTree ? 1 : 0;

    if (payload.isMobx) {
      const mobxTracker = this.trackers.get(payload.id);
      if (mobxTracker) {
        mobxTracker.setName(payload.name);
        mobxTracker.setUpdatedTime(moment());
        mobxTracker.addActions(payload.actions);
        mobxTracker.setValue(payload.value);
        mobxTracker.addObserveLog(payload.value, payload.action);
      } else {
        const tracker = new Tracker(payload.id, payload.name, nodeType);
        tracker.setUpdatedTime(moment());
        tracker.addActions(payload.actions);
        tracker.setValue(payload.value);
        this.trackers.set(tracker.id, tracker);
      }
    } else {
      const tracker = new Tracker(payload.id, payload.name, nodeType);
      tracker.setUpdatedTime(moment());
      tracker.addActions(payload.actions);
      tracker.setValue(payload.value);
      this.trackers.set(tracker.id, tracker);
    }

    if (this.currrentTrackerId === 0) {
      this.currrentTrackerId = this.trackers.values()[0].id;
    }
  }

  getTracker(id) {
    return this.trackers.get(id);
  }

  executeAction(id, name, args) {
    socket.emit("executeAction", {
      id,
      name,
      args
    });
  }

  applySnapshot(trackerId, snapshot) {
    socket.emit("applySnapshot", {
      trackerId,
      value: snapshot
    });
  }

  applyPatch(trackerId, patch) {
    socket.emit("applyPatch", {
      trackerId,
      value: patch
    });
  }

  startRecording(trackerId) {
    socket.emit("startRecording", {
      id: trackerId
    });
  }

  playRecording(trackerId, recordingId) {
    socket.emit("playRecording", {
      id: trackerId,
      recordingId
    });
  }

  saveSnapshot(trackerName, snapshot) {
    const saved = {
      id: uuid(),
      trackerName: trackerName,
      app: this.app,
      name: "Unnamed",
      value: snapshot
    };
    this.saved.snapshots.set(saved.id, observable(saved));
  }

  renameSavedSnapshot(snapshotId, name) {
    const snapshot = this.saved.snapshots.get(snapshotId);
    snapshot.name = name;
  }

  removeSavedSnapshot(snapshotId) {
    this.saved.snapshots.delete(snapshotId);
  }
}

export default new Trackers();
