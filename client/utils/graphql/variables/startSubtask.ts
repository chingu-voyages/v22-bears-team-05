interface IVars {
  subtaskId: string;
}

const START_SUBTASK_VARIABLES = ({ subtaskId }: IVars) => ({ subtaskId });

export default START_SUBTASK_VARIABLES;
