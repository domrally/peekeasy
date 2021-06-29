import { Chronograph } from './chronograph';
export declare class Watching extends Chronograph {
    #private;
    onEnter(): Promise<void>;
    onExit(): void;
    private _timer;
    timer?(): AsyncGenerator<number, void, unknown>;
    readonly top: () => void;
    readonly side: () => Promise<void>;
}
