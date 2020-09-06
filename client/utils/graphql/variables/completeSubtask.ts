interface IVars {
  subtaskId: string;
}

const COMPLETE_SUBTASK_VARIABLES = ({ subtaskId }: IVars) => ({ subtaskId });

export default COMPLETE_SUBTASK_VARIABLES;
