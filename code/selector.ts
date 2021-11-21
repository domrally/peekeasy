export type Selector<S extends {}> = ProxyHandler<S> & ((s?: S) => void);
export function selector<S extends {}>(): Selector<S> {
  let selected: any;

  function selector(s?: S) {
    selected = s;
  }

  selector.get = (target: S, key: string | symbol | number) => {
    selected ??= target;
    return selected[key];
  };

  selector.set = <V>(target: S, key: string | symbol | number, value: V) => {
    selected ??= target;
    selected[key] = value;
    return true;
  };

  selector.apply = (target: S, that: any, args: any) => {
    selected ??= target;
    const bound = selected.bind(that);
    return bound(...args);
  };

  return selector;
}
