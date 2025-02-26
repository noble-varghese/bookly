import { Loaders } from './dataloaders';
export interface Context {
    loaders: Loaders;
}
export declare const createContext: () => Context;
