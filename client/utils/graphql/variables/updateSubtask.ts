interface IVars {
  subtaskId: string;
  subtaskName: string;
  subtaskDescription?: string;
}

const UPDATE_SUBTASK_VARIABLES = ({
  subtaskId,
  subtaskName,
  subtaskDescription,
}: IVars) => ({
  subtaskId,
  subtaskName,
  subtaskDescription,
});

export default UPDATE_SUBTASK_VARIABLES;
