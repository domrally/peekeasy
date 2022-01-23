import {PeekSet} from './peek-set.js';

export class Caller<T extends (...args: any[]) => void> extends Set<
  (parameters: Parameters<T>) => void
> {
  readonly callBacks: WeakSet<T> = new PeekSet(this);

  readonly call = (...parameters: Parameters<T>) => {
    const copy = new Set(this);

    this.clear();

    copy.forEach(resolve => resolve(parameters));
  };

  get callBacksAsync(): Iterable<PromiseLike<Parameters<T>>> {
    return this.#callBacksAsync();
  }

  *#callBacksAsync() {
    while (true) {
      yield new Promise<Parameters<T>>(resolve => this.add(resolve));
    }
  }
}
