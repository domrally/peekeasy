export function Selector() {
    let selected;
    function selector(s) {
        selected = s;
    }
    selector.get = (target, key) => {
        selected !== null && selected !== void 0 ? selected : (selected = target);
        return selected[key];
    };
    selector.set = (target, key, value) => {
        selected !== null && selected !== void 0 ? selected : (selected = target);
        selected[key] = value;
        return true;
    };
    selector.apply = (target, that, args) => {
        selected !== null && selected !== void 0 ? selected : (selected = target);
        const bound = selected.bind(that);
        return bound(...args);
    };
    return selector;
}
