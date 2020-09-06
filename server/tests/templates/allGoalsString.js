const allGoalsString = `{
  getAllGoals{
    user
    name
    isCompleted
    totalCompletedSubtasks
    tasks{
      name
      parent{
        name
        _id
      }
      subtasks{
        name
        _id
        parent{
          _id
          name
        }
      }
    }
  }
}`
module.exports = allGoalsString