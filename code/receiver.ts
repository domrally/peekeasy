type Action = () => void;
export function Receiver(delegates: WeakSet<Action>) {
  return {
    has: (t: Action) => delegates.has(t),
    add: (t: Action) => delegates.add(t),
    delete: (t: Action) => delegates.delete(t),
    [Symbol.toStringTag]: delegates[Symbol.toStringTag],
  } as WeakSet<Action>;
}
