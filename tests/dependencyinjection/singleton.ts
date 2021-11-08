export function Singleton<T>(instance?: T) {
  return class {
    protected constructor() {}
    static readonly #instance: T = new this() as any;
    static get Instance(): T {
      return instance ?? this.#instance;
    }
  };
}
