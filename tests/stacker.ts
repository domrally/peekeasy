class Stacker<T> extends Array<T> {
  constructor(asyncIterable: AsyncIterable<T>) {
    super();
    (async () => {
      for await (const item of asyncIterable) {}
    })();
  }
}
