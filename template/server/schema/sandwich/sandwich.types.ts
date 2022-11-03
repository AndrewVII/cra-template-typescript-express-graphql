import gql from 'graphql-tag';

export default gql`
  type Query {
    sandwiches: [Sandwich]
    sandwich(name: String!): Sandwich
  }

  type Mutation {
    createSandwich(input: sandwichInput): Sandwich
    updateSandwich(id: ID!, input: sandwichInput): Sandwich
  }

  type Sandwich {
    id: ID!
    name: String!
    meat: String
    sauce: String
    bread: String!
  }

  input sandwichInput {
    name: String!
    meat: String
    sauce: String
    bread: String!
  }
`;
