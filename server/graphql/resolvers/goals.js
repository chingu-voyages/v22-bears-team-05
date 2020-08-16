const Goal = require("../../models/Goal")

module.exports = {
  Query: {
    async getAllGoals(_, __, context) {
      if (context.req.isAuth === false) throw new Error("not authenticated")
      try {
        const goals = await Goal.find({ user: context.req.userId }).populate({
          path: "tasks",
          populate: {
            path: "subtasks",
          },
        })
        return goals
      } catch (err) {
        throw new Error(err)
      }
    },
  },

  Mutation: {
    async createGoal(_, { goalName }, context) {
      if (context.req.isAuth === false) throw new Error("not authenticated")
      try {
        const newGoal = await Goal.create({
          user: context.req.userId,
          name: goalName,
        })
        return newGoal
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
