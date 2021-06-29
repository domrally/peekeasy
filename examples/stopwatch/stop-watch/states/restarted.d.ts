import { Chronograph } from './chronograph';
export declare class Restarted extends Chronograph {
    onEnter(): void;
    onExit(): void;
    readonly top: () => void;
    side(): void;
}
