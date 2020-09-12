const Goal = require("../../models/Goal");
const Task = require("../../models/Task");
const Subtask = require("../../models/Subtask");

async function getComponent(componentType, componentId) {
    let component
    if (componentType.trim().toLowerCase() === "goal") {
        component = await Goal.findById(componentId)
    } else if (componentType.trim().toLowerCase() === "task") {
        component = await Task.findById(componentId)
    } else if (componentType.trim().toLowerCase() === "subtask") {
        component = await Subtask.findById(componentId)
    }
    return component
}

module.exports = getComponent