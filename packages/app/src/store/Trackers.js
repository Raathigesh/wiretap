import { observable, extendObservable, computed, action } from "mobx";
import io from "socket.io-client";
const socket = io("http://localhost:4000/");

class Trackers {
  constructor() {
    this.connectionInfo = observable({
      port: null
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

    socket.on("reset", payload => {
      console.log("Reset ", payload);
      this.reset(payload);
    });
  }

  reset() {
    this.trackers.clear();
  }

  addTracker(tracker) {
    const itemToUpdate = this.trackers.find(item => item.id === tracker.id);
    if (itemToUpdate) {
      itemToUpdate.value = tracker.value;
    } else {
      this.trackers.push(tracker);
    }
  }

  update(payload) {
    payload.trackerId = this.currrentTrackerId.id;
    socket.emit("update", payload);
  }
}

export default new Trackers();
