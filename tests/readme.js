import { SetHandler, WeakerSet } from '../code/index.js';
class Event {
    constructor() {
        this.spiesForSend = new SetHandler();
        this.spyOnSend = new WeakerSet(this.spiesForSend);
        this.sendToSpies = new Proxy(() => { }, this.spiesForSend);
    }
}
const event = new Event();
event.spyOnSend.add(() => console.log('Hello, world!'));
event.sendToSpies();
console.log('✅ readme');
