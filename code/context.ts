type Key = string | number | symbol;
type Property = [key: Key, value: any];
export class Context<T> {
  get proxy(): T {
    return this.#proxy ??= new Proxy<any>(this.#target, this);
  }
  setTarget(target: T) {
    this.#target = target;
  }
  async *observe() {
    while (true) {
      yield await (this.#next ??= this.#subscribe());
      this.#next = undefined;
    }
  }
  get(_: T, key: Key) {
    return (this.#target as any)[key];
  }
  set<V>(_: T, key: Key, value: V) {
    (this.#target as any)[key] = value;
    this.#publish?.([key, value]);
    return true;
  }
  #proxy?: T;
  #target?: T;
  #next?: Promise<Property>;
  #publish?: (property: Property) => void;
  #subscribe() {
    return new Promise<Property>((p) => this.#publish = p);
  }
}
