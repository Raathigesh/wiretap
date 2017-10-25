import { observable, extendObservable, computed, action } from "mobx";
import io from "socket.io-client";
import moment from "moment";
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
      currrentTrackerId: 0,
      trackers: [],
      isRecording: false,
      currentRecordingId: 0,
      currentTracker: computed(() => {
        return this.trackers.find(item => item.id === this.currrentTrackerId);
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
        const itemToUpdate = this.trackers.find(item => item.id === payload.id);
        itemToUpdate.addActionLog(payload.value, payload.action);
      });

      socket.on("snapshot", payload => {
        const itemToUpdate = this.trackers.find(item => item.id === payload.id);
        itemToUpdate.addSnapshot(payload.value, payload.snapshot);
      });

      socket.on("patch", payload => {
        const itemToUpdate = this.trackers.find(item => item.id === payload.id);
        itemToUpdate.addPatch(payload.value, payload.patch);
      });

      socket.on("recordingStart", ({ recordingId }) => {
        this.isRecording = true;
        this.currentRecordingId = recordingId;
      });

      socket.on("recordingEnd", payload => {
        this.isRecording = false;
        const tracker = this.getTracker(payload.id);
        tracker.addRecording(payload.recordingId);
      });
    });
  }

  reset(info) {
    this.trackers.clear();
    this.connectionInfo.app = info.app;
  }

  addTracker(payload) {
    let nodeType = 2;
    if (payload.isStateTree) {
      nodeType = 1;
    } else if (payload.isMobx) {
      nodeType = 0;
    }

    if (nodeType === 0) {
      const mobxTracker = this.trackers.find(item => item.id === payload.id);
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
        this.trackers.push(tracker);
      }
    } else {
      const tracker = new Tracker(payload.id, payload.name, nodeType);
      tracker.setUpdatedTime(moment());
      tracker.addActions(payload.actions);
      tracker.setValue(payload.value);
      this.trackers.push(tracker);
    }

    if (this.currrentTrackerId === 0) {
      this.currrentTrackerId = this.trackers[0].id;
    }
  }

  getTracker(id) {
    return this.trackers.find(tracker => tracker.id === id);
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
}

export default new Trackers();
