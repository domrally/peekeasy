export function sender() {
    const delegates = new Set();
    function send() {
        const copy = new Set(delegates);
        copy.forEach((f) => f());
    }
    send.add = (t) => delegates.add(t);
    send.delete = (t) => delegates.delete(t);
    send.has = (t) => delegates.has(t);
    send[Symbol.toStringTag] = delegates[Symbol.toStringTag];
    return send;
}
