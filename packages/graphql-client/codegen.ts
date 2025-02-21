import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  // schema: '../graphql-schema/src/schema/**/*.graphql',  TODO: Check this approach.
  schema: process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  documents: [
    './src/**/*.graphql',
    './src/**/*.tsx'  // In case you have gql`` in your React components
  ],
  generates: {
    'src/generated/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
        dedupeFragments: true
      }
    }
  }
};

export default config;