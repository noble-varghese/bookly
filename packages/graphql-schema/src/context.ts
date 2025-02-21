// packages/graphql-schema/src/context.ts
export interface Context {
  user?: {
    id: string;
    email: string;
  };
  // Add other context properties as needed
}