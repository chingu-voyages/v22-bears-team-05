const Goal = require("../../models/Goal");
const Task = require("../../models/Task");
const Subtask = require("../../models/Subtask");
module.exports = {
  Query: {
    async getAllGoals(_, __, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");
      try {
        const goals = await Goal.find({
          user: context.req.session.userId,
        }).populate({
          path: "tasks",
          populate: {
            path: "subtasks",
          },
        });
        return goals;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createGoal(_, { goalName }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");
      try {
        const newGoal = await Goal.create({
          user: context.req.session.userId,
          name: goalName.trim(),
        });
        return newGoal;
      } catch (err) {
        throw new Error(err);
      }
    },
    async addTagToGoal(_, { goalId, newTag }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");
      try {
        const currentGoal = await Goal.findOne({ _id: goalId, user: context.req.session.userId })
        if (!currentGoal) {
          throw new Error("Cannot find a Goal with that ID")
        }
        currentGoal.populate({ "path": "tags" })
        const tags = currentGoal.tags
        if (tags.includes(newTag)) return currentGoal.populate({ "path": "tags" })
        tags.push(newTag)
        await currentGoal.save()
        return currentGoal.populate({ "path": "tags" })
      } catch (err) {
        throw new Error(err)
      }
    },
    async deleteGoal(_, { goalId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      let deletedGoals = 0,
        deletedTasks = 0,
        deletedSubtasks = 0;

      try {
        const currentGoal = await Goal.findOne({
          _id: goalId,
          user: context.req.session.userId,
        }).populate({
          path: "tasks",
          populate: { path: "subtasks" },
        });
        if (!currentGoal) {
          throw new Error("Cannot find a goal with that ID");
        }
        const tasks = currentGoal.tasks;
        tasks.forEach(async (currentTask) => {
          currentTask.subtasks.forEach(async (subtask) => {
            const res = await Subtask.deleteOne({
              _id: subtask._id,
              user: context.req.session.userId,
            });
            deletedSubtasks += res.deletedCount;
          });
          const res = await Task.deleteOne({
            _id: currentTask._id,
            user: context.req.session.userId,
          });
          deletedTasks += res.deletedCount;
        });
        const res = await Goal.deleteOne({
          _id: currentGoal._id,
          user: context.req.session.userId,
        });
        deletedGoals += res.deletedCount;

        return {
          deletedGoals,
          deletedTasks,
          deletedSubtasks,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateGoal(_, { goalId, newGoalName, isCompleted }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");

      console.log("updating goal...", newGoalName);

      try {
        const currentGoal = await Goal.findOne({
          _id: goalId,
          user: context.req.session.userId,
        }).populate({
          path: "tasks",
          populate: { path: "subtasks" },
        });
        if (!currentGoal) {
          throw new Error("Cannot find a goal with that ID");
        }
        if (newGoalName) currentGoal.name = newGoalName.trim();
        if (isCompleted !== undefined) {
          if (!isCompleted) currentGoal.isCompleted = isCompleted;
          else {
            currentGoal.tasks.forEach((task) => {
              if (!task.isCompleted)
                throw new Error("There are still uncompleted tasks");
            });
            currentGoal.isCompleted = isCompleted;
          }
        }
        if (!newGoalName && isCompleted === undefined)
          throw new Error("The name field is required");
        currentGoal.save();
        return currentGoal;
      } catch (err) {
        throw new Error(err);
      }
    },
    async modifyTag(_, { componentType, oldTag, newTag, componentId }, context) {
      if (!context.req.session.userId) throw new Error("not authenticated");
      try {
        let component
        if (componentType.trim().toLowerCase() === "goal") {
          component = await Goal.findOne({ _id: componentId, user: context.req.session.userId })
        } else if (componentType.trim().toLowerCase() === "task") {
          component = await Task.findOne({ _id: componentId, user: context.req.session.userId })
        } else if (componentType.trim().toLowerCase() === "subtask") {
          component = await Subtask.findOne({ _id: componentId, user: context.req.session.userId })
        }
        if (!component) throw new Error("Cannot find a component with that name and type combination")
        const tags = component.tags
        if (!tags.includes(oldTag)) throw new Error("old tag does not exist")
        if (tags.includes(newTag)) throw new Error("new tag already exists")
        for (let i = 0; i < tags.length; i++) {
          if (tags[i] === oldTag) {
            tags[i] = newTag
            break
          }
        }
        await component.save()
        return { tagName: newTag, componentId, componentType }
      }
      catch (err) {
        throw new Error(err)
      }
    }
  },
};
