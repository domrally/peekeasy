import { Action } from "./action.js";

export type Sender = WeakSet<Action> & Action;
export function sender(): Sender {
  const delegates = new Set<Action>();

  function send() {
    const copy = new Set(delegates);
    copy.forEach((f) => f());
  }

  send.add = (t: Action) => delegates.add(t);
  send.delete = (t: Action) => delegates.delete(t);
  send.has = (t: Action) => delegates.has(t);
  send[Symbol.toStringTag] = delegates[Symbol.toStringTag];

  return send;
}
