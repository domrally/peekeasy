import { CreatePushdown } from './index.js';
class Initial {
    constructor() {
        this.message = '1!';
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
        this.message = '2!';
        this.onEnter = () => {
            // console.log('hi')
        };
        this.onExit = () => {
            // console.log('bye')
        };
    }
    get untilUpdate() {
        return new Promise(resolve => {
            const resolver = () => resolve(lol);
            window.requestAnimationFrame(resolver);
        });
    }
}
class Lol {
    constructor() {
        this.message = '3!';
        this.onEnter = () => {
            // console.log('hi')
        };
        this.onExit = () => {
            // console.log('bye')
        };
    }
    get untilUpdate() {
        return new Promise(resolve => {
            const resolver = () => resolve(false);
            window.requestAnimationFrame(resolver);
        });
    }
}
const lol = new Lol();
const alt = new Alt();
const initial = new Initial();
const test = async () => {
    const state = CreatePushdown(initial);
    let count = 0;
    while (true) {
        const s = await state.untilUpdate;
        if (!count) {
            console.log(s.message);
            console.log(state.message);
        }
        count++;
        count %= 21;
    }
};
test();
