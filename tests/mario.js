import { Context } from "../index.js";

const Events = {
  mushroom: Symbol(),
  flower: Symbol(),
  goomba: Symbol(),
};
class Bros {
  [Events.mushroom]() {}
  [Events.flower]() {}
  [Events.goomba]() {}
  run() {}
}
class Mario extends Bros {
  #context = new Context();

  constructor() {
    super();
    this.#context.target = this.#small;
    return this.#context.target;
  }

  #small = {
    [Events.mushroom]: () => this.#context.target = this.#big,
    [Events.flower]: () => this.#context.target = this.#fire,
    [Events.goomba]: () => console.log("game over"),
    run: () => console.log("run"),
  };

  #big = {
    [Events.mushroom]: () => this.#context.target = this.#big,
    [Events.flower]: () => this.#context.target = this.#fire,
    [Events.goomba]: () => this.#context.target = this.#small,
    run: () => console.log("sprint"),
  };

  #fire = {
    [Events.mushroom]: () => this.#context.target = this.#fire,
    [Events.flower]: () => this.#context.target = this.#fire,
    [Events.goomba]: () => this.#context.target = this.#big,
    run: () => console.log("fireball"),
  };
}

const luigi = new Mario();
luigi.run(); // run
luigi[Events.mushroom]();
luigi.run(); // run sprint
luigi[Events.flower]();
luigi.run(); // run fireball
