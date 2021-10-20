import { StateContext } from "./context";

(async function main() {
  interface thing {
  }
  const context = new StateContext<thing>();
  for await (const [key, value] of context) {
    context.state = {};
  }
})();
