import { Delegate, Sender } from "../../code/main.js";

class EventService extends Sender {
  started: Delegate;
}

export const Events = Object.freeze(new EventService());
