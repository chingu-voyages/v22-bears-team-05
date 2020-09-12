const Goal = require("../../models/Goal");
const Task = require("../../models/Task");
const Subtask = require("../../models/Subtask");

async function getComponent(componentType, componentId, userId) {
    let component
    if (componentType.trim().toLowerCase() === "goal") {
        component = await Goal.findOne({ _id: componentId, user: userId })
    } else if (componentType.trim().toLowerCase() === "task") {
        component = await Task.findOne({ _id: componentId, user: userId })
    } else if (componentType.trim().toLowerCase() === "subtask") {
        component = await Subtask.findOne({ _id: componentId, user: userId })
    }
    return component
}

module.exports = getComponent