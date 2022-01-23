export class Proxier<T extends {}> implements ProxyHandler<T> {
  constructor(private target?: T) {
    this.proxy = new Proxy<any>(target ?? (() => {}), this);
  }

  readonly proxy: T;

  setProxy(target: T) {
    return (this.target = target);
  }

  readonly get = (target: any, key: string) =>
    (this.target as any)[key] ?? target[key];

  readonly set = <V>(target: any, key: string, value: V) =>
    (this.target as any)[key]
      ? ((this.target as any)[key] = value)
      : (target[key] = value);

  readonly apply = (target: any, that: T, args: []) =>
    ((this.target as any) ?? target).apply(that, args);
}
