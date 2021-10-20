export function getCurrentState<T>(
  sequence: AsyncIterable<T>,
): T {
  let state: T;
  (async () => {
    for await (state of sequence) {}
  })();
  const handler = {
    get(_, key) {
      return state[key];
    },
    set(_, key, value) {
      state[key] = value;
      return true;
    },
  };
  return new Proxy(this, handler);
}
