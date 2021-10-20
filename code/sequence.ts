export class Sequence<T> implements Sequential<T> {
  #current: T;
  get current() {
    return this.#current;
  }
  set current(value: T) {
    this.#set(value);
  }
  #set: (state: T) => void;
  #next: Promise<T>;
  async *[Symbol.asyncIterator]() {
    yield this.#current;
    while (true) {
      this.#current = await (this.#next ??= new Promise<T>((r) =>
        this.#set = r
      ));
      this.#next = null;
      yield this.#current;
    }
  }
}
