const Task = require("../../models/Task")
const Goal = require("../../models/Goal")
module.exports = {
  Mutation: {
    async createTask(_, { taskName, goalId }, context) {
      if (context.req.isAuth === false) throw new Error("not authenticated")
      try {
        const parentGoal = await Goal.findById(goalId)
        if (parentGoal) {
          const newTask = await Task.create({
            parent: goalId,
            user: context.req.userId,
            name: taskName,
          })
          parentGoal.tasks.push(newTask._id)
          await parentGoal.save()
          return newTask
        } else throw new Error("the specified goalId is not valid")
      } catch (err) {
        throw new Error(err)
      }
    },
    async deleteTask(_, { taskId }, context) {
      if (context.req.isAuth === false) throw new Error("not authenticated")
      try {
        const currentTask = await Task.findById(taskId).populate("parent")
        if (currentTask) {
          const parentGoal = currentTask.parent
          if (parentGoal) {
            parentGoal.tasks = parentGoal.tasks.filter((id) => id !== taskId)
            await parentGoal.save()
          }
          await currentTask.delete()
          return parentGoal
        } else {
          throw new Error("That task does not exist")
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
