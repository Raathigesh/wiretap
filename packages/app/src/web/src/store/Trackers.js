import { observable, extendObservable, computed, action } from "mobx";
import moment from "moment";
import Tracker from "./Tracker";
import Peer from "peerjs";
const uuidv4 = require("uuid/v4");
const ipcRenderer = { on: () => {} };
let connection = null;
let socket = {
  emit(eventName, payload) {
    connection.send({
      eventName,
      payload
    });
  }
};

class Trackers {
  constructor() {
    this.peerId = uuidv4();
    var peer = new Peer(this.peerId, {
      host: "server-eloxnxhfvs.now.sh",
      secure: true,
      port: "",
      path: "/"
    });
    peer.on("error", err => {
      debugger;
    });
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
      connected(info) {
        this.connectionInfo.port = info.port;
      },
      change(tracker) {
        this.addTracker(tracker);
      },
      initialize(payload) {
        this.reset(payload);
      },
      action(payload) {
        const itemToUpdate = this.trackers.find(item => item.id === payload.id);
        itemToUpdate.addActionLog(payload.value, payload.action);
      },
      snapshot(payload) {
        const itemToUpdate = this.trackers.find(item => item.id === payload.id);
        itemToUpdate.addSnapshot(payload.value, payload.snapshot);
      },
      patch(payload) {
        const itemToUpdate = this.trackers.find(item => item.id === payload.id);
        itemToUpdate.addPatch(payload.value, payload.patch);
      },
      recordingStart({ recordingId }) {
        this.isRecording = true;
        this.currentRecordingId = recordingId;
      },
      recordingEnd(payload) {
        this.isRecording = false;
        const tracker = this.getTracker(payload.id);
        tracker.addRecording(payload.recordingId);
      },
      setCurrentTrackerId: id => {
        this.currrentTrackerId = id;
      },
      stopRecording: trackerId => {
        socket.emit("onStopRecording", {
          id: trackerId,
          recordingId: this.currentRecordingId
        });
      },
      update: payload => {
        if (typeof payload.existing_value === "boolean") {
          payload.new_value = payload.new_value === "true";
        }
        payload.trackerId = this.currrentTrackerId;
        socket.emit("onUpdate", payload);
      }
    });

    peer.on(
      "connection",
      function(conn) {
        connection = conn;
        conn.on(
          "data",
          function(data) {
            if (data.eventName) {
              this[data.eventName](data.payload);
            }
          }.bind(this)
        );
      }.bind(this)
    );
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
    socket.emit("onExecuteAction", {
      id,
      name,
      args
    });
  }

  applySnapshot(trackerId, snapshot) {
    socket.emit("onApplySnapshot", {
      trackerId,
      value: snapshot
    });
  }

  applyPatch(trackerId, patch) {
    socket.emit("onApplyPatch", {
      trackerId,
      value: patch
    });
  }

  startRecording(trackerId) {
    socket.emit("onStartRecording", {
      id: trackerId
    });
  }

  playRecording(trackerId, recordingId) {
    socket.emit("onPlayRecording", {
      id: trackerId,
      recordingId
    });
  }
}

export default new Trackers();
