import { Context } from "../code/context.min.js";

class Powerable { // abstract class Powerable {
  state = "";
  power() {}
}

class TV extends Powerable {
  #context = new Context(); // #context = new Context<Powerable>()

  constructor() {
    super();
    this.#context.target = this.#off;
    return this.#context.target; // return this.#context.target as any
  }

  #off = { // #off: Powerable = {
    state: "tv is off",
    power: () => this.#context.target = this.#on,
  };

  #on = { // #on: Powerable = {
    state: "tv is on",
    power: () => this.#context.target = this.#off,
  };
}

const tv = new TV();
// if (state.word !== "hello") {
//   throw new Error("proxy failure");
// } else {
//   console.log("✅ proxy");
// }
console.log(tv.state); // tv is off

tv.power();
console.log(tv.state); // tv is on
