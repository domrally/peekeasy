import { Delegate, Sender } from "../../index.js";

class EventService extends Sender {
  started: Delegate;
}

export const Events = Object.freeze(new EventService());
