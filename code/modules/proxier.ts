export class Proxier<T extends {[key: PropertyKey]: {}}>
  implements ProxyHandler<T>
{
  constructor(target?: T) {
    this.target = target;
    this.proxy = new Proxy(target ?? (() => {}), this);
  }

  private target: any;
  readonly proxy: T;

  setProxy(target: T) {
    return (this.target = target);
  }

  readonly get = (target: T, key: PropertyKey) =>
    this.target?.[key] ?? target[key];

  readonly set = <V>(target: any, key: PropertyKey, value: V) =>
    this.target?.[key] ? (this.target[key] = value) : (target[key] = value);

  readonly apply = (target: T, that: T, args: []) =>
    (this.target ?? target).apply(that, args);
}
