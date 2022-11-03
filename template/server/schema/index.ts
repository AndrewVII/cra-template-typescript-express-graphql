import { makeExecutableSchema } from '@graphql-tools/schema';
import sandwichSchema from './sandwich';

// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
  typeDefs: [
    sandwichSchema.typeDefs, // First defines the type Query
  ],
  resolvers: {
    ...sandwichSchema.resolvers,
  },
});

export default schema;
