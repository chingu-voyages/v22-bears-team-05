interface IVars {
  subtaskId: string;
}

const PAUSE_SUBTASK_VARIABLES = ({ subtaskId }: IVars) => ({ subtaskId });

export default PAUSE_SUBTASK_VARIABLES;
