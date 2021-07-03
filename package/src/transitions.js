export class TransitionMap extends Map {
    constructor(triggers) {
        super();
        for (const key in triggers) {
            const map = new Map();
            for (const tuple of triggers[key]) {
                this.set(Number.parseInt(key), map.set(...tuple));
            }
        }
    }
}
