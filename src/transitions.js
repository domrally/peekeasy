export class Transitions extends Map {
    constructor(triggers) {
        super();
        for (const trigger in triggers) {
            if (Object.prototype.hasOwnProperty.call(triggers, trigger)) {
                const transitions = triggers[trigger];
                const map = new Map();
                this.set(trigger.toString(), map);
                transitions.forEach(transition => {
                    map.set(...transition);
                });
            }
        }
    }
}
