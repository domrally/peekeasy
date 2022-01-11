import { Holder, Sender } from '../../../../code/index.js';
import { Events } from './events.js';
let { held, hold } = new Holder();
export const events = held;
export class Listener {
    constructor(...args) {
        hold(this);
        for (const key in Events) {
            const { send, sent } = new Sender();
            this[key] = sent;
            args.forEach((publisher) => {
                const onPublish = publisher === null || publisher === void 0 ? void 0 : publisher[key];
                onPublish === null || onPublish === void 0 ? void 0 : onPublish.add(send);
            });
        }
    }
    static init(...args) {
        delete this.init;
        return new Listener(...args);
    }
}
