import shortid from "shortid";
const globalTrackingState = {};
const actionRecorders = {};

const globalState = {
  addObservable: theThing => {
    const id = shortid.generate();
    globalTrackingState[id] = theThing;
    return id;
  },

  getObservable: id => {
    return globalTrackingState[id];
  },

  addRecorder: (trackerId, recorder) => {
    const recordingId = shortid.generate();
    actionRecorders[trackerId] = {
      [recordingId]: recorder
    };

    return recordingId;
  },

  getRecorder: (trackerId, recorderId) => {
    return actionRecorders[trackerId][recorderId];
  }
};
export default globalState;
