interface Counter {
    count: () => void
}
//
class IntegerFizz implements Counter, PromiseLike<Counter> {
    count: () => void
    // 1, 2, .., 7, 8, .., 11
    then() {
        const zz = ++this.count % 4
            ? fint
            : fizz
        return Promise.resolve(zz)
    }
}
class IntegerCycle implements Counter, PromiseLike<Counter> {
    count = 1
    then() {
        const zz = [bunt, buzz, fizz, fizzbuzz][++this.count % 4]
        return Promise.resolve(zz)
    }
    toString = () => this.count
}
class Fizz implements Counter, PromiseLike<Counter> {
    count = 1
    then() {
        const zz = ++this.count % 4
            ? bunt
            : buzz
        return Promise.resolve(zz)
    }
    toString = () => 'Fizz'
}
class Buzz implements Counter, PromiseLike<Counter> {
    count: () => void
    private toggle = false
    then() {
        this.toggle = !this.toggle
        const zz = this.toggle
            ? fizz
            : fint
        return Promise.resolve(zz)
    }
    toString = () => 'Buzz'
}
class FizzBuzz implements Counter, PromiseLike<Counter> {
    count: () => void
    then = () => Promise.resolve(fint as PromiseLike<any>)
    toString = () => 'Fizz Buzz'
}
(async () => {
    for await (const word of automata) {
        console.log(word) // Integer, Fizz, Buzz, Fizz Buzz
    }
})();
(async () => {
    while (true) {
        for (const player of players) {
            await new Promise(resolve => window.requestAnimationFrame(resolve))            
            player.play()
        }
    }
})();
const fizz = new Fizz()
const buzz = new Buzz()
const fizzbuzz = new FizzBuzz()
const fint = new IntegerFizz()
const bunt = new IntegerCycle()
const automata = new Mealy(fint)