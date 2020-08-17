const Task = require("../../models/Task")
const Subtask = require("../../models/Subtask")
module.exports = {
  Mutation: {
    async createSubtask(_, { subtaskName, taskId }, context) {
      if (context.req.isAuth === false) throw new Error("not authenticated")
      try {
        const parentTask = await Task.findById(taskId)
        if (parentTask) {
          console.log(parentTask)
          const newSubtask = await Subtask.create({
            parent: parentTask._id,
            name: subtaskName,
          })
          parentTask.subtasks.push(newSubtask._id)
          await parentTask.save()
          return newSubtask
        } else {
          throw new Error("That taskId is not valid")
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async deleteSubtask(_, { subtaskId }, context) {
      if (context.req.isAuth === false) throw new Error("not authenticated")
      try {
        const currentSubtask = await Subtask.findById(subtaskId).populate(
          "parent"
        )
        if (!currentSubtask) throw new Error("That subtask does not exist")
        
        const parentTask = currentSubtask.parent
        if (parentTask) {
          parentTask.subtasks = parentTask.subtasks.filter(
            (id) => id === subtaskId
          )
          await parentTask.save()
        }
        await currentSubtask.delete()
        return parentTask
      } catch (err) {
        throw new Error(err)
      }
    },
    async completeSubtask(_, { subtaskId }, context) {
      if (context.req.isAuth === false) throw new Error("not authenticated")
      try {
        const currentSubtask = await Subtask.findById(subtaskId).populate(
          "parent"
        )
        if (!currentSubtask)
          throw new Error("A subtask with the specified id does not exist")
        const parentTask = currentSubtask.parent
        if (parentTask) {
          //add to count and remove the task from the list
          parentTask.totalCompletedSubtasks += 1
          parentTask.subtasks = parentTask.subtasks.filter(
            (id) => id === subtaskId
          )
          await parentTask.save()
        }
        await currentSubtask.delete()
        return parentTask
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
