const { gql } = require("apollo-server")

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    createdDate: String!
  }
  type UserView {
    email: String
  }
  type Query {
    userList: [UserView]
  }
  type Mutation {
    register(email: String!, password: String!, confirmPassword: String!): User!
    login(email: String!, password: String!): User!
  }
`
