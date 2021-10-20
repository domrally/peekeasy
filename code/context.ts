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
    const getState = (): any => this.#state;
    const getPublish = () => this.#publish;
    return {
      get(_: T, key: Key) {
        const state = getState();
        return state[key];
      },
      set(_: T, key: Key, value: any) {
        const state = getState();
        state[key] = value;
        const publish = getPublish();
        publish?.([key, value]);
        return true;
      },
    };
  }
  #proxy?: T;
  get proxy() {
    return this.#proxy ??= new Proxy(this.#state as any, this.#handler);
  }
  #publish?: (property: Property) => void;
  #next?: Promise<Property>;
  #getNext() {
    return new Promise<Property>((r) => this.#publish = r);
  }
  async *[Symbol.asyncIterator]() {
    while (true) {
      yield await (this.#next ??= this.#getNext());
      this.#next = undefined;
    }
  }
}
