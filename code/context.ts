type Key = string | number | symbol;
type Property = [key: Key, value: any];
export class StateContext<T> implements AsyncIterable<Property> {
  constructor(initial: T) {
    this.#state = initial;
  }
  #state: T;
  set state(value: T) {
    this.#state = value;
  }
  get #handler() {
    const t = this;
    return {
      get(_: T, key: Key) {
        return (t.#state as any)[key];
      },
      set(_: T, key: Key, value: any) {
        (t.#state as any)[key] = value;
        t.#set?.([key, value]);
        return true;
      },
    };
  }
  #proxy?: T;
  get proxy() {
    return this.#proxy ??= new Proxy(this.#state as any, this.#handler);
  }
  #set?: (property: Property) => void;
  #next?: Promise<Property>;
  #getNext() {
    return new Promise<Property>((r) => this.#set = r);
  }
  async *[Symbol.asyncIterator]() {
    while (true) {
      yield await (this.#next ??= this.#getNext());
      this.#next = undefined;
    }
  }
}
