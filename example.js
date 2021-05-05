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
        this.untilUpdate = new Promise(resolve => {
            const resolver = () => resolve(alt);
            window.requestAnimationFrame(resolver);
        });
    }
}
class Alt {
    constructor() {
        this.message = 'hEllO, wOrLd!';
        this.onEnter = () => {
            console.log('hi');
        };
        this.onExit = () => {
            console.log('bye');
        };
        this.untilUpdate = new Promise(resolve => {
            const resolver = () => resolve(initial);
            window.requestAnimationFrame(resolver);
        });
    }
}
const alt = new Alt();
const initial = new Initial();
const test = async () => {
    const state = CreateMealy(initial);
    while (true) {
        console.log(state.message);
        await state.untilUpdate;
    }
};
test();
