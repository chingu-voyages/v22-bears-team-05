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
          name: taskName.trim(),
        });
        parentGoal.tasks.push(newTask._id);
        await parentGoal.save();

        return newTask;
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateTask(_, { taskId, newTaskName, isCompleted }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const task = await Task.findOne({
          _id: taskId,
        }).populate({ path: "subtasks", path: "parent" });

        const userOwnsRelatedGoal = task.parent.user.equals(
          context.req.session.userId,
        );
        if (!userOwnsRelatedGoal) {
          throw new Error("You are not authorized to update this task");
        }

        if (newTaskName) task.name = newTaskName.trim();
        if (isCompleted !== undefined) {
          if (!isCompleted) task.isCompleted = isCompleted;
          else {
            task.subtasks.forEach((subtask) => {
              if (!subtask.isCompleted)
                throw new Error("There are still uncompleted subtasks");
            });
            task.isCompleted = isCompleted;
          }
        }
        await task.save();

        const goalToReturn = await Goal.findOne({
          _id: task.parent._id,
          user: context.req.session.userId,
        }).populate({
          path: "tasks",
          populate: { path: "subtasks" },
        });

        if (!goalToReturn) {
          throw new Error("Cannot find the goal to return");
        }

        return goalToReturn;
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteTask(_, { taskId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const currentTask = await Task.findById(taskId).populate({
          path: "parent",
        });
        if (!currentTask) {
          throw new Error("Cannot find a task with that ID");
        }

        const parentGoal = await Goal.findOne({
          _id: currentTask.parent._id,
          user: context.req.session.userId,
        }).populate({
          path: "tasks",
          populate: { path: "subtasks" },
        });

        if (!parentGoal) {
          throw new Error("You are not authorized to delete this task");
        }

        currentTask.subtasks.forEach(async (subtask) => {
          await Subtask.deleteOne({
            _id: subtask._id,
          });
        });

        await Task.deleteOne({
          _id: taskId,
        });

        parentGoal.tasks = parentGoal.tasks.filter((id) => !id.equals(taskId));
        await parentGoal.save();

        return parentGoal;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
