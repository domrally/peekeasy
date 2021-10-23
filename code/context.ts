export type Key = string | number | symbol;
export type Property = { key: Key; value: any };
export class Context<T> implements AsyncIterable<Property> {
  get target() {
    return this.#proxy;
  }
  set target(target: T) {
    this.#target = target;
  }
  async *[Symbol.asyncIterator]() {
    while (true) {
      yield await (this.#next ??= this.#subscribe());
      this.#next = undefined;
    }
  }
  #get(key: Key) {
    return this.#target[key];
  }
  #set<V>(key: Key, value: V) {
    this.#target[key] = value;
    this.#publish({ key, value });
    return true;
  }
  #handler = {
    get: (_: T, key: Key) => this.#get(key),
    set: <V>(_: T, key: Key, value: V) => this.#set(key, value),
  };
  #proxy: T = new Proxy<any>({}, this.#handler);
  #target?: any;
  #next?: Promise<Property>;
  #publish = (_property: Property) => {};
  #subscribe() {
    return new Promise<Property>((p) => this.#publish = p);
  }
}
