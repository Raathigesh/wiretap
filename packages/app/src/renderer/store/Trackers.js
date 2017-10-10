import { observable, extendObservable, computed, action } from "mobx";
import io from "socket.io-client";
import moment from "moment";
import Tracker from "./Tracker";
const socket = io("http://localhost:4000/");

class Trackers {
  constructor() {
    extendObservable(this, {
      connectionInfo: {
        port: null,
        app: ""
      },
      currrentTrackerId: 0,
      trackers: [],
      currentTracker: computed(() => {
        return this.trackers.find(item => item.id === this.currrentTrackerId);
      }),
      setCurrentTrackerId: id => {
        this.currrentTrackerId = id;
      }
    });

    // events from the sync server
    socket.on("connected", info => {
      this.connectionInfo.port = info.port;
    });
    socket.on("change", tracker => {
      console.log("Change ", tracker);
      this.addTracker(tracker);
    });
    socket.on("initialize", payload => {
      console.log("initialize ", payload);
      this.reset(payload);
    });
    socket.on("spy", payload => {
      this.spyTraces.push(payload);
    });
  }

  reset(info) {
    this.trackers.clear();
    this.connectionInfo.app = info.app;
  }

  addTracker(payload) {
    const itemToUpdate = this.trackers.find(item => item.id === payload.id);
    if (itemToUpdate) {
      itemToUpdate.setUpdatedTime(moment());
      itemToUpdate.addActions(itemToUpdate.actions);
      itemToUpdate.setValue(payload.value);
      itemToUpdate.addTrace(payload.changeDescription);
    } else {
      const tracker = new Tracker(payload.id, payload.name);
      tracker.setUpdatedTime(moment());
      tracker.addActions(payload.actions);
      tracker.setValue(payload.value);
      tracker.addTrace(payload.changeDescription);
      this.trackers.push(tracker);
    }

    if (this.currrentTrackerId === 0) {
      this.currrentTrackerId = this.trackers[0].id;
    }
  }

  update(payload) {
    payload.trackerId = this.currrentTrackerId;
    socket.emit("update", payload);
  }
}

export default new Trackers();
