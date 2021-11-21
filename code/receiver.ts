import { Action } from "./action.js";

export type Receiver = WeakSet<Action>;
export function receiver(delegates: Receiver): Receiver {
  return {
    has: (t: Action) => delegates.has(t),
    add: (t: Action) => delegates.add(t),
    delete: (t: Action) => delegates.delete(t),
    [Symbol.toStringTag]: delegates[Symbol.toStringTag],
  };
}
