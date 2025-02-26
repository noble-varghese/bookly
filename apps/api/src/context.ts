// src/context.ts
import { createLoaders, Loaders } from './dataloaders';
// In packages/graphql-schema/index.ts
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

import path from 'path';
import fs from 'fs';

export interface Context {
  loaders: Loaders;
}

export const createContext = (): Context => ({
  loaders: createLoaders()
});

const schemaDir = path.resolve(__dirname, 'schema');
const typesArray = loadFilesSync(schemaDir, {
  extensions: ['graphql']
});

export const schema = mergeTypeDefs(typesArray);