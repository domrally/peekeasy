type Property = [key: string | number | symbol, value?: object];
export class StateContext<T> implements AsyncIterable<Property> {
  #state: T = null;
  set state(value: T) {
    this.#state = value;
  }
  get #handler() {
    const t = this;
    return {
      get(_, key) {
        return t.#state[key];
      },
      set(_, key, value) {
        t.#state[key] = value;
        t.#set([key, value]);
        return true;
      },
    };
  }
  #proxy: T = new Proxy(this.#state, this.#handler);
  get proxy() {
    return this.#proxy;
  }
  #set: (property: Property) => void;
  #next: Promise<Property>;
  async *[Symbol.asyncIterator]() {
    while (true) {
      yield await (this.#next ??= new Promise<Property>((r) => this.#set = r));
      this.#next = null;
    }
  }
}
