const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    createdDate: String!
  }
  type UserView {
    email: String
  }
  type Goal {
    _id: ID!
    user: String!
    name: String!
    tasks: [Task!]
    totalTimeInSeconds: Int
    isCompleted: Boolean
    totalCompletedSubtasks: Int
  }
  type Task {
    _id: ID
    name: String!
    parent: Goal
    subtasks: [Subtask!]
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
  type DeletedData {
    deletedGoals: Int
    deletedTasks: Int
    deletedSubtasks: Int
  }
  type AuthData {
    id: ID!
    email: String!
    token: String!
  }
  type Query {
    userList: [UserView]
    getAllGoals: [Goal]!
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): AuthData!
    logout: Boolean!
    register(
      email: String!
      password: String!
      confirmPassword: String!
    ): AuthData!
    createGoal(goalName: String!): Goal!
    deleteGoal(goalId: String!): DeletedData!
    updateGoal(
      goalId: String!
      newGoalName: String
      isCompleted: Boolean
    ): Goal!
    createTask(taskName: String!, goalId: String!): Task!
    deleteTask(taskId: String!): Goal!
    updateTask(
      taskId: String!
      newTaskName: String
      isCompleted: Boolean
    ): Goal!
    createSubtask(subtaskName: String!, taskId: String!): Task!
    deleteSubtask(subtaskId: String!): Task!
    startSubtask(subtaskId: String!): Subtask!
    pauseSubtask(subtaskId: String!): Subtask!
    completeSubtask(subtaskId: String!): Goal!
  }
`;
