import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema/**/*.graphql',  // Path to your schema files
  generates: {
    './src/types/generated.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers'
      ],
      config: {
        enumsAsTypes: true,
        useIndexSignature: true,
        mappers: {
          User: '@bookly/database#UserModel' // Make sure this matches your actual model export
        },
        defaultMapper: 'Partial<{T}>',
      }
    }
  }
};

export default config;