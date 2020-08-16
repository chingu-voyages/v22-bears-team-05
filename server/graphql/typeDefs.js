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
  type Goal {
    _id: ID!
    user: String!
    name: String!
    tasks: [Task]
    totalTimeInSeconds: Int
    isCompleted: Boolean
    totalCompletedSubtasks: Int
  }
  type Task {
    _id: ID
    name: String!
    parent: Goal
    subtasks: [Subtask]
    totalTimeInSeconds: Int
    isCompleted: Boolean
    totalCompletedSubtasks: Int
  }
  type Subtask {
    _id: ID!
    parent: Task
    name: String!
    description: String
    totalTimeInSeconds: Int
    isCompleted: Boolean
    timeStarted: String
    timeCompleted: String
  }
  type Query {
    userList: [UserView]
    getAllGoals: [Goal]!
  }
  type Mutation {
    register(email: String!, password: String!, confirmPassword: String!): User!
    login(email: String!, password: String!): User!
    createGoal(goalName: String!): Goal!
    createTask(taskName: String!, goalId: String!): Task!
    deleteTask(taskId: String!): Goal #can be null, for future considerations
    # completeTask(taskId: String!): Goal #can be null, for future considerations
    createSubtask(subtaskName: String!, taskId: String!): Subtask!
    deleteSubtask(subtaskId: String!): Task #can be null, for future considerations
    # completeSubtask(substaskId: String!): Task #can be null, for future considerations
  }
`
