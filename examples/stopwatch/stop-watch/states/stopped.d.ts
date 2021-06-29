import { Chronograph } from './chronograph';
export declare class Stopped extends Chronograph {
    onEnter(): void;
    onExit(): void;
    readonly top: () => void;
    readonly side: () => void;
}
