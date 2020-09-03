interface IVars {
  taskId: string;
}

const DELETE_TASK_VARIABLES = ({ taskId }: IVars) => ({ taskId });

export default DELETE_TASK_VARIABLES;
