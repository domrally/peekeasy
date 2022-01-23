export class PeekSet<T extends {}> implements WeakSet<T> {
  constructor(private set: WeakSet<T>) {}

  has(t: T) {
    return this.set.has(t);
  }

  add(t: T) {
    return this.set.add(t) as any;
  }

  delete(t: T) {
    return this.set.delete(t);
  }

  get [Symbol.toStringTag]() {
    return this.set[Symbol.toStringTag];
  }
}
