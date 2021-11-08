import { Action } from "./action.js";
import { Key } from "./key.js";

export class Sender {
  constructor() {
    const events = {};

    const handler = {
      get: (_: this, key: Key) => delegate(events, key),
    };

    return new Proxy(this, handler);
  }
}

function delegate(events: { [key: Key]: Action[] }, key: Key) {
  const event = () => events[key].forEach((receiver) => receiver());

  event.on = (receiver: Action) => (events[key] ??= []).push(receiver);

  event.off = (receiver: Action) =>
    events[key] = events[key]?.filter((r) => receiver !== r);

  return event;
}
