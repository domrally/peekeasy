import { CreateMealy } from './index.js';
class Initial {
    constructor() {
        this.message = 'Hello, World!';
        this.onEnter = () => {
            // console.log('enter')
        };
        this.onExit = () => {
            // console.log('exit')
        };
    }
    get untilUpdate() {
        return new Promise(resolve => {
            const resolver = () => resolve(alt);
            window.requestAnimationFrame(resolver);
        });
    }
}
class Alt {
    constructor() {
        this.message = 'hEllO, wOrLd!';
        this.onEnter = () => {
            // console.log('hi')
        };
        this.onExit = () => {
            // console.log('bye')
        };
    }
    get untilUpdate() {
        return new Promise(resolve => {
            const resolver = () => resolve(initial);
            window.requestAnimationFrame(resolver);
        });
    }
}
const alt = new Alt();
const initial = new Initial();
const test = async () => {
    const state = CreateMealy(initial);
    let count = 0;
    while (true) {
        const s = await state.untilUpdate;
        if (!count) {
            console.log(s.message);
            console.log(state.message);
        }
        count++;
        count %= 20;
    }
};
test();
