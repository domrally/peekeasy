type Key = string | number | symbol;
type Property = [key: Key, value: any];
export class Context<T> {
  get target() {
    return this.#proxy;
  }
  set target(target: T) {
    this.#target = target;
  }
  async *observe() {
    while (true) {
      yield await (this.#next ??= this.#subscribe());
      this.#next = undefined;
    }
  }
  get(_: T, key: Key) {
    return this.#target[key];
  }
  set<V>(_: T, key: Key, value: V) {
    this.#target[key] = value;
    this.#publish?.([key, value]);
    return true;
  }
  #proxy: T = new Proxy<any>({}, this);
  #target?: any;
  #next?: Promise<Property>;
  #publish?: (property: Property) => void;
  #subscribe() {
    return new Promise<Property>((p) => this.#publish = p);
  }
}
