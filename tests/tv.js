// const off = {
//   name: "off",
//   power: () => 0,
// };

// class TV {
//   constructor(tv = null) {
//     this.#on = new TV();
//     tv ??= new Context().target;
//     return tv;
//   }
//   power() {
//     this.context.target = this.#on;
//     this.context.back();
//   }
// }

// const tv = new TV();
// // if (state.word !== "hello") {
// //   throw new Error("proxy failure");
// // } else {
// //   console.log("✅ proxy");
// // }
// console.log(tv.state); // tv is off

// tv.power();
// console.log(tv.state); // tv is on
