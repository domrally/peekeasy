import { Key } from "./key.js";
//
export class Context<S> {
  //
  get state() {
    return this.#proxy;
  }
  //
  set state(s: S) {
    this.#state = s;
  }
  //
  #handler = {
    get: (_: S, key: Key) => this.#state[key],
    set: <V>(_: S, key: Key, value: V) => this.#state[key] = value,
  };
  //
  #proxy: S = new Proxy<any>({}, this.#handler);
  //
  #state: any = {};
}
