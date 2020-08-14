const Goal = require("../../models/Goal");

module.exports = {
  Query: {
    async getAllGoals(_, userId) {
      try {
        //should get userId out of the JWT
        //better way to write the following line?
        const goals = await Goal.find({ user: Object.values(userId)[0] });
        return goals;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createGoal(_, { userId, goalName }) {
      try {
        //should get userId out of the JWT
        const newGoal = await Goal.create({ user: userId, name: goalName });
        return newGoal;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
