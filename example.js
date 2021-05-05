import { CreateMealy } from './index.js';
class Initial {
    constructor() {
        this.message = 'Hello, World!';
        this.onEnter = () => {
            console.log('enter');
        };
        this.onExit = () => {
            console.log('exit');
        };
        this.untilUpdate = new Promise(_resolve => { });
    }
}
const state = CreateMealy(new Initial());
console.log(state.message);
