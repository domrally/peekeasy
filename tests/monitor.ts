export type Key = string | number | symbol;
export type Property = { key: Key; value: any };
type Newable = new (...args: any[]) => {};

export const Monitor = <T extends Newable>(Base: T) =>
  class extends Base implements AsyncIterable<Property>, ProxyHandler<any> {
    constructor(...args: any[]) {
      super(...args);
      return new Proxy(this, this);
    }
    async *[Symbol.asyncIterator]() {
      while (true) {
        yield await (this.#next ??= this.#subscribe());
        this.#next = undefined;
      }
    }
    get(target: this, key: Key) {
      this.#publish({ key, value: target[key] });
      return target[key];
    }
    set<V>(target: this, key: Key, value: V) {
      this.#publish({ key, value });
      return target[key] = value;
    }
    #next?: Promise<Property>;
    #publish = (_property: Property) => {};
    #subscribe() {
      return new Promise<Property>((p) => this.#publish = p);
    }
  };
