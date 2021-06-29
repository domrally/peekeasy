import { Chronograph } from './chronograph.js';
export declare class Restarted extends Chronograph {
    onEnter(): void;
    onExit(): void;
    readonly top: () => void;
    side(): void;
}
