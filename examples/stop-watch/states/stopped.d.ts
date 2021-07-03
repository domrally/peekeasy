import { Chronograph } from './chronograph.js';
export declare class Stopped extends Chronograph {
    readonly top: () => void;
    readonly side: () => void;
}
