import shortid from "shortid";
import isString from "lodash.isstring";
import { emitChange } from "./walkieTalkie";

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
