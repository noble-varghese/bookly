import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';
export * from './src/types/generated';

// Load and merge schema files
const typesArray = loadFilesSync(path.join(__dirname, './src/schema'), {
  extensions: ['graphql']
});

export const schema = mergeTypeDefs(typesArray);