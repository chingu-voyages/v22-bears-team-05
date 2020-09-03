interface IVars {
  taskId: string;
  newTaskName: string;
}

const UPDATE_TASK_NAME_VARIABLES = ({ taskId, newTaskName }: IVars) => ({
  taskId,
  newTaskName,
});

export default UPDATE_TASK_NAME_VARIABLES;
