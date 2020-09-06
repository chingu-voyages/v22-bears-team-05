interface IVars {
  subtaskId: string;
}

const DELETE_SUBTASK_VARIABLES = ({ subtaskId }: IVars) => ({ subtaskId });

export default DELETE_SUBTASK_VARIABLES;
