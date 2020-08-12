const { gql } = require("apollo-server")

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    createdDate: String!
  }
  type Mutation {
    register(email: String!, password: String!, confirmPassword: String!): User!
    login(username: String!, password: String!): User!
  }
`
