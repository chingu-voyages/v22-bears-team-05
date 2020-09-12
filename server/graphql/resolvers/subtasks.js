const Goal = require("../../models/Goal");
const Task = require("../../models/Task");
const Subtask = require("../../models/Subtask");
const User = require("../../models/User");
module.exports = {
  Mutation: {
    async createSubtask(
      _,
      { subtaskName, subtaskDescription, taskId },
      context,
    ) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const parentTask = await Task.findById(taskId).populate({
          path: "subtasks",
          path: "parent",
        });

        if (!parentTask) {
          throw new Error("Cannot find the related task.");
        }

        const userOwnsRelatedGoal = parentTask.parent.user.equals(
          context.req.session.userId,
        );
        if (!userOwnsRelatedGoal) {
          throw new Error(
            "You do not have authorization to create an action item on that task.",
          );
        }

        const newSubtask = await Subtask.create({
          parent: parentTask._id,
          name: subtaskName,
          tags: [...parentTask.tags],
          description: subtaskDescription,
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
    async updateSubtask(
      _,
      { subtaskName, subtaskDescription, subtaskId },
      context,
    ) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const subtask = await Subtask.findById(subtaskId).populate({
          path: "parent",
        });

        const parentTask = await Task.findById(subtask.parent._id).populate({
          path: "subtasks",
          path: "parent",
        });

        if (!parentTask) {
          throw new Error("Cannot find the related task.");
        }

        const userOwnsRelatedGoal = parentTask.parent.user.equals(
          context.req.session.userId,
        );
        if (!userOwnsRelatedGoal) {
          throw new Error(
            "You do not have authorization to create an action item on that task.",
          );
        }

        subtask.name = subtaskName;
        subtask.description = subtaskDescription;
        await subtask.save();

        return subtask;
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
          throw new Error("Cannot find an action item with that ID.");

        const parentTask = await Task.findById(currentSubtask.parent).populate({
          path: "subtasks",
          path: "parent",
        });

        const userOwnsRelatedGoal = parentTask.parent.user.equals(
          context.req.session.userId,
        );
        if (!userOwnsRelatedGoal) {
          throw new Error(
            "You do not have authorization to delete that action item.",
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
    async startSubtask(_, { subtaskId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const currentSubtask = await Subtask.findById(subtaskId).populate({
          path: "parent",
        });
        if (!currentSubtask)
          throw new Error("Cannot find an action item with that ID.");

        const parentTask = await Task.findById(currentSubtask.parent).populate({
          path: "parent",
        });

        const userOwnsRelatedGoal = parentTask.parent.user.equals(
          context.req.session.userId,
        );
        if (!userOwnsRelatedGoal) {
          throw new Error(
            "You do not have authorization to start that action item.",
          );
        }

        currentSubtask.timeStarted = Date.now();

        await currentSubtask.save();

        return currentSubtask;
      } catch (err) {
        throw new Error(err);
      }
    },
    async pauseSubtask(_, { subtaskId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const currentSubtask = await Subtask.findById(subtaskId).populate({
          path: "parent",
        });
        if (!currentSubtask)
          throw new Error("Cannot find an action item with that ID.");

        const parentTask = await Task.findById(currentSubtask.parent).populate({
          path: "parent",
        });

        const userOwnsRelatedGoal = parentTask.parent.user.equals(
          context.req.session.userId,
        );
        if (!userOwnsRelatedGoal) {
          throw new Error(
            "You do not have authorization to pause that action item.",
          );
        }

        if (!currentSubtask.timeStarted)
          throw new Error(
            "You cannot pause an action item that is not started.",
          );

        const millisecondsInSecond = 1000;
        currentSubtask.totalTimeInSeconds += Math.floor(
          (Date.now() - currentSubtask.timeStarted) / millisecondsInSecond,
        );
        currentSubtask.timeStarted = undefined;

        await currentSubtask.save();

        return currentSubtask;
      } catch (err) {
        throw new Error(err);
      }
    },
    async completeSubtask(_, { subtaskId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      try {
        const currentSubtask = await Subtask.findById(subtaskId).populate({
          path: "parent",
        });
        if (!currentSubtask)
          throw new Error("Cannot find an action item with that ID.");

        const parentTask = await Task.findById(currentSubtask.parent).populate({
          path: "parent",
        });

        const userOwnsRelatedGoal = parentTask.parent.user.equals(
          context.req.session.userId,
        );
        if (!userOwnsRelatedGoal) {
          throw new Error(
            "You do not have authorization to complete that action item.",
          );
        }

        if (!currentSubtask.timeStarted)
          throw new Error(
            "You cannot complete an action item that is not started.",
          );

        const millisecondsInSecond = 1000;
        currentSubtask.totalTimeInSeconds += Math.floor(
          (Date.now() - currentSubtask.timeStarted) / millisecondsInSecond,
        );

        const totalTimeInSeconds = currentSubtask.totalTimeInSeconds;
        const user = await User.findById(context.req.session.userId);
        if (!user) throw new Error("Could not find the user.");
        const tags = currentSubtask.tags;
        if (totalTimeInSeconds > 0) {
          for (let tag of tags) {
            const index = user.tags.findIndex(
              (userInstance) => userInstance.tagName === tag,
            );
            if (index === -1)
              user.tags.push({ tagName: tag, time: totalTimeInSeconds });
            else user.tags[index].time += totalTimeInSeconds;
          }
          await user.save();
        }

        await currentSubtask.delete();

        parentTask.totalTimeInSeconds += totalTimeInSeconds;
        parentTask.totalCompletedSubtasks += 1;
        parentTask.subtasks = parentTask.subtasks.filter(
          (id) => !id.equals(subtaskId),
        );
        await parentTask.save();

        const goal = await Goal.findById(parentTask.parent).populate({
          path: "tasks",
          populate: {
            path: "subtasks",
          },
        });

        goal.totalTimeInSeconds += totalTimeInSeconds;
        goal.totalCompletedSubtasks += 1;
        await goal.save();

        return goal;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
