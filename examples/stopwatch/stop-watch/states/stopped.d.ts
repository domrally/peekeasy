import { Chronograph } from './chronograph.js';
export declare class Stopped extends Chronograph {
    onEnter(): void;
    onExit(): void;
    readonly top: () => void;
    readonly side: () => void;
}
