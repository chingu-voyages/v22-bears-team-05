const { gql } = require("apollo-server");
/*
    addTagToGoal(goalId: String!): TagList!
    // addTagToTask(goalId: String!): TagList!
    // addTagToSubtask(goalId: String!): TagList!
*/
module.exports = gql`
  type Tag {
    tagName: String!
    time: Int!
  }
  type User {
    id: ID!
    email: String!
    createdDate: String!
    smallRewards: [String!]
    mediumRewards: [String!]
    largeRewards: [String!]
    tags: [Tag!]
  }
  type UserView {
    email: String
  }
  type TagList {
    tags: [String!]
  }
  type Goal {
    _id: ID!
    user: String!
    name: String!
    tasks: [Task!]
    totalTimeInSeconds: Int
    isCompleted: Boolean
    totalCompletedSubtasks: Int
    tags: [String!]
  }
  type TagProperties {
    tagName: String!
    componentId: String!
    componentType: String!
    status: String!
  }
  type Task {
    _id: ID
    name: String!
    parent: Goal
    subtasks: [Subtask!]
    totalTimeInSeconds: Int
    isCompleted: Boolean
    totalCompletedSubtasks: Int
    tags: [String!]
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
    tags: [String!]
  }
  type DeletedData {
    deletedGoals: Int
    deletedTasks: Int
    deletedSubtasks: Int
  }
  type AuthData {
    id: ID!
    email: String!
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
    createSubtask(
      subtaskName: String!
      subtaskDescription: String
      taskId: String!
    ): Task!
    updateSubtask(
      subtaskName: String!
      subtaskDescription: String
      subtaskId: String!
    ): Subtask!
    deleteSubtask(subtaskId: String!): Task!
    startSubtask(subtaskId: String!): Subtask!
    pauseSubtask(subtaskId: String!): Subtask!
    updateSmallRewards(smallRewards: [String]!): User!
    updateMediumRewards(mediumRewards: [String]!): User!
    updateLargeRewards(largeRewards: [String]!): User!
    completeSubtask(subtaskId: String!): Goal!
    addTag(
      componentType: String!
      componentId: String!
      newTag: String!
    ): TagProperties!
    modifyTag(
      componentType: String!
      oldTag: String!
      newTag: String!
      componentId: String!
    ): TagProperties!
    deleteTag(
      componentType: String!
      componentId: String!
      tag: String!
    ): TagProperties!
  }
`;
