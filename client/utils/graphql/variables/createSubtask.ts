interface IVars {
  taskId: string;
  subtaskName: string;
  subtaskDescription?: string;
}

const CREATE_SUBTASK_VARIABLES = ({
  taskId,
  subtaskName,
  subtaskDescription,
}: IVars) => ({
  taskId,
  subtaskName,
  subtaskDescription,
});

export default CREATE_SUBTASK_VARIABLES;
