import { Moore } from "../src/moore";
const moore = new Moore(H);
while (true) {
    await moore.state.promiseOutput;
}
