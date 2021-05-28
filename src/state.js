// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:
export function createState(Base) {
    let _promise;
    let _resolve;
    const thing = async () => {
        while (true) {
            _promise = new Promise(r => _resolve = r);
            await _promise;
        }
    };
    thing();
    return class Stating extends Base {
        get resolve() {
            return _resolve;
        }
        get promise() {
            return _promise;
        }
    };
}
