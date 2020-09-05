const Task = require("../../models/Task");
const Subtask = require("../../models/Subtask");
module.exports = {
  Mutation: {
    async createSubtask(_, { subtaskName, taskId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const parentTask = await Task.findById(taskId).populate({
          path: "subtasks",
          path: "parent",
        });

        if (!parentTask) {
          throw new Error("Cannot find a Task with that ID");
        }

        const userOwnsRelatedGoal = parentTask.parent.user.equals(
          context.req.session.userId,
        );
        if (!userOwnsRelatedGoal) {
          throw new Error(
            "You do not have authorization to create a subtask on that task",
          );
        }

        const newSubtask = await Subtask.create({
          parent: parentTask._id,
          name: subtaskName,
        });
        parentTask.subtasks.push(newSubtask._id);
        await parentTask.save();

        const taskToReturn = await Task.findById(parentTask._id).populate({
          path: "subtasks",
        });

        return taskToReturn;
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteSubtask(_, { subtaskId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const currentSubtask = await Subtask.findById(subtaskId).populate({
          path: "parent",
        });
        if (!currentSubtask)
          throw new Error("Cannot find subtask with that ID");

        const parentTask = await Task.findById(currentSubtask.parent).populate({
          path: "subtasks",
          path: "parent",
        });

        const userOwnsRelatedGoal = parentTask.parent.user.equals(
          context.req.session.userId,
        );
        if (!userOwnsRelatedGoal) {
          throw new Error(
            "You do not have authorization to create a subtask on that task",
          );
        }

        if (parentTask) {
          parentTask.subtasks = parentTask.subtasks.filter(
            (id) => !id.equals(subtaskId),
          );
          await parentTask.save();
        }

        await currentSubtask.delete();

        return parentTask;
      } catch (err) {
        throw new Error(err);
      }
    },
    async completeSubtask(_, { subtaskId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const currentSubtask = await Subtask.findById(subtaskId).populate(
          "parent",
        );

        if (!currentSubtask) throw new Error("Cannot find subtask by that ID");

        const parentTask = currentSubtask.parent;
        if (parentTask) {
          //add to count and remove the task from the list
          parentTask.totalCompletedSubtasks += 1;
          parentTask.subtasks = parentTask.subtasks.filter(
            (id) => !id.equals(subtaskId),
          );
          await parentTask.save();
        }
        await currentSubtask.delete();

        return parentTask;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
