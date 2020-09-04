interface IVars {
  taskId: string;
  isCompleted: boolean;
}

const UPDATE_TASK_COMPLETED_VARIABLES = ({ taskId, isCompleted }: IVars) => ({
  taskId,
  isCompleted,
});

export default UPDATE_TASK_COMPLETED_VARIABLES;
