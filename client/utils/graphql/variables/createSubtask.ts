interface IVars {
  taskId: string;
  subtaskName: string;
}

const CREATE_SUBTASK_VARIABLES = ({ taskId, subtaskName }: IVars) => ({
  taskId,
  subtaskName,
});

export default CREATE_SUBTASK_VARIABLES;
