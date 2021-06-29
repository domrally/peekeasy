import { Context } from './context.js';
import { State } from './state.js';
// 
export { State };
// 
export const CreateStateProxy = (initialState, transitions) => {
    const { target, handler } = new Context(initialState, transitions);
    return new Proxy(target, handler);
};
