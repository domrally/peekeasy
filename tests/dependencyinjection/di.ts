import { Events } from "./event-service.js";
import { Page } from "./page.js";

const { started } = Events;

const page = Page.Instance;
const log = () => console.log("Game started");
started.on(log);

console.log(page.name);

started();

started.off(log);

started();

console.log(page.name);
