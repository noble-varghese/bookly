// codegen.ts
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../../packages/graphql-schema/src/schema/**/*.graphql', // Your GraphQL endpoint
  documents: ['src/**/*.{ts,tsx}'],        // Where to look for your GraphQL operations
  generates: {
    './src/services/generated/': {
        preset: 'client',
        plugins: [],
        presetConfig: {
          gqlTagName: 'gql',
          fragmentMasking: false
        }
    }
  },
//   hooks: {
//     afterAllFileWrite: ['prettier --write']
//   }
}

export default config