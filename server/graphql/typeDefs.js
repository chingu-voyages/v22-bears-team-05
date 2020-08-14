const { gql } = require("apollo-server");

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
  type Goal {
    _id: ID
    user: String!
    name: String!
    tasks: [Task]
    totalTimeInSeconds: Int
    isCompleted: Boolean
  }
  type Task {
    _id: ID
    name: String!
    subtasks: [Subtask]
    totalTimeInSeconds: Int
    isCompleted: Boolean
  }
  type Subtask {
    _id: ID
    name: String!
    description: String
    totalTimeInSeconds: Int
    isCompleted: Boolean
    timeStarted: String
    timeCompleted: String
  }
  type Query {
    userList: [UserView]
    getAllGoals(userId: ID!): [Goal]!
  }
  type Mutation {
    register(email: String!, password: String!, confirmPassword: String!): User!
    login(email: String!, password: String!): User!
    createGoal(userId: ID!, goalName: String!): Goal!
  }
`;
