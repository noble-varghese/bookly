// src/context.ts
import { createLoaders, Loaders } from './dataloaders';

export interface Context {
  loaders: Loaders;
}

export const createContext = (): Context => ({
  loaders: createLoaders()
});