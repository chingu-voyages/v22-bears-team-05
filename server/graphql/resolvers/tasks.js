const Task = require("../../models/Task");
const Goal = require("../../models/Goal");
module.exports = {
  Mutation: {
    async createTask(_, { taskName, goalId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const parentGoal = await Goal.findOne({
          _id: goalId,
          user: context.req.session.userId,
        }).populate({
          path: "tasks",
          populate: { path: "subtasks" },
        });

        if (!parentGoal) {
          throw new Error("Cannot find a goal with that ID");
        }

        const newTask = await Task.create({
          parent: goalId,
          name: taskName,
        });
        parentGoal.tasks.push(newTask._id);
        await parentGoal.save();

        return newTask;
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteTask(_, { taskId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const currentTask = await Task.findById(taskId).populate("parent");
        if (!currentTask) {
          throw new Error("Cannot find a task by that ID");
        }

        const parentGoal = currentTask.parent;
        if (parentGoal) {
          parentGoal.tasks = parentGoal.tasks.filter(
            (id) => !id.equals(taskId),
          );
          await parentGoal.save();
        }
        await currentTask.delete();

        return parentGoal;
      } catch (err) {
        throw new Error(err);
      }
    },
    async completeTask(_, { taskId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const currentTask = await Task.findById(taskId).populate("parent");
        if (!currentTask)
          throw new Error("The specified Task Id does not exist");

        if (currentTask.subtasks.length > 0) {
          throw new Error(
            "Task cannot be completed while it still contains subtasks",
          );
        }

        const parentGoal = currentTask.parent;
        if (parentGoal) {
          parentGoal.totalCompletedSubtasks +=
            currentTask.totalCompletedSubtasks;
          parentGoal.tasks = parentGoal.tasks.filter(
            (id) => !id.equals(taskId),
          );
          await parentGoal.save();
        }
        await currentTask.delete();

        return parentGoal;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
