export function Receiver(delegates) {
    return {
        has: (t) => delegates.has(t),
        add: (t) => delegates.add(t),
        delete: (t) => delegates.delete(t),
        [Symbol.toStringTag]: delegates[Symbol.toStringTag],
    };
}
