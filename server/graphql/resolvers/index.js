const userResolvers = require("./users");
const goalResolvers = require("./goals");
const taskResolvers = require("./tasks");
const subtaskResolvers = require("./subtasks");
const tagResolvers = require("./tags");
module.exports = {
  Query: {
    ...userResolvers.Query,
    ...goalResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...goalResolvers.Mutation,
    ...taskResolvers.Mutation,
    ...subtaskResolvers.Mutation,
    ...tagResolvers.Mutation,
  },
};
