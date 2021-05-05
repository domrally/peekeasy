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
            const alt = new Alt();
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
            const initial = new Initial();
            const resolver = () => resolve(initial);
            window.requestAnimationFrame(resolver);
        });
    }
}
(async () => {
    const state = CreateMealy(new Initial());
    while (true) {
        console.log(state.message);
        await state.untilUpdate;
    }
})();
