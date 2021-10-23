import { Context } from "../code/context.min.js";

const a = {
  word: "hello",
};
const b = {
  word: "world",
};

const context = new Context();
const { target } = context;

context.target = a;
if (target.word !== "hello") {
  throw new Error("proxy failure");
} else {
  console.log("✅ proxy");
}

context.target = b;
if (target.word !== "world") {
  throw new Error("state failure");
} else {
  console.log("✅ state");
}

target.word = "meal";
if (target.word !== "meal") {
  throw new Error("object failure");
} else {
  console.log("✅ object");
}

const observe = async function () {
  for await (const { value } of context) {
    if (value !== "time") {
      throw new Error("observer failure");
    } else {
      console.log("✅ observer");
    }
  }
}();
target.word = "time";
