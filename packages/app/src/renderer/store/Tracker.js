import { observable, extendObservable } from "mobx";
import moment from "moment";

export default class Tracker {
  constructor(id, name) {
    extendObservable(this, {
      id,
      name,
      updatedOn: moment(),
      actions: [],
      value: {},
      changeDescription: {
        isExpanded: false,
        value: null
      },
      traces: [],
      addActions(actions) {
        this.actions.clear();
        this.actions.push(...actions);
      },
      setUpdatedTime(date) {
        this.updatedOn = date;
      },
      setValue(value) {
        this.value = value;
      },
      addTrace(description) {
        if (description) {
          this.traces.unshift(description);
        }
      }
    });
  }
}
