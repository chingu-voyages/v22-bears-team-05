const DataLoader = require('dataloader');

const Goal = require('../../models/Task');
const Task = require('../../models/Task');
const Subtask = require('../../models/Subtask');

const goalLoader = new DataLoader((goalIds) => {
  return goals(goalIds);
});

const taskLoader = new DataLoader((taskIds) => {
  return tasks(taskIds);
});

const subtaskLoader = new DataLoader((subtaskIds) => {
  return subtasks(subtaskIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const goals = async goalIds => {
  try {
    const goals = await Goal.find({ _id: { $in: goalIds } });
    return goals.map(transformGoal);
  } catch (err) {
    throw err;
  }
}

const tasks = async taskIds => {
  try {
    const tasks = await Task.find({ _id: { $in: taskIds } });
    return tasks.map(transformTask);
  } catch (err) {
    throw err;
  }
}

const subtasks = async subtaskIds => {
  try {
    const subtasks = await Subtask.find({ _id: { $in: subtaskIds } });
    return subtasks.map(transformSubtasks);
  } catch (err) {
    throw err;
  }
}

const singleGoal = async goalId => {
  try {
    const goal = await goalLoader.load(goalId.toString());
    return goal;
  } catch (err) {
    throw err;
  }
}

const singleTask = async taskId => {
  try {
    const task = await taskLoader.load(taskId.toString());
    return task;
  } catch (err) {
    throw err;
  }
}

const singleSubtask = async subtaskId => {
  try {
    const subtask = await subtaskLoader.load(subtaskId.toString());
    return subtask;
  } catch (err) {
    throw err;
  }
}

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      password: null,
      goals: () => goalLoader.loadMany(user._doc.goals)
    }
  } catch (err) {
    throw err;
  }
}

const goal = async goalId => {
  try {
    const goal = await goalLoader.load(goalId.toString());
    return {
      ...goal._doc,
      tasks: () => taskLoader.loadMany(user._doc.goals)
    }
  } catch (err) {
    throw err;
  }
}

// const user = async userId => {
//   try {
//     const user = await userLoader.load(userId.toString());
//     return {
//       ...user._doc,
//       password: null,
//       goals: () => goalLoader.loadMany(user._doc.goals)
//     }
//   } catch (err) {
//     throw err;
//   }
// }

const transformGoal = goal => {
  return {
    ...goal._doc,
    user: user.bind(this, goal.user),
  }
}

const transformTask = task => {
  return {
    ...task._doc,
    parent: goal.bind(this, task.parent),
  }
}

exports.transformGoal = transformGoal;
exports.transformTask = transformTask;
exports.transformSubtask = transformSubtask;

/////////

//must get a list of events, a single event, ...
const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString());
    })
    return events.map(transformEvent);
  } catch (err) {
    throw err;
  }
}

const singleEvent = async eventId => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
}

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      password: null,
      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
}

const transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  }
}

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
