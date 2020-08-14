const Goal = require("../../models/Goal");

module.exports = {
  Query: {
    async getAllGoals(_, __, context) {
      console.log(context.req.isAuth, typeof context.req.isAuth);
      if (context.req.isAuth === false) throw new Error("not authenticated");
      try {
        console.log(context.req.userId);
        const goals = await Goal.find({ user: context.req.userId });
        return goals;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createGoal(_, { goalName }, context) {
      if (context.req.isAuth === false) throw new Error("not authenticated");
      try {
        const newGoal = await Goal.create({
          user: context.req.userId,
          name: goalName,
        });
        return newGoal;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
