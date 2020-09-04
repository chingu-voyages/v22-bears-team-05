interface IVars {
  goalId: string;
  taskName: string;
}

const CREATE_GOAL_VARIABLES = ({ goalId, taskName }: IVars) => ({
  goalId,
  taskName,
});

export default CREATE_GOAL_VARIABLES;
