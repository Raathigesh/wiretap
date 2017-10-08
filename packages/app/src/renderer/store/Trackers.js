import { observable, extendObservable, computed, action } from "mobx";
import io from "socket.io-client";
import moment from "moment";
const socket = io("http://localhost:4000/");

class Trackers {
  constructor() {
    this.spyTraces = observable([]);
    this.connectionInfo = observable({
      port: null,
      app: ""
    });
    this.currrentTrackerId = observable({
      id: 0
    });
    this.trackers = observable([]);
    extendObservable(this, {
      currentTracker: computed(() => {
        return this.trackers.find(
          item => item.id === this.currrentTrackerId.id
        );
      }),
      setCurrentTrackerId: id => {
        this.currrentTrackerId.id = id;
      }
    });
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

  addTracker(tracker) {
    const itemToUpdate = this.trackers.find(item => item.id === tracker.id);
    if (itemToUpdate) {
      itemToUpdate.updatedOn = moment();
      itemToUpdate.value = tracker.value;
    } else {
      tracker.updatedOn = moment();
      this.trackers.push(tracker);
    }
  }

  update(payload) {
    payload.trackerId = this.currrentTrackerId.id;
    socket.emit("update", payload);
  }
}

export default new Trackers();
