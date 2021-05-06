import { Moore } from '../src/moore.js';
class Runer {
    get promiseOutput() {
        return new Promise(resolve => resolve(this.rune));
    }
    transition(_next) {
        throw new Error("Method not implemented.");
    }
}
class Hello extends Runer {
    get rune() {
        return 'Hello';
    }
    get promiseNext() {
        return new Promise(resolve => {
            window.requestAnimationFrame(() => resolve(new Comma()));
        });
    }
}
class Comma extends Runer {
    get rune() {
        return ', ';
    }
    get promiseNext() {
        return new Promise(resolve => {
            window.requestAnimationFrame(() => resolve(new World()));
        });
    }
}
class World extends Runer {
    get rune() {
        return 'World!';
    }
    get promiseNext() {
        return new Promise(_resolve => { });
    }
}
const moore = new Moore(new Hello());
const spelling = async () => {
    while (true) {
        const output = await moore.state.promiseOutput;
        console.log(output);
    }
};
spelling();
