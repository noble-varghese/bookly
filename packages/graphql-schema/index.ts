// In packages/graphql-schema/index.ts
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';
import fs from 'fs';

// Use absolute path to ensure files are found
const schemaDir = path.resolve(__dirname, 'src/schema');
console.log('Looking for schema files in:', schemaDir);
console.log('Files found:', fs.readdirSync(schemaDir));

const typesArray = loadFilesSync(schemaDir, {
  extensions: ['graphql']
});

export const schema = mergeTypeDefs(typesArray);
export * from './src/types/generated';